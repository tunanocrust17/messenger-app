const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to full viewport size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Matrix rain settings
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

// Function to draw Matrix rain
function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Slight fade effect for the rain
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41'; // Matrix green
    ctx.font = `${fontSize}px Courier New`;

    drops.forEach((y, index) => {
        const text = String.fromCharCode(33 + Math.random() * 94); // Random character
        const x = index * fontSize;

        ctx.fillText(text, x, y * fontSize);

        // Reset drop to the top if it reaches the bottom
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[index] = 0;
        }
        drops[index]++;
    });
}

// Continuously draw the Matrix effect
setInterval(drawMatrix, 50);

// Adjust canvas size when window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
