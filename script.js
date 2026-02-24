document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/calories')
        .then(response => response.json())
        .then(data => {
            document.getElementById('calorie-count').textContent = data.calories;
        })
        .catch(error => {
            console.error('Error fetching calorie data:', error);
            document.getElementById('calorie-count').textContent = 'Error';
        });
});