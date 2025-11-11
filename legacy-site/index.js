import countapi from 'countapi-js';

document.addEventListener('DOMContentLoaded', function() {
    // Using the correct domain for the counter
    fetch('https://api.countapi.xyz/hit/madebyraf.tech/visits')
        .then(response => response.json())
        .then(data => {
            // Update all counter elements
            document.querySelectorAll('.counter-number').forEach(element => {
                element.textContent = data.value.toLocaleString();
            });
        })
        .catch(error => {
            console.error('Error:', error);
            document.querySelectorAll('.counter-number').forEach(element => {
                element.textContent = 'Error loading count';
            });
        });
});
