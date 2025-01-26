document.addEventListener('DOMContentLoaded', function() {
    // Create a unique namespace for your site
    const namespace = 'rafael-portfolio';
    const key = 'visits';

    // Using the CountAPI service to track views
    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
        .then(response => response.json())
        .then(data => {
            // Update all counter elements with the view count
            const counterElements = document.querySelectorAll('.counter-number');
            counterElements.forEach(element => {
                element.textContent = data.value.toLocaleString();
            });
        })
        .catch(error => {
            console.error('Error fetching view count:', error);
            const counterElements = document.querySelectorAll('.counter-number');
            counterElements.forEach(element => {
                element.textContent = 'Error loading count';
            });
        });
});
