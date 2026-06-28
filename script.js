/* =====================================================
   APPLE PORTFOLIO
   script.js (Part 1)
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       SELECTORS
    ========================================== */

    const header = document.querySelector("header");
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section");
    const revealItems = document.querySelectorAll(
        ".about,.skills,.projects,.experience,.contact,footer"
    );
    const hero = document.querySelector(".hero");
    const typingElement = document.querySelector(".small-text");



    /* ==========================================
       HERO FADE
    ========================================== */

    hero.style.opacity = "0";
    hero.style.transform = "translateY(40px)";

    setTimeout(() => {

        hero.style.transition = "1s ease";

        hero.style.opacity = "1";

        hero.style.transform = "translateY(0)";

    },200);



    /* ==========================================
       TYPING EFFECT
    ========================================== */

    const words = [

        "SOFTWARE ENGINEER",

        "JAVA DEVELOPER",

        "FULL STACK DEVELOPER",

        "PROBLEM SOLVER"

    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type(){

        const current = words[wordIndex];

        if(!deleting){

            typingElement.textContent =
            current.substring(0,charIndex++);

            if(charIndex > current.length){

                deleting = true;

                setTimeout(type,1500);

                return;

            }

        }

        else{

            typingElement.textContent =
            current.substring(0,charIndex--);

            if(charIndex < 0){

                deleting = false;

                wordIndex++;

                if(wordIndex >= words.length){

                    wordIndex = 0;

                }

            }

        }

        setTimeout(type,deleting ? 40 : 90);

    }

    type();



    /* ==========================================
       PROGRESS BAR
    ========================================== */

    const progress = document.createElement("div");

    progress.className = "progress-bar";

    progress.style.position = "fixed";
    progress.style.top = "0";
    progress.style.left = "0";
    progress.style.width = "0";
    progress.style.height = "4px";
    progress.style.background = "#111";
    progress.style.zIndex = "99999";

    document.body.appendChild(progress);



    /* ==========================================
       SCROLL REVEAL
    ========================================== */

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    entry.target.classList.add("show");

                }

            });

        },

        {

            threshold:.2

        }

    );

    revealItems.forEach(item=>observer.observe(item));



    /* ==========================================
       SMOOTH SCROLL
    ========================================== */

    navLinks.forEach(link=>{

        link.addEventListener("click",e=>{

            e.preventDefault();

            const target=document.querySelector(

                link.getAttribute("href")

            );

            if(target){

                window.scrollTo({

                    top:

                    target.getBoundingClientRect().top +

                    window.pageYOffset - 80,

                    behavior:"smooth"

                });

            }

        });

    });



    /* ==========================================
       MAIN SCROLL HANDLER
    ========================================== */

    window.addEventListener("scroll",()=>{

        const scrollY = window.scrollY;

        /* Navbar */

        if(scrollY>40){

            header.style.background="rgba(255,255,255,.90)";
            header.style.backdropFilter="blur(30px)";
            header.style.boxShadow="0 10px 30px rgba(0,0,0,.05)";

        }

        else{

            header.style.background="rgba(255,255,255,.75)";
            header.style.backdropFilter="blur(20px)";
            header.style.boxShadow="none";

        }


        /* Progress */

        const total =

        document.documentElement.scrollHeight -

        window.innerHeight;

        progress.style.width =

        (scrollY/total)*100 + "%";


        /* Active Navigation */

        sections.forEach(section=>{

            const top = section.offsetTop - 200;

            const bottom = top + section.offsetHeight;

            if(scrollY >= top && scrollY < bottom){

                navLinks.forEach(link=>{

                    link.classList.remove("active");

                    if(

                        link.getAttribute("href")

                        ===

                        "#" + section.id

                    ){

                        link.classList.add("active");

                    }

                });

            }

        });

    });



    /* ==========================================
       BUTTON HOVER
    ========================================== */

    document.querySelectorAll(".btn").forEach(btn=>{

        btn.addEventListener("mouseenter",()=>{

            btn.style.transform="translateY(-3px)";

        });

        btn.addEventListener("mouseleave",()=>{

            btn.style.transform="translateY(0)";

        });

    });



    console.log("Portfolio Loaded Successfully");

});
