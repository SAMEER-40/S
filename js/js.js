$(function () {
    'use strict';

    // Lenis Smooth scroll
    const lenis = new Lenis({
        duration: 3,
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

    // Smooth scrolling for navigation links
    $('.navbar a').on('click', function (e) {
        e.preventDefault();
        const target = $(this).attr('href');
        lenis.scrollTo(target);
    });

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
                    scrub: 3,
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
                yPercent: -20,
                ease: 'none'
            });
        });

        gsap.to('.title-p', {
            scrollTrigger: {
                trigger: 'header.header',
                start: 'top top',
                end: 'bottom top',
                scrub: 3
            },
            yPercent: 0
        });

        gsap.to('.title__img img', {
            scrollTrigger: {
                trigger: '.serv',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 3
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
                scrub: 3
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
            xPercent: -25,
            ease: 'none'
        });

        gsap.to('.serv__item:nth-child(3)', {
            scrollTrigger: {
                trigger: '.serv',
                start: 'top top',
                end: 'bottom top',
                scrub: 3
            },
            xPercent: 25,
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

    // Resize window

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
    }, {threshold: 0.5}); // Adjust the threshold as needed

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
    if (window.scrollY > window.innerHeight * 7) {
        navbar.style.position = 'absolute';
        navbar.style.top = `${window.innerHeight * 5}px`; // Adjust top position to maintain flow
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

    document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".flex-cards");

    const observerOptions = {
    root: null, // Use the viewport as the container
    rootMargin: "0px",
    threshold: 0.1, // Trigger when 10% of the section is visible
};

    const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
    entry.target.classList.add("visible");
    observer.unobserve(entry.target); // Stop observing once the animation is applied
}
});
}, observerOptions);

    sections.forEach(section => {
    observer.observe(section);
});
});