// Basit interaktivite: tarih, form submit ve aktif nav link
document.addEventListener("DOMContentLoaded", () => {
  const y = new Date().getFullYear();
  ["year", "year2", "year3", "year4"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = y;
  });

  const links = document.querySelectorAll(".main-nav .nav-link");
  links.forEach((l) => {
    // Basit kontrol: href'in son kısmı ile eşleşme
    const href = l.getAttribute("href");
    if (href && location.pathname.endsWith(href)) {
      l.classList.add("active");
    }
  });
});
//===================== Kaydırma
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Mobil kontrolü
if (window.innerWidth > 1024) {
  // 1024px üstü = masaüstü/tablet
  ScrollSmoother.create({
    smooth: 1,
    effects: true,
    smoothTouch: 0.1,
    speed: 1.5,
  });
} else {
  console.log("Mobilde ScrollSmoother kapalı");
}

//===================== Royal Rise
document.fonts.ready.then(() => {
  let split = new SplitText(".royal-rise", {
    type: "chars",
    charsClass: "char",
  });

  gsap.from(split.chars, {
    opacity: 0,
    yPercent: () => gsap.utils.random(-50, 50),
    rotation: () => gsap.utils.random(-30, 30),
    ease: "back.out(1.7)",
    stagger: 0.1,
    repeat: -1,
    repeatDelay: 5,

    duration: 1,
  });
});

//===================== Dünya

gsap.to(".globe", {
  rotation: 360,
  duration: 10,
  repeat: -1,
  repeatDelay: 0,
  ease: "none",
});

gsap.fromTo(
  [".hero", ".container"],
  { opacity: 0 }, // Başlangıç: görünmez
  {
    opacity: 1, // Fade-in: görünür
    duration: 0.5, // Süre 1.5 saniye
    delay: 0.1, // Sayfa açıldıktan sonra başla
    onComplete: () => {
      // İstersek belirli bir süre sonra fade-out yapabiliriz
      gsap.to(".hero-text", { opacity: 0, duration: 1, delay: 2 });
    },
  }
);

gsap.fromTo(
  ".royal-rise",
  { opacity: 0, y: 50 }, // başlangıç
  { opacity: 1, y: 0, duration: 1.5, delay: 0.5, ease: "power3.out" } // bitiş
);

gsap.fromTo(
  ".lead-title",
  { opacity: 0, y: -50 }, // başlangıç
  { opacity: 1, y: 0, duration: 1.5, delay: 1, ease: "power3.out" } // bitiş
);

gsap.fromTo(
  ".globe-wrap",
  { opacity: 0, x: -100 },
  { opacity: 1, x: 0, duration: 1.5, delay: 1, ease: "power3.out" }
);

gsap.fromTo(
  ".lead",
  { opacity: 0, scale: 0.8 },
  { opacity: 1, scale: 1, duration: 1.5, delay: 1, ease: "back.out(1.7)" }
);

gsap.fromTo(
  [".hero-ctas", ".social-box"],
  { opacity: 0, y: 100 },
  { opacity: 1, y: 0, duration: 1.5, delay: 1.5, ease: "power3.out" }
);

//===================== Feuatured button + images
const buttons = document.querySelectorAll(".service-btn");
const displayedImage = document.getElementById("displayed-image");
const overlayText = document.getElementById("overlay-text");
const overlayDesc = document.getElementById("overlay-desc");
const imageOverlay = document.getElementById("image-overlay");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Aktif sınıfı güncelle
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Önce resmin opaklığını azalt
    displayedImage.style.opacity = 0;
    overlayText.style.opacity = 0;
    overlayDesc.style.opacity = 0;
    imageOverlay.style.opacity = 0;

    // 500ms sonra resmi ve yazıyı değiştir, opaklığı geri getir
    setTimeout(() => {
      displayedImage.src = btn.dataset.img;
      overlayText.textContent = btn.dataset.title;
      overlayDesc.textContent = btn.dataset.desc;

      displayedImage.style.opacity = 1;
      overlayText.style.opacity = 1;
      overlayDesc.style.opacity = 1;
      imageOverlay.style.opacity = 1;
    }, 300); // CSS transition süresine yakın bir değer
  });
});

//)========================== hizmetler animasyon

gsap.registerPlugin(ScrollTrigger);

// Başlık ve açıklama
gsap.from([".service_title", ".services-btn"], {
  scrollTrigger: {
    trigger: ".services-preview",
    start: "top 60%", // bölüm görünürken başla
  },
  y: -50,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

// Resim ve overlay
gsap.from(".service-image", {
  scrollTrigger: {
    trigger: ".services-wrapper",
    start: "top 60%",
  },
  x: -50,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

// Sağdaki butonlar
gsap.fromTo(
  ".buttons .service-btn",
  { x: 50, opacity: 0 },
  {
    x: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".services-wrapper",
      start: "top 60%",
      toggleActions: "play none none none", // animasyonu tetikleyip bırak
    },
  }
);

// Fonksiyon: harf bazlı fade + slide animasyonu
function letterFadeSlide(
  selector,
  triggerSelector,
  yDistance = 20,
  staggerTime = 0.03,
  delayTime = 0
) {
  const element = document.querySelector(selector);
  if (!element) return;

  // Her harfi span içine al
  element.innerHTML = element.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );

  gsap.from(selector + " .letter", {
    scrollTrigger: {
      trigger: triggerSelector,
      start: "top 75%",
    },
    y: yDistance,
    opacity: 0,
    stagger: staggerTime,
    duration: 0.8,
    ease: "power3.out",
    delay: delayTime,
  });
}

letterFadeSlide(".lead", ".lead", 20, 0.03, 0.7);

// service_desc için harf bazlı animasyon
letterFadeSlide(".service_desc", ".services-preview", 20, 0.03, 0);

letterFadeSlide(".achievements_title", ".achievements_title", 20, 0.015, 0);

letterFadeSlide(".services-title", ".services-title", 20, 0.1, 0.25);

letterFadeSlide(".servicess-intro", ".servicess-intro", 20, 0.02, 0.25);

letterFadeSlide(".about-title-section", ".about-title-section", 20, 0.02, 0.25);

letterFadeSlide(".contact-title", ".contact-title", 20, 0.09, 0.01);
contact - intro;
letterFadeSlide(".contact-title", ".contact-title", 20, 0.09, 0.01);

// =========================== yorumlar

// Testimonials ve açıklama animasyonu

gsap.from(".testimonials", {
  opacity: 0,
  y: -50,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".testimonials",
    start: "top 75%", // Kullanıcı testimonials kısmına gelince başlasın
  },
});

gsap.from(".testimonials-title", {
  opacity: 0,
  y: -50,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".testimonials",
    start: "top 75%", // Kullanıcı testimonials kısmına gelince başlasın
  },
});

gsap.from(".testimonials-desc", {
  opacity: 0,
  y: -20,
  duration: 1,
  delay: 0.3,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".testimonials",
    start: "top 70%",
  },
});

// Her bir testimonial kartı için
gsap.from(".testimonial", {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".testimonials-wrapper",
    start: "top 80%",
  },
});

// Sayı animasyonu
gsap.utils.toArray(".number").forEach((num) => {
  let target = parseInt(num.getAttribute("data-target"));
  let plus = num.getAttribute("data-plus") === "true" ? "+" : "";

  gsap.fromTo(
    num,
    { innerText: 0 },
    {
      innerText: target,
      duration: 2,
      snap: { innerText: 1 },
      scrollTrigger: {
        trigger: num,
        start: "top 90%",
      },
      onUpdate: function () {
        num.innerText = num.innerText + plus;
      },
    }
  );
});
// ==================== how we work

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Başlık ve açıklama için timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".how-it-works",
      start: "top 80%",
      // markers: true // test için açabilirsin
    },
  });

  tl.from(".how-it-works .section-title", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  }).from(
    ".how-it-works .section-intro",
    {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    },
    "-=0.4"
  );

  // WhatsApp & Ofis seçenekleri için animasyon
  gsap.from(".work-options", {
    scrollTrigger: {
      trigger: ".work-options", // doğrudan element tetikleniyor
      start: "top 70%", // kullanıcı sectiona geldiğinde başla
      toggleActions: "play none none none", // animasyon bir kez oynar
      // markers: true
    },
    y: 50, // aşağıdan yukarı
    opacity: 0, // başlangıçta görünmez
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".steps", {
    scrollTrigger: {
      trigger: ".work-options", // doğrudan element tetikleniyor
      start: "top 50%", // kullanıcı sectiona geldiğinde başla
      toggleActions: "play none none none", // animasyon bir kez oynar
      // markers: true
    },
    y: 50, // aşağıdan yukarı
    opacity: 0, // başlangıçta görünmez
    duration: 1,
    ease: "power3.out",
  });
});

// ===================== why us

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".why-us .section-title", {
    scrollTrigger: {
      trigger: ".why-us",
      start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  gsap.from(".why-us .section-intro", {
    scrollTrigger: {
      trigger: ".why-us",
      start: "top 75%",
    },
    y: 30,
    opacity: 0,
    delay: 0.2,
    duration: 0.8,
    ease: "power2.out",
  });

  gsap.from(".features", {
    scrollTrigger: {
      trigger: ".why-us", // doğrudan element tetikleniyor
      start: "top 40%", // kullanıcı sectiona geldiğinde başla
      toggleActions: "play none none none", // animasyon bir kez oynar
      // markers: true
    },
    y: 50, // aşağıdan yukarı
    opacity: 0, // başlangıçta görünmez
    duration: 1,
    ease: "power3.out",
  });
});

// =================== hamburger menu

const hamburger = document.querySelector(".hamburger");
const mainNav = document.querySelector(".main-nav");

// Overlay oluştur
let overlay = document.createElement("div");
overlay.classList.add("menu-overlay");
document.body.appendChild(overlay);

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mainNav.classList.toggle("active");
  document.body.classList.toggle("menu-open");
});

// Overlay tıklayınca menüyü kapat
overlay.addEventListener("click", () => {
  hamburger.classList.remove("open");
  mainNav.classList.remove("active");
  document.body.classList.remove("menu-open");
});

// ==================== about html

const elements = gsap.utils.toArray(
  ".about-title, .about-intro, .about-title, .services-list-title, .about-h3, .about-p, .mission-title, .mission-text, .service-details-text, .contact-menu "
);

elements.forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 90%",
      toggleActions: "play none none none",
      scroller: "#smooth-wrapper",
    },
    opacity: 0,
    y: 50, // aşağıdan yukarı
    duration: 1,
    delay: i * 0, // küçük gecikmelerle sıra animasyonu
    ease: "power2.out",
  });
});

gsap.from(".about-image, .services-image", {
  scrollTrigger: {
    trigger: ".services-wrapper",
    start: "top 100%",
  },
  x: 50,
  opacity: 0,
  duration: 2,
  ease: "power3.out",
});

gsap.from(".services-menu", {
  scrollTrigger: {
    trigger: ".services-wrapper",
    start: "top 100%",
  },
  x: -50,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});
// ==================== services html

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.batch(".service-box-link", {
  start: "top 80%", // kutu viewport'un %80'ine geldiğinde
  onEnter: (batch) => {
    gsap.to(batch, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.2, // kutular sırayla gelecek
      ease: "power2.out",
    });
  },
  // istersen onLeaveBack da ekleyebilirsin
  // onLeaveBack: batch => { ... }
});

// Başlangıçta tüm kutular aşağıda ve görünmez olsun
gsap.set(".service-box-link", { y: 50, opacity: 0 });

// ======================== contact

window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Sayfa yüklendikten kısa süre sonra animasyon başlasın
  gsap.to(".contact-content, .contact-info, .contact-form, .contact-intro", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2,
  });
});
// ================= services service html

// GSAP ve ScrollTrigger yüklü olmalı
gsap.registerPlugin(ScrollTrigger);

const menu = document.querySelector(".services-menu");
const layout = document.querySelector(".services-layout");
const footer = document.querySelector(".site-footer");

// Sadece masaüstü cihazlarda çalışsın
if (window.innerWidth > 1024) {
  const menuHeight = menu.offsetHeight;
  const layoutHeight = layout.offsetHeight;
  const footerTop = footer.offsetTop;

  ScrollTrigger.create({
    trigger: layout,
    start: "top top",
    end: () => footerTop - menuHeight, // footer’dan önce duracak
    scrub: 0.5,
    onUpdate: (self) => {
      const maxY = footerTop - layout.offsetTop - menuHeight;
      menu.style.transform = `translateY(${self.progress * maxY}px)`;
    },
  });
} else {
  console.log("Mobilde ScrollTrigger animasyonu devre dışı");
}
