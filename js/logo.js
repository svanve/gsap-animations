const   bgColorDiv = document.querySelector('#bg-color-div'),
        logoDice = document.querySelector('#logo-dice');

// - - - GSAP - - - - - - - //

let tlLogo = new gsap.timeline({
    scrollTrigger: {
        trigger: ".triggerElement",
        start: 'top 680',
        end: 'top 318',
        scrub: 1
    }
});

tlLogo.pause()
    .to(logoDice, 5, {rotate: 360, ease: 'linear'})
    /* .to(bgColorDiv, 5, {backgroundColor: '#000', ease: Power1.easeInOut}, '-=5') */

new AnimPanel()


