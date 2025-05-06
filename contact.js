const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const closeModalButton = document.querySelector('.close-modal');
const submitAnotherButton = document.createElement('button');
const quitButton = document.createElement('button');
submitAnotherButton.textContent = 'Submit Another Response';
submitAnotherButton.classList.add('submit-another-btn');

quitButton.textContent = 'Quit';
quitButton.classList.add('quit-btn');
successModal.querySelector('.modal-content').appendChild(submitAnotherButton);
successModal.querySelector('.modal-content').appendChild(quitButton);

contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    successModal.style.display = 'flex';
    successModal.querySelector('.modal-content').classList.add('slide-in');
    contactForm.reset();
});
closeModalButton.addEventListener('click', function () {
    successModal.style.display = 'none';
});
submitAnotherButton.addEventListener('click', function () {
    successModal.style.display = 'none';
    contactForm.scrollIntoView({ behavior: 'smooth' });
});
quitButton.addEventListener('click', function () {
    successModal.style.display = 'none';
    alert('Thank you for reaching out to us! Have a great day!');
});
window.addEventListener('click', function (event) {
    if (event.target === successModal) {
        successModal.style.display = 'none';
    }
});
