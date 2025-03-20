document.addEventListener("DOMContentLoaded", function () {
    let splineFrame = document.getElementById("spline-scene");
    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                splineFrame.src = splineFrame.dataset.src;
                observer.unobserve(splineFrame);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(splineFrame);
});
gsap.registerPlugin(ScrollTrigger);

gsap.to("#spline-container", {
    scrollTrigger: {
        trigger: "#spline-container",
        start: "top center",
        end: "bottom top",
        scrub: true, // Creates smooth animation effect
    },
    scale: 1.1, // Slight zoom on scroll
    opacity: 1,
    y: 50, // Moves the model slightly while scrolling
});

// Custom Cursor Animation
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

// Update cursor position on mouse move
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
});

// Timeline Scroll Animation
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineLine = document.querySelector('.timeline-line');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const timelineOffset = document.querySelector('.timeline').offsetTop;
    const timelineHeight = document.querySelector('.timeline').offsetHeight;

    // Calculate the progress of the timeline
    const progress = (scrollY - timelineOffset) / timelineHeight;

    // Update the cursor position based on the timeline progress
    if (progress >= 0 && progress <= 1) {
        const cursorY = timelineOffset + (timelineHeight * progress);
        cursor.style.top = `${cursorY}px`;
    }

    // Animate timeline items as they come into view
    timelineItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const itemHeight = item.offsetHeight;

        if (itemTop < window.innerHeight * 0.8 && itemTop > -itemHeight) {
            item.style.opacity = 1;
            item.style.transform = 'translateY(0)';
        } else {
            item.style.opacity = 0;
            item.style.transform = 'translateY(20px)';
        }
    });

    // Animate the timeline line
    if (scrollY >= timelineOffset && scrollY <= timelineOffset + timelineHeight) {
        timelineLine.style.height = `${progress * 100}%`;
    }
});


// Smooth scrolling for the container
const scrollContainer = document.querySelector('.scroll-container');

scrollContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    scrollContainer.scrollBy({
        left: e.deltaY < 0 ? -100 : 100, // Adjust scroll speed
        behavior: 'smooth'
    });
});

const codeElement = document.getElementById('code');
const codeLines = [
    "function publishResearch() {",
    "  const research = {",
    "    title: 'D2D Communication in 5G',",
    "    authors: '[Kanishkaa Priyadarshi'],",
    "    year: 2025,",
    "    journal: 'IEEE INCIP- MANIPAL INSTITUTE OF TECHNOLOGY'",
    "  };",
        "    title: 'Antenna Array Synthesis using optimization techniques',",
        "    authors: '[Kanishkaa Priyadarshi'],",
        "    year: 2025,",
        "    journal: 'IEEE INCIP- MANIPAL INSTITUTE OF TECHNOLOGY'",
        "  };",
    "  return research;",
    "}"
];

let lineIndex = 0;
let charIndex = 0;

function typeCode() {
    if (lineIndex < codeLines.length) {
        if (charIndex < codeLines[lineIndex].length) {
            codeElement.textContent += codeLines[lineIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeCode, 50); // Adjust typing speed (in milliseconds)
        } else {
            codeElement.textContent += '\n'; // Move to the next line
            lineIndex++;
            charIndex = 0;
            setTimeout(typeCode, 100); // Delay before starting the next line
        }
    }
}

// Start the typing animation
typeCode();

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let name = document.querySelector('input[name="name"]').value;
    let email = document.querySelector('input[name="email"]').value;
    let message = document.querySelector('textarea[name="message"]').value;
    
    if (name && email && message) {
        alert('Thank you, ' + name + '! Your message has been sent.');
        document.getElementById('contactForm').reset();
    } else {
        alert('Please fill in all fields.');
    }
});
