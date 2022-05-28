const bannerWrap = document.querySelector('#banner-wrap');
const cardboardBox = document.querySelector('#cardboard-box');
const bannerText = document.querySelector('#banner-text');
const bannerText2 = document.querySelector('#banner-text-2');
const bannerText3 = document.querySelector('#banner-text-3');
const bannerCouponBtn = document.querySelector('#banner-coupon-btn');
const shadow = document.querySelector('#shadow');
const shadowGradient = document.querySelector('#Unbenannter_Verlauf');
const coversOpenParent = document.querySelector('#covers-open');
const coversOpenArr = Array.from(coversOpenParent.children);
const coversClosedParent = document.querySelector('#covers-closed');
const coversClosedArr = Array.from(coversClosedParent.children);
const coupon = document.querySelector('#coupon')
var userHasClicked = false;

const   tlStart = new gsap.timeline(),
        tlBoxHover = new gsap.timeline({ repeat: -1, repeatDelay: 0 }),
        tlKillBannerText = new gsap.timeline(),
        tlAfterClick = new gsap.timeline();

const textArr = ['Click Me!', 'Order today and...', '...get your delivery today!', 'Your first Same Day Delivery is FREE*.'];

// - - - TIMELINES BEFORE CLICK - - - - - - - - - - - - - - - - - - - - - - - 

function renderText(ArrIndex) {
    bannerText.innerText = textArr[ArrIndex];
}

tlStart
    .add(renderText(0))
    .from(bannerText, .3, { scale: 0, transformOrigin: "57px 15.25px", ease: Power3.easeOut }, '+=.9') // 1.2
    .from(cardboardBox, .3, { scale: 0, transformOrigin: "165px 150px", ease: Power2.easeOut }, '-=.3') // 1.2
    .from(shadow, .3, { scale: 0, ease: Power3.easeInOut, onComplete: () => tlBoxHover.play() }, '-=.3') // 1.2

tlBoxHover.pause()
    .add('tlStartEnd')
    .to(cardboardBox, .6, { y: -10, ease: Power1.easeInOut }, 'tlStartEnd') // .6
    .to(cardboardBox, .6, { y: 0, ease: Power1.easeInOut }, 'tlStartEnd +=0') // 1.2
    .to(shadow, .6, { scale: 0.90, ease: Power1.easeInOut }, 'tlStartEnd') // 1.8
    .to(shadow, .6, { scale: 1, ease: Power1.easeInOut, onComplete: nextTlCheck }, 'tlStartEnd +=0')
    .add('tlBoxHoverEnd')

bannerWrap.addEventListener('click', toggleUserHasClicked);

function timeoutBoxHover(){
    setTimeout(() => {
        userHasClicked = true;
    }, 10000);
}

function toggleUserHasClicked() {
    userHasClicked = true;
}

function nextTlCheck() {
    timeoutBoxHover();
    if(userHasClicked){
        toggleUserHasClicked()
        tlStart.pause()
        tlBoxHover.pause()
        tlKillBannerText.play()
        bannerWrap.style = 'pointer-events: none;';
    } else {
        tlBoxHover.restart();
    }
}

// - - - TIMELINES AFTER CLICK - - - - - - - - - - - - - - - - - - - - - - - - - 

tlKillBannerText.pause()
    .to(bannerText, .6, { left: 1300, onComplete: () => {
        typeText1();
        tlAfterClick.play(0);
    }, ease: Power2.easeIn }, 'tlBoxHoverEnd')

function typeText1() {
    Typed.new('#banner-text-2', {
        strings: [textArr[1]],
        stringsElement: null,
        typeSpeed: 0,
        startDelay: 0,
        attr: null,
        contentType: 'html',
        showCursor: false
    })
}

function typeText2() {
    showText3()
    Typed.new('#banner-text-3', {
        strings: [textArr[2], textArr[3]],
        stringsElement: null,
        typeSpeed: 0,
        backspeed: 0,
        backDelay: 1000,
        startDelay: 0,
        attr: null,
        contentType: 'html',
        onLastStringBackspaced: self,
        showCursor: false,
    })
}

tlAfterClick.pause()
    .add(typeText1)
    .to(bannerText2, .8, { left: 1200, opacity: 0, ease: Power2.easeIn, onComplete: typeText2 }, '+=1.4')
    .to([cardboardBox, shadow], 1.2, { x: 670, ease: Power2.easeInOut }, '-=.7')
    .to([cardboardBox], 1, { rotate: 360, ease: Power2.easeInOut }, '-=1.1')
    .to(shadow, .6, { transformOrigin: '123px 78px', opacity: 0.4, scaleX: .6, scaleY: .4, borderRadius: 50, ease: Power4.easeInOut, repeat: 1, yoyo: true }, '-=1.2')
    .add('unzip')
    .add( ()=>unzip(1, 'unzip +=4.2') )
    .add( ()=>unzip(2, 'unzip +=4.6') )
    .add( ()=>unzip(3, 'unzip +=5') )
    .add( ()=>unzip(4, 'unzip +=5.4') )
    .to(coversOpenArr[3], .6, { opacity: 0, eease: Power3.easeInOut }, 'unzip +=6.1')
    .to(coversOpenArr[0], .6, { opacity: 0, ease: Power3.easeInOut }, 'unzip +=6.1')    
    .to(cardboardBox, 1, { y: 10, ease: Power3.easeOut, onStart: toggleDarkenShadow }, 'unzip +=6.3')
    .to(coupon, .6, { y: -60, ease: Power1.easeOut, onComplete: togglePointerEvents}, 'unzip +=6.3')
    .to(coupon, .6, { y: -50, yoyo: true, repeat: 10, ease: Power1.easeInOut, onComplete: restartTlAfterClick }, 'unzip +=6.9')
    .to(bannerCouponBtn, .6, { left: 101, ease: 'back.out(1.7)' }, 'unzip +=7.2')

// CardboardBox Unzipping in 4 Steps
function unzip(stepNr, timing) {
    tlAfterClick
        .to(coversClosedArr[4-stepNr], 1, { opacity: 0, ease: Power3.easeInOut }, timing)
        .to(coversOpenArr[4-stepNr], 1, { opacity: 1, ease: Power3.easeInOut }, timing)
};

function restartTlAfterClick() {
    hideText3();
    tlAfterClick
        .restart()
    toggleDarkenShadow();
}

function hideText3() {
    bannerText3.style.opacity = 0;
}

function showText3() {
    bannerText3.style.opacity = 1;
}

let shadowIsDark;
function toggleDarkenShadow() {
    if(!shadowIsDark){
        shadowGradient.children[0].attributes[1].nodeValue = 0.9;
        shadowIsDark = true;
    } else if(shadowIsDark) {
        shadowGradient.children[0].attributes[1].nodeValue = 0.73;
        shadowIsDark = false;
    }
}

function togglePointerEvents() {
    bannerWrap.style = 'pointer-events: auto;';
}



