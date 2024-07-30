window.addEventListener('resize', () => {
    location.reload();

});
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

window.addEventListener('load', () => {
    window.scrollTo(0, 0);

});
gsap.registerPlugin(ScrollTrigger);


const sapcer = document.querySelector('.typography')
const helloContainer = document.querySelector('.hello-container')
const rect = helloContainer.getBoundingClientRect()
const horizontalText = document.querySelector('.wrapper-scroll');


gsap.from('.intro', {
    transform: 'scale(0.1,0.1)',
    ease: 'linear',
    scrollTrigger: {
        trigger: 'video',
        scrub: 1,
        start: helloContainer.offsetTop,
        end: sapcer.offsetTop / 2.19,
    }
})
const getScrollMax = () => {
    const parent = document.querySelector('.wrapper-scroll-horizontal');
    const childDiv = document.querySelector('.horizontal-text');
    return childDiv.offsetWidth - window.innerWidth;
}

const parent = document.querySelector('.wrapper-scroll-horizontal');
const childDiv = document.querySelector('.horizontal-text');


const width = childDiv.offsetWidth;
const scrollMax = width - window.innerWidth;

console.log(`translate(-${scrollMax}, 0)`)

gsap.to(childDiv, {
    transform: `translate(-${getScrollMax()}px, 0)`,
    ease: 'linear',
    duration: 4,
    scrollTrigger: {
        trigger: parent,
        start: "top top",
        end: () => `+=${getScrollMax()}`,
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
    }
})

window.addEventListener('load', ()=>{
    const mainHello = document.querySelector(".main-Hello")
    const text = mainHello.textContent
    mainHello.innerHTML = ''
    text.split('').forEach((char, index) => {
        const span = document.createElement('div');
        span.textContent = char;
        mainHello.appendChild(span);
    })
    const letters = mainHello.querySelectorAll('div')
    const loader = document.querySelector('.loader')
    const loadingNumberElement = document.querySelector('.loading-number');
    let loadingProgress = {
        value: 0
    };
    
    const tl = gsap.timeline()
    tl.to(loadingProgress, {
        value: 100,
        duration: 2,
        ease: "linear",
        onUpdate: () => {
            loadingNumberElement.textContent = `${Math.round(loadingProgress.value)}`;
        },
        onComplete: () => {
            loadingNumberElement.textContent = '100';
        }
    })
    tl.to(loader, {
        transform: 'translate(0,-100%)',
        duration: 0.7,
        ease: 'power2.out'
    }, 'same')
    tl.from(letters, {
        y: 500,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "power2.out"
    }, 'same');
    tl.to(loader, {
        display: "none"
    })
})
