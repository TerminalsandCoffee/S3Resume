import { useEffect, useMemo, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

const COUNT_ENDPOINT = 'https://api.countapi.xyz/hit/madebyraf.tech/visits'
const STORAGE_KEY = 'madebyraf:visitor-count'
const MAX_RETRIES = 3

type CounterStatus = 'idle' | 'loading' | 'ready' | 'error'

const loadCachedCount = (): number | null => {
  if (typeof window === 'undefined') {
    return null
  }

  const cached = window.localStorage.getItem(STORAGE_KEY)
  if (!cached) {
    return null
  }

  const parsed = Number.parseInt(cached, 10)
  return Number.isFinite(parsed) ? parsed : null
}

const storeCachedCount = (value: number) => {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.setItem(STORAGE_KEY, value.toString(10))
}

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(() => loadCachedCount())
  const [status, setStatus] = useState<CounterStatus>('idle')
  const animatedValue = useSpring(count ?? 0, { stiffness: 110, damping: 18 })

  useEffect(() => {
    if (typeof count === 'number') {
      animatedValue.set(count)
    }
  }, [animatedValue, count])

  useEffect(() => {
    const controller = new AbortController()
    let isCancelled = false

    const fetchCount = async () => {
      setStatus('loading')

      for (let attempt = 0; attempt < MAX_RETRIES; attempt += 1) {
        try {
          const response = await fetch(COUNT_ENDPOINT, {
            signal: controller.signal,
            cache: 'no-store'
          })

          if (!response.ok) {
            throw new Error(`Unexpected status ${response.status}`)
          }

          const payload = (await response.json()) as { value?: number; count?: number }
          const nextValue = payload.value ?? payload.count

          if (typeof nextValue !== 'number') {
            throw new Error('Missing numeric count in response payload')
          }

          if (!isCancelled) {
            setCount(nextValue)
            storeCachedCount(nextValue)
            setStatus('ready')
          }
          return
        } catch (error) {
          if ((error as Error).name === 'AbortError') {
            return
          }

          if (attempt < MAX_RETRIES - 1) {
            await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)))
            continue
          }

          console.error('Visitor counter error:', error)
          if (!isCancelled) {
            setStatus('error')
          }
        }
      }
    }

    void fetchCount()

    return () => {
      isCancelled = true
      controller.abort()
    }
  }, [])

  const displayCount = useMemo(() => {
    if (typeof count !== 'number') {
      return '—'
    }
    return count.toLocaleString('en-US')
  }, [count])

  return (
    <div className="visitor-counter">
      <div className="counter-card">
        <div className="counter-header">
          <span className={`counter-status ${status === 'error' ? 'is-error' : 'is-live'}`}>
            {status === 'error' ? 'OFFLINE' : 'LIVE'}
          </span>
          <span className="counter-label">Real-time counter powered by CountAPI</span>
        </div>

        <motion.span
          className="counter-value"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          👀{' '}
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {displayCount}
          </motion.span>{' '}
          visitors and counting
        </motion.span>

        <div className="counter-meta">
          {status === 'loading' && (
            <span className="counter-spinner" aria-live="polite">
              <span />
              <span />
              <span />
            </span>
          )}
          {status === 'error' && (
            <span className="counter-warning">
              Showing last known total. The live counter will update when connectivity returns.
            </span>
          )}
          {status === 'ready' && <span className="counter-updated">Updated just now.</span>}
        </div>
      </div>
      <img
        className="counter-badge"
        src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fmadebyraf.tech%2F&label=&countColor=%2311ABB0&labelStyle=none&style=flat"
        alt="Visitor badge"
        loading="lazy"
      />
    </div>
  )
}

export default VisitorCounter

