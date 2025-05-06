const bar = document.getElementById('bar');
const navbar = document.getElementById('navbar');
const close = document.getElementById('close');


if(bar){
    bar.addEventListener('click', () => {
        navbar.classList.add('active');
    })
}
if(close){
    close.addEventListener('click', () => {
        navbar.classList.remove('active');
    })
}
// JavaScript for Dynamic Background Color Change
const heroSection = document.getElementById('hero');

function generateRandomColor() {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    heroSection.style.backgroundColor = randomColor;
}

// Change the background color every second
setInterval(generateRandomColor, 1000);


