const red = document.getElementById('red');
const yellow = document.getElementById('yellow');
const green = document.getElementById('green');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const car = document.getElementById('car');

let interval;
let currentLight = 'red';

function changeLight() {
    gsap.to('.active', {duration: 0.5, opacity: 0.3, boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)'});
    
    switch(currentLight) {
        case 'red':
            gsap.to(green, {duration: 0.5, opacity: 1, boxShadow: '0 0 40px rgba(46, 204, 64, 0.8)'});
            currentLight = 'green';
            moveCar();
            break;
        case 'green':
            gsap.to(yellow, {duration: 0.5, opacity: 1, boxShadow: '0 0 40px rgba(255, 220, 0, 0.8)'});
            currentLight = 'yellow';
            break;
        case 'yellow':
            gsap.to(red, {duration: 0.5, opacity: 1, boxShadow: '0 0 40px rgba(255, 65, 54, 0.8)'});
            currentLight = 'red';
            break;
    }
}

function startSimulation() {
    if (!interval) {
        interval = setInterval(changeLight, 5000);
        gsap.to(red, {duration: 0.5, opacity: 1, boxShadow: '0 0 40px rgba(255, 65, 54, 0.8)'});
    }
}

function stopSimulation() {
    clearInterval(interval);
    interval = null;
    gsap.to('.light', {duration: 0.5, opacity: 0.3, boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)'});
    currentLight = 'red';
    car.style.left = '-200px';
}

function moveCar() {
    gsap.to(car, {
        duration: 10, 
        left: 'calc(100% + 200px)', 
        ease: 'linear',
        onComplete: () => {
            car.style.left = '-200px';
        }
    });
}

startBtn.addEventListener('click', startSimulation);
stopBtn.addEventListener('click', stopSimulation);

// Animation initiale
gsap.from('.container', {duration: 1, y: -50, opacity: 0, ease: 'back'});
gsap.from('.light', {duration: 0.5, scale: 0, opacity: 0, stagger: 0.2, ease: 'back'});
gsap.from('button', {duration: 0.5, y: 20, opacity: 0, stagger: 0.1, ease: 'back', delay: 1});