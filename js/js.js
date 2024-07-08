$(function () {
    'use strict';
    if (window.innerWidth > 1080) {

        // Lenis Smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            infinite: false // Disable infinite scrolling
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Integration Lenis on GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
    }

    // Create animation
    function scrollTrig() {
        gsap.registerPlugin(ScrollTrigger);

        let gsapAnim = gsap.utils.toArray('.gsap__anim');
        gsapAnim.forEach(section => {
            gsap.to(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'bottom bottom',
                    end: 'bottom top',
                    scrub: true,
                    snap: true
                },
                yPercent: 100,
                ease: 'none'
            });
        });

        let parallaxWrapp = gsap.utils.toArray('.parallax__wrapp');
        parallaxWrapp.forEach(parallax => {
            gsap.to(parallax, {
                scrollTrigger: {
                    trigger: parallax,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 3
                },
                yPercent: 4,
                ease: 'none'
            });
        });

        gsap.to('.title-p', {
            scrollTrigger: {
                trigger: 'header.header',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            yPercent: 100
        });

        gsap.to('.title__img img', {
            scrollTrigger: {
                trigger: '.serv',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            rotate: 360,
            ease: 'none'
        });

        gsap.to('.title__t', {
            scrollTrigger: {
                trigger: '.serv',
                start: 'top top',
                end: 'bottom top',
                scrub: 3
            },
            xPercent: -20,
            ease: 'none'
        });

        gsap.to('.serv .stroke', {
            scrollTrigger: {
                trigger: '.serv',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            xPercent: 25,
            ease: 'none'
        });

        gsap.to('.serv__item:nth-child(1)', {
            scrollTrigger: {
                trigger: '.serv',
                start: 'top top',
                end: 'bottom top',
                scrub: 3
            },
            xPercent: -15,
            ease: 'none'
        });

        gsap.to('.serv__item:nth-child(3)', {
            scrollTrigger: {
                trigger: '.serv',
                start: 'top top',
                end: 'bottom top',
                scrub: 3
            },
            xPercent: 15,
            ease: 'none'
        });

        gsap.to('.approve__star', {
            scrollTrigger: {
                trigger: '.approve',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 3
            },
            rotate: 360,
            ease: 'none'
        });
    }

    scrollTrig();

    // Resize windowif


});


document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to("#overlay-dark", 2, {
                    top: "-100%",
                    ease: "power3.inOut",
                    delay: 4,
                    opacity: 1,
                });

                gsap.from(".divider", 3, {
                    scaleX: 0,
                    ease: "power3.inOut",
                    delay: 1,
                    stagger: {
                        amount: 1,
                    },
                    opacity: 1,
                });

                gsap.from(".row > .col", 2, {
                    opacity: 0,
                    y: 40,
                    ease: "power3.inOut",
                    delay: 2,
                    stagger: {
                        amount: 1.5,
                    },
                });

                gsap.from(".marquee", 1, {
                    bottom: "-5%",
                    opacity: 0,
                    ease: "power3.inOut",
                    delay: 4.5,
                });

                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.9}); // Adjust the threshold as needed

    const lastSection = document.getElementById('last-section');
    observer.observe(lastSection);
});


$(function () {

    'use strict';


    // ---- navigation mobile menu ---- //
    function animMobileMenu() {

        $('.nav__item .drop-menu').click(function (e) {
            if ($(window).width() < 993) {
                e.preventDefault();
                $(this).next().slideToggle();
            }
        });

        $('.burger').click(function () {
            let timeAnim = 650;
            $(this).toggleClass("active");
            $('.nav__inner, .nav__menu, .nav__lang').toggleClass("active");
            $(this).css({'pointer-events': 'none'});
            setTimeout(function () {
                $(this).css({'pointer-events': 'auto'});
            }.bind(this), timeAnim);
        });
    }

    animMobileMenu();
});

const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight * 5) {
        navbar.style.position = 'absolute';
        navbar.style.top = `${window.innerHeight * 3}px`; // Adjust top position to maintain flow
    } else {
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
    }
});

// For the scrolling effect on nav links
const navLinks = document.querySelectorAll('.nav__link');

window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight) {
        navLinks.forEach(link => {
            link.style.color = 'black';
        });
    } else {
        navLinks.forEach(link => {
            link.style.color = 'white';
        });
    }
});


const navL = document.querySelectorAll('.burger');

window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight) {
        navL.forEach(link => {
            link.style.color = 'black';
        });
    } else {
        navL.forEach(link => {
            link.style.color = 'white';
        });
    }
});


// Map number x from range [a, b] to [c, d]
const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;

// Gets the mouse position
const getMousePos = (e) => {
    let posx = 0;
    let posy = 0;
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    } else if (e.clientX || e.clientY) {
        posx = e.clientX + body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + body.scrollTop + document.documentElement.scrollTop;
    }

    return {x: posx, y: posy};
};

// MENU class
class Menu {

    constructor(el) {

        this.DOM = {el: el};

        this.DOM.menuItems = this.DOM.el.querySelectorAll('.menu__item');

        this.animatableProperties = {
            // translationX
            tx: {previous: 0, current: 0, amt: 0.08},
            // translationY
            ty: {previous: 0, current: 0, amt: 0.08},
            // Rotation angle
            rotation: {previous: 0, current: 0, amt: 0.08},
            // CSS filter (brightness) value
            brightness: {previous: 1, current: 1, amt: 0.08}
        };

        this.menuItems = [];

        [...this.DOM.menuItems].forEach((item, pos) => {
            this.menuItems.push(new MenuItem(item, pos, this.animatableProperties));
        });

    }

}

// MENU ITEM CLASS
class MenuItem {

    constructor(el, inMenuPosition, animatableProperties) {

        this.DOM = {el: el};
        this.inMenuPosition = inMenuPosition;
        this.animatableProperties = animatableProperties;

        this.layout();
        this.initEvents();
    }

    layout() {
        this.DOM.reveal = document.createElement('div');
        this.DOM.reveal.className = 'hover-reveal';
        this.DOM.revealInner = document.createElement('div');
        this.DOM.revealInner.className = 'hover-reveal__inner';
        this.DOM.revealImage = document.createElement('div');
        this.DOM.revealImage.className = 'hover-reveal__img';
        this.DOM.revealImage.style.backgroundImage = `url(${images[this.inMenuPosition][1]})`;

        this.DOM.revealInner.appendChild(this.DOM.revealImage);
        this.DOM.reveal.appendChild(this.DOM.revealInner);
        this.DOM.el.appendChild(this.DOM.reveal);
    }

    calcBounds() {
        this.bounds = {
            el: this.DOM.el.getBoundingClientRect(),
            reveal: this.DOM.reveal.getBoundingClientRect()
        };
    }

    initEvents() {
        this.mouseenterFn = (ev) => {
            this.showImage();
            this.firstRAFCycle = true;
            this.loopRender();
        };

        this.mouseleaveFn = () => {
            this.stopRendering();
            this.hideImage();
        };

        this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
        this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
    }

    showImage() {
        gsap.killTweensOf(this.DOM.revealInner);
        gsap.killTweensOf(this.DOM.revealImage);
        this.tl = gsap.timeline({
            onStart: () => {
                this.DOM.reveal.style.opacity = 1;
                gsap.set(this.DOM.el, {zIndex: images.length});
            }
        })
            .to(this.DOM.revealInner, 1, {
                startAt: {x: direction.x < 0 ? '-100%' : '100%'},
                x: '0%',
                ease: 'Expo.easeOut'
            })
            .to(this.DOM.revealImage, 1, {
                startAt: {x: direction.x < 0 ? '100%' : '-100%'},
                x: '0%',
                ease: 'Expo.easeOut'
            }, 0);

    }

    hideImage() {
        gsap.killTweensOf(this.DOM.revealInner);
        gsap.killTweensOf(this.DOM.revealImage);

        this.tl = gsap.timeline({
            onStart: () => {
                gsap.set(this.DOM.el, {zIndex: 1});
            },
            onComplete: () => {
                gsap.set(this.DOM.reveal, {opacity: 0});
            }
        })
            .to(this.DOM.revealInner, 0.2, {
                x: direction.x < 0 ? '100%' : '-100%',
                ease: 'Expo.easeOut'
            })
            .to(this.DOM.revealImage, 0.2, {
                x: direction.x < 0 ? '-100%' : '100%',
                ease: 'Expo.easeOut'
            }, 0);
    }

    loopRender() {
        if (!this.requestId) {
            this.requestId = requestAnimationFrame(() => this.render());
        }
    }

    stopRendering() {
        if (this.requestId) {
            window.cancelAnimationFrame(this.requestId);
            this.requestId = undefined;
        }
    }

    render() {
        this.requestId = undefined;
        // calculate position/sizes the first time
        if (this.firstRAFCycle) {
            this.calcBounds();
        }

        // calculate the mouse distance (current vs previous cycle)
        const mouseDistanceX = clamp(Math.abs(mousePosCache.x - mousepos.x), 0, 100);
        // direction where the mouse is moving
        direction = {x: mousePosCache.x - mousepos.x, y: mousePosCache.y - mousepos.y};
        // updated cache values
        mousePosCache = {x: mousepos.x, y: mousepos.y};

        // new translation values
        // the center of the image element is positioned where the mouse is
        this.animatableProperties.tx.current = Math.abs(mousepos.x - this.bounds.el.left) - this.bounds.reveal.width / 2;
        this.animatableProperties.ty.current = Math.abs(mousepos.y - this.bounds.el.top) - this.bounds.reveal.height / 2;
        // new rotation value
        this.animatableProperties.rotation.current = this.firstRAFCycle ? 0 : map(mouseDistanceX, 0, 100, 0, direction.x < 0 ? 60 : -60);
        // new filter value
        this.animatableProperties.brightness.current = this.firstRAFCycle ? 1 : map(mouseDistanceX, 0, 100, 1, 4);

        // set up the interpolated values
        // for the first cycle, both the interpolated values need to be the same so there's no "lerped" animation between the previous and current state
        this.animatableProperties.tx.previous = this.firstRAFCycle ? this.animatableProperties.tx.current : lerp(this.animatableProperties.tx.previous, this.animatableProperties.tx.current, this.animatableProperties.tx.amt);
        this.animatableProperties.ty.previous = this.firstRAFCycle ? this.animatableProperties.ty.current : lerp(this.animatableProperties.ty.previous, this.animatableProperties.ty.current, this.animatableProperties.ty.amt);
        this.animatableProperties.rotation.previous = this.firstRAFCycle ? this.animatableProperties.rotation.current : lerp(this.animatableProperties.rotation.previous, this.animatableProperties.rotation.current, this.animatableProperties.rotation.amt);
        this.animatableProperties.brightness.previous = this.firstRAFCycle ? this.animatableProperties.brightness.current : lerp(this.animatableProperties.brightness.previous, this.animatableProperties.brightness.current, this.animatableProperties.brightness.amt);

        // set styles
        gsap.set(this.DOM.reveal, {
            x: this.animatableProperties.tx.previous,
            y: this.animatableProperties.ty.previous,
            rotation: this.animatableProperties.rotation.previous,
            filter: `brightness(${this.animatableProperties.brightness.previous})`
        });

        // loop
        this.firstRAFCycle = false;
        this.loopRender();
    }

}


const menuEl = document.querySelector('.menu');
const imagesEl = document.querySelectorAll('.menu__item');
let imagesArr = [];
imagesEl.forEach(image => {
    imagesArr.push(image.dataset.img);
});
const images = Object.entries(imagesArr);
let mousepos = {x: 0, y: 0};
let mousePosCache = mousepos;
let direction = {x: mousePosCache.x - mousepos.x, y: mousePosCache.y - mousepos.y};

window.addEventListener('mousemove', ev => mousepos = getMousePos(ev));
const scroll = new LocomotiveScroll({el: menuEl, smooth: true});
new Menu(menuEl);





const sam = document.getElementById("sam");

window.onmousemove = (e) => {
    const precent = e.clientX / window.innerWidth;
    sam.animate({
        transform: `translate(${precent * sam.offsetWidth * -1}px, -50%)`,},{
fill: "forwards",
duration:3000,
}
);
};
