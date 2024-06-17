function autoplayCarousel() {
    var fullWidth = document.getElementById('slide-container').offsetWidth;
    var cardWidth = document.getElementById('card').offsetWidth;
    var cardHeight = document.getElementById('card').offsetHeight;
    const emptyCards = document.getElementsByClassName('nikEmpty');

    var emptyWidth = (fullWidth / 2) - (cardWidth / 2);

    // Convert HTMLCollection to an array
    Array.from(emptyCards).forEach(card => {
        card.style.minWidth = `${emptyWidth}px`;
        card.style.minHeight = `${cardHeight}px`;
    });

    const carouselEl = document.getElementById("carousel");
    const slideContainerEl = carouselEl.querySelector("#slide-container");

    // Add click handlers
    document.querySelector("#back-button")
        .addEventListener("click", () => navigate("backward"));
    document.querySelector("#forward-button")
        .addEventListener("click", () => navigate("forward"));
    document.querySelectorAll(".slide-indicator")
        .forEach((dot, index) => {
            dot.addEventListener("click", () => navigate(index));
            dot.addEventListener("mouseenter", () => clearInterval(autoplay));
        });
    // Add keyboard handlers
    document.addEventListener('keydown', (e) => {
        if (e.code === 'ArrowLeft') {
            clearInterval(autoplay);
            navigate("backward");
        } else if (e.code === 'ArrowRight') {
            clearInterval(autoplay);
            navigate("forward");
        }
    });

    // Add resize handler
    window.addEventListener('resize', () => {
        const fullWidth = document.getElementById('slide-container').offsetWidth;
        const cardWidth = document.getElementById('card').offsetWidth;
        const cardHeight = document.getElementById('card').offsetHeight;
        const emptyCards = document.getElementsByClassName('nikEmpty');

        const emptyWidth = (fullWidth / 2) - (cardWidth / 2);

        // Convert HTMLCollection to an array
        Array.from(emptyCards).forEach(card => {
            card.style.minWidth = `${emptyWidth}px`;
            card.style.minHeight = `${cardHeight}px`;
        });
        navigate(0);
    });

    // Autoplay
    let autoplay = setInterval(() => navigate("forward"), 3000);

    carouselEl.addEventListener("mouseenter", () => clearInterval(autoplay));
    carouselEl.addEventListener("mouseleave", () => {
        autoplay = setInterval(() => navigate("forward"), 3000);
    });

    slideContainerEl.addEventListener("mouseenter", () => clearInterval(autoplay));
    slideContainerEl.addEventListener("mouseleave", () => {
        autoplay = setInterval(() => navigate("forward"), 3000);
    });
    
    const FBBtns = document.getElementsByClassName("FBbutton");
    Array.from(FBBtns).forEach(btn => {
        btn.addEventListener("mouseenter", () => clearInterval(autoplay));
        btn.addEventListener("mouseleave", () => {
            autoplay = setInterval(() => navigate("forward"), 3000);
        });
    });

    // Slide transition
    const getNewScrollPosition = (arg) => {
        const noOfCards = document.getElementById('slide-container').childElementCount - 2;
        const maxScrollLeft = cardWidth * (noOfCards - 1);
        if (arg === "forward") {
            const x = slideContainerEl.scrollLeft + cardWidth;
            return x <= maxScrollLeft ? x : 0;
        } else if (arg === "backward") {
            const x = slideContainerEl.scrollLeft - cardWidth;
            return x >= 0 ? x : maxScrollLeft;
        } else if (typeof arg === "number") {
            const x = arg * (cardWidth);
            return x;
        }
    }

    //styling the dot and the mid card
    slideContainerEl.addEventListener('scroll', () => {
        const sl = slideContainerEl.scrollLeft;
        const cardNumber = (sl/cardWidth);
        const dotContainer = document.getElementById("slide-indicators");
        const prevDot = dotContainer.getElementsByClassName('bg-[#00b5e2]')[0];
        const presentDot = dotContainer.children[Math.round(cardNumber)];
        prevDot.classList.add('bg-[#ffffff]');
        prevDot.classList.remove('bg-[#00b5e2]');
        presentDot.classList.add("bg-[#00b5e2]");
        presentDot.classList.remove('bg-[#ffffff]');
    })

    const navigate = (arg) => {
        slideContainerEl.scrollLeft = getNewScrollPosition(arg);
    }
}

function displayDots() {
    const noOfDots = document.getElementById('slide-container').childElementCount - 2;
    const dotContainer = document.getElementById("slide-indicators");
    for(let i = 0; i < noOfDots; i++) {
        const dot = document.createElement('button');
        dot.setAttribute('type', 'button');
        dot.classList.add("slide-indicator", "w-3", "h-3", "rounded-full");
        if(i==0) {
            dot.classList.add("bg-[#00b5e2]");
        } else {
            dot.classList.add("bg-[#ffffff]");
        }
        dotContainer.appendChild(dot);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    displayDots();
    autoplayCarousel();
});
