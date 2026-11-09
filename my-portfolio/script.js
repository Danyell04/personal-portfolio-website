const MY_EMAIL = "dprlszq@gmail.com";

const SKILLS = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "MongoDB",
    "SQL",
    "Git",
    "GitHub",
];

const ITEMS = [
    // PROJECTS

    {
        type: "Project",
        title: "Personal Portfolio Website",
        text: "A school project featuring a personal portfolio that showcases my background, interests, skills, and achievements using HTML, CSS, and JavaScript.",
        img: "images/projects/portfolio.jpg"
    },

    {
        type: "Project",
        title: "Vayne - League of Legends Website",
        text: "A school project featuring a dedicated website about Vayne, a champion from League of Legends. It presents her character information, abilities, and other game-related details.",
        img: "images/projects/vayne.jpg"
    },

    // CERTIFICATES

    {
        type: "Certificate",
        title: "National Certification II",
        text: "A nationally recognized certification demonstrating technical knowledge and practical competencies.",
        img: "images/certificates/certificate-2.jpg"
    },

    {
        type: "Certificate",
        title: "APAC Cybersecurity",
        text: "Focuses on cybersecurity awareness and fundamental information security concepts.",
        img: "images/certificates/certificate-1.jpg"
    },

    {
        type: "Certificate",
        title: "Six Sigma White Belt",
        text: "Covers the fundamentals of Six Sigma and the importance of continuous improvement.",
        img: "images/certificates/certificate-3.jpg"
    },

    {
        type: "Certificate",
        title: "Six Sigma Yellow Belt",
        text: "Demonstrates knowledge of process improvement, problem-solving, and quality management.",
        img: "images/certificates/certificate-4.jpg"
    }
];


/* ================================================
   PLACEHOLDER IMAGE GENERATOR
================================================ */

function ph(label, i) {

    const g = 235 - i * 12;

    const s = `
        <svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>
            <rect width='800' height='600' fill='rgb(${g},${g},${g})'/>
            <text x='400' y='310' font-family='Arial' font-size='32' fill='#777' text-anchor='middle'>${label}</text>
            <text x='400' y='352' font-family='Arial' font-size='18' fill='#999' text-anchor='middle'>Replace this image</text>
        </svg>
    `;

    return "data:image/svg+xml;utf8," + encodeURIComponent(s);
}


/* ================================================
   PROFILE PHOTO AND SKILLS
================================================ */

// Profile photo is handled directly by HTML.
// JavaScript only displays the skills.

document.getElementById("skills").textContent =
    SKILLS.join("  ·  ");


/* ================================================
   IMAGE LIGHTBOX / ZOOM
================================================ */

const lb = document.getElementById("lb");
const lbImage = lb.querySelector("img");


// Open enlarged image

function openLightbox(src, alt = "") {

    lbImage.src = src;
    lbImage.alt = alt;

    lb.classList.add("on");

}


// Close enlarged image

function closeLightbox() {

    lb.classList.remove("on");

    lbImage.src = "";

}


// Close when clicking the background

lb.onclick = closeLightbox;


// Prevent image click from closing the lightbox

lbImage.onclick = e => {
    e.stopPropagation();
};


// Close using Escape key

document.addEventListener("keydown", e => {

    if (e.key === "Escape" && lb.classList.contains("on")) {
        closeLightbox();
    }

});


// Profile picture zoom

const avatar = document.getElementById("avatar");

avatar.addEventListener("click", () => {

    openLightbox(avatar.src, avatar.alt);

});


/* ================================================
   PROJECTS AND CERTIFICATES
================================================ */

const grid = document.getElementById("grid");

ITEMS.forEach((it, i) => {

    const c = document.createElement("article");

    c.className = "item";

    c.innerHTML = `
        <div class="im">
            <img alt="${it.title}">
        </div>

        <div class="meta">
            <h3>${it.title}</h3>
            <small>${it.type}</small>
        </div>

        <p>${it.text}</p>
    `;

    const im = c.querySelector("img");

    const fb = ph(it.title, i);

    im.src = it.img || fb;

    im.onerror = () => {
        im.onerror = null;
        im.src = fb;
    };


    // Open project or certificate image

    c.onclick = () => {

        openLightbox(im.src, im.alt || it.title);

    };

    grid.appendChild(c);

});


/* ================================================
   SCROLL REVEAL ANIMATION
================================================ */

const io = new IntersectionObserver(

    es => es.forEach(e => {

        if (e.isIntersecting) {

            e.target.classList.add("on");

            io.unobserve(e.target);

        }

    }),

    {
        threshold: .1
    }

);

document.querySelectorAll("section:not(#home) .wrap").forEach(el => {

    el.classList.add("rv");

    io.observe(el);

});


/* ================================================
   ACTIVE NAVIGATION
================================================ */

const links = [...document.querySelectorAll("nav a")];

const so = new IntersectionObserver(

    es => es.forEach(e => {

        if (e.isIntersecting) {

            links.forEach(a => {

                a.classList.toggle(
                    "on",
                    a.getAttribute("href") === "#" + e.target.id
                );

            });

        }

    }),

    {
        rootMargin: "-45% 0px -50% 0px"
    }

);

document.querySelectorAll("section").forEach(s => {

    so.observe(s);

});


/* ================================================
   CONTACT FORM
================================================ */

document.getElementById("form").onsubmit = e => {

    e.preventDefault();

    const n = document.getElementById("n").value;
    const em = document.getElementById("e").value;
    const m = document.getElementById("m").value;

    location.href =
        `mailto:${MY_EMAIL}?subject=${encodeURIComponent("Message from " + n)}&body=${encodeURIComponent(m + "\n\n" + n + " (" + em + ")")}`;

};


/* ================================================
   AUTOMATIC FOOTER YEAR
================================================ */

document.getElementById("yr").textContent =
    new Date().getFullYear();


/* ================================================
   PET ANIMATIONS
   Orange cat (wanders)
   and cream dog (follows cursor)
================================================ */

let mouseX = null;
let mouseT = 0;

addEventListener("mousemove", e => {

    mouseX = e.clientX;

    mouseT = performance.now();

});


/* ================================================
   PET SVG COMPONENTS
================================================ */

const L = 'class="leg ';

const mk = (c, d, x) => `

    <svg viewBox="0 0 90 56">

        <path
            class="tail"
            d="${x ? 'M16 26C4 24 4 14 8 8' : 'M16 26C4 26 2 10 10 6'}"
            fill="none"
            stroke="${c}"
            stroke-width="5"
            stroke-linecap="round"
        />

        <rect ${L}a" x="22" y="34" width="6" height="18" rx="3" fill="${d}"/>
        <rect ${L}b" x="30" y="34" width="6" height="18" rx="3" fill="${c}"/>
        <rect ${L}c" x="50" y="34" width="6" height="18" rx="3" fill="${d}"/>
        <rect ${L}d" x="58" y="34" width="6" height="18" rx="3" fill="${c}"/>

        <rect
            x="${x ? 12 : 14}"
            y="18"
            width="${x ? 54 : 52}"
            height="22"
            rx="11"
            fill="${c}"
        />

        <circle
            cx="${x ? 71 : 70}"
            cy="22"
            r="${x ? 11 : 12}"
            fill="${c}"
        />

        ${x ? `

            <rect x="74" y="22" width="13" height="9" rx="4.5" fill="#bbb"/>
            <circle cx="86" cy="24" r="2.3" fill="#111"/>
            <ellipse cx="65" cy="20" rx="4" ry="8" transform="rotate(12 65 20)" fill="#666"/>
            <circle cx="74" cy="19" r="1.9" fill="#111"/>

        ` : `

            <polygon points="61,14 63,2 70,11" fill="${c}"/>
            <polygon points="72,11 79,2 80,16" fill="${c}"/>
            <circle cx="66" cy="21" r="2" fill="#fff"/>
            <circle cx="74" cy="21" r="2" fill="#fff"/>

        `}

    </svg>

`;


/* ================================================
   PET SETTINGS
================================================ */

const pets = [

    {
        svg: mk("#ff9436", "#cc6600", 0),
        say: "Meow!",
        speed: 44,
        follow: false
    },

    {
        svg: mk("#f1d299", "#d0aa67", 1),
        say: "Woof!",
        speed: 64,
        follow: true
    }

];


/* ================================================
   CREATE PETS
================================================ */

pets.forEach((p, i) => {

    p.el = document.createElement("div");

    p.el.className = "pet walk";

    p.el.innerHTML = `

        <span class="bubble">${p.say}</span>

        <div class="hb">
            ${p.svg}
        </div>

    `;

    document.body.appendChild(p.el);

    p.svgEl = p.el.querySelector("svg");

    p.x = Math.random() * Math.max(200, innerWidth - 100);

    p.dir = i ? -1 : 1;

    p.pause = 0;

    p.next = performance.now() + 2000 + Math.random() * 4000;


    // Pet click interaction

    p.el.onclick = () => {

        p.el.classList.add("say", "hop");

        setTimeout(() => {

            p.el.classList.remove("say", "hop");

        }, 900);

    };

});


/* ================================================
   PET MOVEMENT ANIMATION
================================================ */

let last = performance.now();

(function tick(now) {

    const dt = Math.min((now - last) / 1000, .1);

    last = now;

    const max = Math.max(0, innerWidth - 70);

    pets.forEach(p => {

        let w = true;

        let sp = p.speed;


        // Dog follows the mouse cursor

        if (p.follow && mouseX !== null && now - mouseT < 3500) {

            const tx = mouseX - 35;

            sp = p.speed * 2.4;

            if (Math.abs(tx - p.x) > 14) {

                p.dir = tx > p.x ? 1 : -1;

            } else {

                w = false;

            }

        }


        // Pet pauses before moving again

        else if (p.pause > now) {

            w = false;

        }


        // Random pet movement

        else if (now > p.next) {

            p.pause = now + 1500 + Math.random() * 2500;

            p.next = p.pause + 3000 + Math.random() * 6000;

            if (Math.random() < .5) {

                p.dir *= -1;

            }

            w = false;

        }


        // Update pet position

        if (w) {

            p.x += p.dir * sp * dt;

            if (p.x < 0) {

                p.x = 0;

                p.dir = 1;

            }

            if (p.x > max) {

                p.x = max;

                p.dir = -1;

            }

        }


        // Update pet appearance and direction

        p.el.classList.toggle("walk", w);

        p.el.style.transform = `translateX(${p.x}px)`;

        p.svgEl.style.transform = `scaleX(${p.dir})`;

    });


    requestAnimationFrame(tick);

})(last);
