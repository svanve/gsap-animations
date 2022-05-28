const body = document.querySelector('body');
const overlay = document.querySelector('#overlay');
const entryBtn = document.querySelector('#entry-btn');
const parcels = document.querySelectorAll('#parcels g');
const parcelsArr = Array.from(parcels).reverse();
const letters = document.querySelector('#letters');
const lettersArr = Array.from(letters.children);
var userHasClicked = false;

[ letterD, letterD2, letterP ] = lettersArr;

toggleBodyScroll();

function toggleBodyScroll() {
    body.classList.toggle('noscroll');
}

// onComplete Logo Animation: toggle class back

const tlParcels = new gsap.timeline({ repeat: -1, repeatDelay: .2, yoyo: true});

tlParcels
    .add(timeout)
    .to(parcelsArr, .3,  { y: -100, ease: Power1.easeOut, stagger: .1 })
    .to(parcelsArr, .3, { y: 0, ease: Power1.easeInOut, stagger: .1, onComplete: nextTl }, '-=.3')

function timeout(){
    setTimeout(() => {
        userHasClicked = true;
        killBtn();
    }, 10000);
}

function nextTl() {
    if (userHasClicked === true) {
        tlParcels.pause()
        tlTornado.play()
    } else {
        return;
    }
}

overlay.addEventListener('click', () => {
    toggleFlag(); 
    killBtn();
});
// overlay.addEventListener('click', toggleFlag);

function toggleFlag() {
    userHasClicked = true;
}

function killBtn() {
    entryBtn.style = 'opacity: 0; scale: 0; transition: all .6s ease-in;';
}

/* new timeline */
const tlTornado = new gsap.timeline();

tlTornado.pause()
    .to('#parcel-A', 2, { y: -100, motionPath: {path: '#path-A', align: '#path-A'}, ease: Power4.easeInOut})
    .to('#parcel-B', 2, { y: -100, motionPath: {path: '#path-B', align: '#path-B'}, ease: Power4.easeInOut}, '-=1.75')
    .to('#parcel-C', 2, { y: -100, motionPath: {path: '#path-C', align: '#path-C'}, ease: Power4.easeInOut}, '-=1.75')
    .to('#parcel-D', 1.9, { y: -100, motionPath: {path: '#path-D', align: '#path-D'}, ease: Power4.easeInOut}, '-=1.75')
    .to(['#parcel-B', '#parcel-C', '#parcel-D'], .3, { opacity: 0, stagger: .1}, '-=.8')
    .to('#parcel-A', .7, { scale: 3.5, ease: 'steps(3)' }, '-=1.1')
    .to('#parcel-A', .5, { rotation: 55, x: 180, y: -180, ease: Power3.easeInOut}, '-=.4')
    .to([letterD2, letterP, letterD], .5, { opacity: 1, rotationZ: 360, stagger: .05, ease: Power3.easeOut}, '-=.1')
    .from(letters, .5, { x: 540, y: 290, ease: Power3.easeOut}, '-=.6')
    .to('#parcel-A', .7, { rotate: 0, x: 180, y: 3, ease: Power3.easeOut }, '-=.2')
    .to(letters, .9, { scale: .2, x: 110, y: 58.346, opacity: 0, ease: Power3.easeInOut})
    .to('#svg-logo', 1.2, { x: 800, opacity: 0, scale: 1000, ease: Power2.easeInOut }, '-=.9')
    .to(overlay, .3, { opacity: 0, ease: Power3.easeIn }, '-=1.21')
    .to(overlay, { zIndex: -1, onComplete: toggleBodyScroll }, '-=1.2')









