const carousel = document.querySelector('.carouselContainer');
const slides = carousel.querySelectorAll('.carouselSlider');
const slideBox = carousel.querySelector('ul#carouselBox');

const interval = slideBox.dataset.interval;
const counter = slideBox.dataset.counterType;
const mediaMedium = window.matchMedia( '( max-width: 800px )' );
const mediaSmall = window.matchMedia( '( max-width: 400px )' );
const slideLot = carousel.querySelector('.activeNumber');

const prevBtn = carousel.querySelector("#prevSlide");
const nextBtn = carousel.querySelector("#nextSlide");
const autoplayBtn = carousel.querySelector('#autoplaySlide');
const slideDots = carousel.querySelectorAll('.slideDots');

const pauseBtn = carousel.querySelector("#autoplaySlide > span.pauseBtn");
const playBtn = carousel.querySelector("#autoplaySlide > span.playBtn");
const dotBtn = carousel.querySelector('.slideDots');

let numSlide = slideBox.dataset.slide;
let infinite = slideBox.dataset.infiniteScroll;
let autoplay = slideBox.dataset.autoplay;
let timeout;
let curSlide = 0;

if (counter == 'number') {
slideLot.innerHTML = 1;
}

if (mediaSmall.matches) {
numSlide = 2;
}else if (mediaMedium.matches) {
numSlide = 3;
} else {
numSlide = slideBox.dataset.slide;
}

const slideWidth = Math.round(slideBox.clientWidth / numSlide);

prevBtn.addEventListener("click", prevFx);
nextBtn.addEventListener("click", nextFx);
goToSlide(0);

if(autoplay == 'true') {
autoPlay();
}else {
clearTimeout(timeout);
}

function autoPlay(numSlide){
nextFx();
timeout = setTimeout(autoPlay, interval);
}

function pauseFx() {
if (autoplay === 'true'){
clearTimeout(timeout);
autoplay = 'false';
playBtn.style.display = "block";
pauseBtn.style.display = "none";
}else{
if(curSlide == slides.length -1) {
curSlide = -1;
}
autoPlay();
autoplay = 'true';
playBtn.style.display = "none";
pauseBtn.style.display = "block";
}
}

function prevFx () {
curSlide--;
if(curSlide < 0){
if(infinite == 'true') {
curSlide = slides.length - 1;
} else {
curSlide = 0;
}
}
goToSlide(curSlide);
activeSlide(curSlide);
}

function nextFx () {
curSlide++
if(curSlide == slides.length) {
if(infinite == 'true') {
curSlide = 0;
}
if(autoplay == 'true') {
curSlide = 0;
}
}
goToSlide(curSlide);
activeSlide(curSlide);
}

function showDot(dot) {
const clickedDot = carousel.querySelector(`[data-dot-id="${dot}"]`);
slideDots.forEach(dot => dot.classList.remove('activeDot'));
clickedDot.classList.add('activeDot');
if(infinite == 'false') {
if(dot == slides.length - 1) {
nextBtn.setAttribute('disabled', true);
} else {
nextBtn.removeAttribute('disabled');
}
if(dot == 0) {
prevBtn.setAttribute('disabled', true);
} else {
prevBtn.removeAttribute('disabled');
}
}
curSlide = dot;
goToSlide(curSlide);
}

function goToSlide (slide) {
let leftScroll = slide * slideWidth;
slideBox.scrollTo({left: leftScroll});
}

function activeSlide(curSlide) {
if(infinite == 'false') {
if(curSlide == slides.length - 1) {
nextBtn.setAttribute('disabled', true);
} else {
nextBtn.removeAttribute('disabled');
}
if(curSlide == 0) {
prevBtn.setAttribute('disabled', true);
} else {
prevBtn.removeAttribute('disabled');
}
}
if(counter == 'number') {
slideLot.innerHTML = curSlide + 1;
}
if(counter == 'dots') {
showDot(curSlide);
}
}