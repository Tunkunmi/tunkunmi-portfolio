//NAV OVERLAY
const openOverlay = document.querySelector('.toggle-nav');
const closeOverlay = document.querySelector('.close-overlay');
const overlay =  document.querySelector('.nav-overlay');

const overlayLinks = document.querySelectorAll('.overlayLinks');

openOverlay.addEventListener('click', () => {
    overlay.style.display = 'flex';
    return;
});

closeOverlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    return;
});

overlayLinks.forEach(link => {
    link.addEventListener('click', () => {
        overlay.style.display = 'none'
    })
})

//IMAGE SLIDE
const startSlideshowButtons = document.querySelectorAll('.image-overlay>button');
const slideshow = document.querySelector('.slideshow-container');
const closeSliderButton = document.querySelector('.close-slider');

const prevImage = document.querySelector('.arrow-left');
const nextImage = document.querySelector('.arrow-right');

const imageShowing = document.querySelector('.slideshow-img');

const images = ['img/p1.jpg', 'img/p2.jpg', 'img/p3.jpg', 'img/p4.jpg', 'img/p5.jpg', 'img/p6.jpg', 'img/p7.jpg', 'img/p8.jpg', 'img/p9.jpg'];

let currentSlide = 0;

startSlideshowButtons.forEach((button, index) =>  {
    button.addEventListener('click', () => {
        startSlider(index);
    });
});

closeSliderButton.addEventListener('click', () => {
    slideshow.style.display = 'none';
});

function startSlider(slide) {
    currentSlide = slide;
    setImage(currentSlide);
    slideshow.style.display = 'flex';
}

prevImage.addEventListener('click', previousSlide);
nextImage.addEventListener('click', nextSlide);

function nextSlide() {
    currentSlide++;
    if(currentSlide > images.length - 1) {
        currentSlide = 0;
    }
    setImage(currentSlide);
}

function previousSlide() {
    currentSlide--;
    if(currentSlide < 0) {
        currentSlide = images.length - 1;
    }
    setImage(currentSlide)
}

function setImage(index) {
    imageShowing.setAttribute('src', images[index]);
}


// NAV
const navbar = document.querySelector("nav");
const newNavbarPosition = 400;

const changeNavbar = () => {
if (window.pageYOffset >= newNavbarPosition ) {
    navbar.classList.add("newNav")
} else {
        navbar.classList.remove("newNav");
    }
}
window.onscroll = changeNavbar;


//SUBMIT FORM
const form = document.forms[0];
const errorDisplay = document.querySelector('.error');
const successDisplay = document.querySelector('.success');
const submitButton = document.querySelector('.btn-submit');

form.addEventListener('submit', submitContactForm);

function submitContactForm(e) {
    e.preventDefault();
    submitButton.disabled = true;
    submitButton.innerText = 'Sending...';
    let { name, email, message, subject } = form;
    name = name.value;
    email = email.value;
    message = message.value;
    subject = subject.value;
    
    fetch('https://tk-contact.herokuapp.com/submit', {
        method : 'POST',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({name, email, message, subject})
    })
    .then(res => res.json())
    .then(data => {
        if(data.error) {
            errorDisplay.innerText = data.error;
        } else {
            successDisplay.innerText = data.message;
            form.reset();
        }
        submitButton.disabled = false;
        submitButton.innerHTML = 'SEND <i class="fa fa-paper-plane"></i>';
    });
}