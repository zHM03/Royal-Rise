// Basit interaktivite: tarih, form submit ve aktif nav link
document.addEventListener('DOMContentLoaded',()=>{
  const y = new Date().getFullYear();
  ['year','year2','year3','year4'].forEach(id=>{const el=document.getElementById(id); if(el) el.textContent = y});

  const links = document.querySelectorAll('.main-nav .nav-link');
  links.forEach(l=>{
    // Basit kontrol: href'in son kısmı ile eşleşme
    const href = l.getAttribute('href');
    if(href && location.pathname.endsWith(href)){
      l.classList.add('active');
    }
  });
});
//===================== Kaydırma 
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
  smooth: 1,
  effects: true,
  smoothTouch: 0.1,
  speed: 1.5,
});

//===================== Royal Rise
document.fonts.ready.then(() => {
  let split = new SplitText(".royal-rise", {
    type: "chars",
    charsClass: "char"
  });

  gsap.from(split.chars, {
    opacity: 0,
    yPercent: () => gsap.utils.random(-50, 50),
    rotation: () => gsap.utils.random(-30, 30),
    ease: "back.out(1.7)",
    stagger: 0.1,
    repeat: -1,
    repeatDelay: 5,

    duration:1
  });
});

//===================== Dünya

gsap.to(".globe", { 
  rotation: 360,
  duration: 10,
  repeat: -1,
  repeatDelay: 0,
  ease: 'none'
});  

//===================== İndex-Hizmet
const buttons = document.querySelectorAll('.service-btn');
const displayedImage = document.getElementById('displayed-image');
const overlayText = document.getElementById('overlay-text');
const overlayDesc = document.getElementById('overlay-desc');
const imageOverlay = document.getElementById('image-overlay');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Aktif sınıfı güncelle
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

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

