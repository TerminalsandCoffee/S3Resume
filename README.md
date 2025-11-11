# Rafael's Cloud Portfolio 🚀

Modernized resume website built with **React**, **TypeScript**, and **Vite**, deployed to Amazon S3 + CloudFront. The site highlights my cloud security experience, certifications, and current projects while keeping the visitor counter from the previous static implementation.

## 🌟 Features

- Responsive layout with modern dark theme
- Real-time visitor counter powered by CountAPI
- Smooth in-page navigation with mobile-friendly menu
- Sections for hero, bio, certifications, experience, and contact
- Built for static hosting on S3 with optimized production bundle

## 🧱 Tech Stack

- React 18 + TypeScript
- Vite 7 build tooling
- CSS modules (single global stylesheet)
- React Icons
- AWS S3 / CloudFront for hosting & CDN

## ⚙️ Local Development

```bash
npm install
npm run dev
```

The development server opens automatically. The app lives at `http://localhost:5173`.

## 📦 Production Build

```bash
npm run build
```

Outputs a static bundle in the `dist/` directory ready for S3.

## ☁️ Deploy to S3

1. Build the site: `npm run build`
2. Sync the `dist/` folder to your S3 bucket:

```bash
aws s3 sync dist/ s3://<your-bucket-name> --delete
```

3. If you use CloudFront, create an invalidation so changes propagate:

```bash
aws cloudfront create-invalidation --distribution-id <distribution-id> --paths "/*"
```

## 📂 Legacy Assets

The former static HTML/CSS version is preserved in `legacy-site/` for reference.

## 📫 Connect With Me

- LinkedIn: [rgmartinez-cloud](https://www.linkedin.com/in/rgmartinez-cloud/)
- Blog: [Medium](https://medium.com/@terminalsandcoffee)
- GitHub: [TerminalsandCoffee](https://github.com/TerminalsandCoffee)

---
Built with 💻 and ☕ by Rafael Martinez
