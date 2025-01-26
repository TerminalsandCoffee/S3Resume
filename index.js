document.addEventListener('DOMContentLoaded', function() {
    // Replace this URL with your actual API endpoint that tracks views
    fetch('https://api.countapi.xyz/hit/your-site-name/visits')
    .then(response => response.json())
    .then(data => {
        document.querySelectorAll('.counter-number').forEach(element => {
            element.textContent = data.value;
        });
    })
    .catch(error => {
        console.error('Error fetching view count:', error);
        document.querySelectorAll('.counter-number').forEach(element => {
            element.textContent = 'Error loading count';
        });
    });
});
