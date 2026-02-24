document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('calorie-count').textContent = `${data.totalCalories} / ${data.targetCalories}`;
        })
        .catch(error => {
            console.error('Error fetching calorie data:', error);
            document.getElementById('calorie-count').textContent = 'Error';
        });
});