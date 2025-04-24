const header = document.querySelector("header");

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".number span");



window.addEventListener('scroll', () => {
    if(!skillsPlayed) skillsCounter();
    if(!mlPlayed)mlCounter()
})

/* -------------------> Sticky Navbar <------------------- */
function stickyNavbar() {
    if (header) {
        header.classList.toggle('scrolled', window.pageYOffset > 0);
    }
}

// Optimización del evento de scroll con debounce
const debounce = (func, wait) => {
    let timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(), wait);
    };
};

stickyNavbar();

window.addEventListener('scroll', debounce(stickyNavbar, 50));

/* -------------------> Reveal Animation <------------------- */

let sr = ScrollReveal({
    duration: 2500,
    distance: "60px",
});

sr.reveal(".showcase-info", {delay: 600})
sr.reveal(".showcase-image", {origin: "top", delay: 700})

/* -------------------> Skills Progress Bar Animation <------------------- */
function hasReached(el) {
    let topPosition = el.getBoundingClientRect().top;
    
    if (window.innerHeight >= topPosition + el.offsetHeight) return true
    return false
}

function updateCount(num, maxNum) {
    let currentNum = +num.innerText;
    
    if (currentNum < maxNum) {
        num.innerText = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxNum);
        }, 12)
    }
}

let skillsPlayed = false;

function skillsCounter() {
    if (!hasReached(first_skill)) return;

    let skillsPlayed = true;

    sk_counters.forEach((counter, i) =>{
        let target = counter.dataset.target;
        let strokeValue = 427 - 427 * (target / 100);

        progress_bars[i].style.setProperty("--target", strokeValue)
    
        setTimeout(() => {
            updateCount(counter, target)
        }, 400)
    })

    progress_bars.forEach( p => (p.style.animation = "progress 2s ease-in-out forwards") )
}

/* -------------------> Services Counter Animation <------------------- */
let mlPlayed = false;

function mlCounter() {
    if (!hasReached(ml_section)) return;

    let mlPlayed = true;

    ml_counters.forEach(ctr =>{
        let target = +ctr.dataset.target;

        setTimeout(() =>{
            updateCount(ctr, target)
        }, 400)
    })
}

/* -------------------> Portfolio Filter Animation <------------------- */
let mixer = mixitup(".portfolio-gallery", {
    selectors:{
        target: ".prt-card"
    },
    animation: {
        duration: 500,
    }
});


//* -------------------> Modal Pop Up Animation <------------------- */
document.addEventListener("DOMContentLoaded", () => {
    const prt_section = document.querySelector(".portfolio");
    const zoom_icons = document.querySelectorAll(".zoom-icon");
    const modal_overlay = document.querySelector(".modal-overlay");
    const images = document.querySelectorAll(".images img");
    const prev_btn = document.querySelector(".prev-btn");
    const next_btn = document.querySelector(".next-btn");

    let currentIndex = 0;

    zoom_icons.forEach((icn, i) =>
        icn.addEventListener("click", () => {
            prt_section.classList.add("open");
            document.body.classList.add("stopScrolling");
            currentIndex = i;
            changeImage(currentIndex);
        })
    );

    modal_overlay.addEventListener("click", () => {
        prt_section.classList.remove("open");
        document.body.classList.remove("stopScrolling");
    });

prev_btn.addEventListener("click", () => {
  if (currentIndex === 0) {
    currentIndex = images.length - 1; // Regresa al último índice
  } else {
    currentIndex--;
  }
  console.log("Previous index:", currentIndex);
  changeImage(currentIndex);
});

next_btn.addEventListener("click", () => {
  if (currentIndex === images.length - 1) {
    currentIndex = 0; // Vuelve al primer índice
  } else {
    currentIndex++;
  }
  console.log("Next index:", currentIndex);
  changeImage(currentIndex);
});

function changeImage(index) {
  images.forEach((img, i) => {
    img.classList.remove("showImage");
    if (i === index) {
      img.classList.add("showImage");
      console.log(`Image ${i} is now visible.`);
    }
  });
}

console.log(images); // Asegúrate de que muestra una lista de las imágenes


});

/* -------------------> SWIPER Animation <------------------- */
document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper', {
        loop: true,
        speed: 500,
        autoplay: true,

        pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

});
});

/* -------------------> Change Active Link ON Scroll <------------------- */
document.addEventListener('DOMContentLoaded', function () {
    let header = document.querySelector('header'); // Define tu header
    let links = document.querySelectorAll('.nav-link'); // Asegúrate de seleccionar los enlaces

    function activeLink() {
        let sections = document.querySelectorAll('section[id]');
        let headerHeight = header ? header.offsetHeight : 0;

        // Encuentra la sección actualmente en el viewport
        let currentSection = Array.from(sections).find(section => {
            let sectionTop = section.getBoundingClientRect().top;
            let sectionHeight = section.offsetHeight;
            
            return (
                sectionTop <= headerHeight && // El borde superior de la sección es visible
                sectionTop + sectionHeight > headerHeight // La sección no está completamente fuera del viewport
            );
        });

        // Si encontramos una sección, actualizamos los enlaces
        if (currentSection) {
            let currentId = currentSection.getAttribute('id');

            links.forEach(link => {
                link.classList.remove('active'); // Elimina la clase "active" de todos los enlaces
                if (link.getAttribute('href').includes(currentId)) {
                    link.classList.add('active'); // Agrega la clase "active" al enlace correspondiente
                }
            });
        }
    }

    window.addEventListener('scroll', activeLink); // Escucha el evento scroll
});

/* -------------------> Change Page Theme <------------------- */
document.addEventListener('DOMContentLoaded', function () {
    const toggle_btn = document.querySelector(".toggle-btn")
    let firstTheme = localStorage.getItem("dark");

    changeTheme(+firstTheme)

    function changeTheme (isDark){
        if (isDark) {
            document.body.classList.add("dark");
            toggle_btn.classList.replace("uil-moon" ,"uil-sun");
            localStorage.setItem("dark", 1);
        }
        else{
            document.body.classList.remove("dark");
            toggle_btn.classList.replace("uil-sun" ,"uil-moon");
            localStorage.setItem("dark", 0);
        }
    }

    toggle_btn.addEventListener("click", () => {
        changeTheme(!document.body.classList.contains("dark"))
    })

});

/* -------------------> Open & Close Navbar Menu <------------------- */
document.addEventListener('DOMContentLoaded', function () {
    let header = document.querySelector('header'); // Define tu header
    let links = document.querySelectorAll('.nav-link'); // Asegúrate de seleccionar los enlaces

    function activeLink() {
        let sections = document.querySelectorAll('section[id]');
        let headerHeight = header ? header.offsetHeight : 0;

        // Encuentra la sección actualmente en el viewport
        let currentSection = Array.from(sections).find(section => {
            let sectionTop = section.getBoundingClientRect().top;
            let sectionHeight = section.offsetHeight;
            
            return (
                sectionTop <= headerHeight && // El borde superior de la sección es visible
                sectionTop + sectionHeight > headerHeight // La sección no está completamente fuera del viewport
            );
        });

        // Si encontramos una sección, actualizamos los enlaces
        if (currentSection) {
            let currentId = currentSection.getAttribute('id');

            links.forEach(link => {
                link.classList.remove('active'); // Elimina la clase "active" de todos los enlaces
                if (link.getAttribute('href').includes(currentId)) {
                    link.classList.add('active'); // Agrega la clase "active" al enlace correspondiente
                }
            });
        }
    }

    window.addEventListener('scroll', activeLink); // Escucha el evento scroll
});

/* -------------------> Change Page Theme <------------------- */
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector(".hamburger")

    hamburger.addEventListener("click", () =>{
        document.body.classList.toggle("open");
        document.body.classList.toggle("stopScrolling");
    });

    this.links.forEach(link => link.addEventListener("click", () => {
        document.body.classList.remove("open");
        document.body.classList.remove("stopScrolling");
    }))
});