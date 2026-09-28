/* Skrypty strony index.html; zachowana kolejność wykonywania */

document.querySelectorAll('.offer-card, .flex-card, .port-card').forEach(card => {
  card.style.position = "relative";
  card.style.overflow = "hidden";
  card.style.cursor = "pointer";

  card.addEventListener('click', function(e) {
    if (e.target.closest('a')) return;

    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
    ripple.style.top = (e.clientY - rect.top - size / 2) + "px";

    card.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);

    const link = card.querySelector('a');
    if (link) window.location = link.href;
  });
});

;

const observer = ("IntersectionObserver" in window) ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}) : null;

document.querySelectorAll('.offer-card, .flex-card, .port-card').forEach(el => {
  el.classList.add('fade-in');
  if(observer) observer.observe(el); else el.classList.add("visible");
});

;

/* Karuzela uruchamiana niezależnie od pozostałych skryptów strony. */
(function(){
  const root=document.querySelector('.dhv-section');
  if(!root)return;
  const slides=[...root.querySelectorAll('.dhv-item')];
  const dots=[...root.querySelectorAll('.dhv-dots button')];
  const stage=root.querySelector('.dhv-stage');
  let current=0, inView=false, touchStart=null;
  function stopAll(){slides.forEach(slide=>{const v=slide.querySelector('video');v.pause();v.muted=true;const b=slide.querySelector('.dhv-sound');b.innerHTML='<i class="bi bi-volume-mute"></i>';b.setAttribute('aria-label','Włącz dźwięk')})}
  function render(){
    stopAll();
    slides.forEach((slide,i)=>{
      slide.classList.remove('dhv-active','dhv-prev','dhv-next');
      if(i===current)slide.classList.add('dhv-active');
      else if(i===(current-1+slides.length)%slides.length)slide.classList.add('dhv-prev');
      else if(i===(current+1)%slides.length)slide.classList.add('dhv-next');
      slide.setAttribute('aria-current',i===current?'true':'false');
    });
    dots.forEach((dot,i)=>{dot.classList.toggle('dhv-selected',i===current);dot.setAttribute('aria-current',i===current?'true':'false')});
    if(inView)slides[current].querySelector('video').play().catch(()=>{});
  }
  function goTo(i){current=(i+slides.length)%slides.length;render()}
  root.querySelector('.dhv-arrow.dhv-prev').addEventListener('click',()=>goTo(current-1));
  root.querySelector('.dhv-arrow.dhv-next').addEventListener('click',()=>goTo(current+1));
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>goTo(i)));
  slides.forEach((slide,i)=>{
    const video=slide.querySelector('video'),sound=slide.querySelector('.dhv-sound');
    slide.addEventListener('click',e=>{
      if(e.target.closest('.dhv-sound'))return;
      if(i!==current){goTo(i);return}
      if(video.paused)video.play().catch(()=>{});else video.pause();
    });
    sound.addEventListener('click',e=>{
      e.stopPropagation();video.muted=!video.muted;
      sound.innerHTML=video.muted?'<i class="bi bi-volume-mute"></i>':'<i class="bi bi-volume-up"></i>';
      sound.setAttribute('aria-label',video.muted?'Włącz dźwięk':'Wycisz');
      if(video.paused)video.play().catch(()=>{});
    });
  });
  stage.addEventListener('touchstart',e=>{touchStart=e.touches[0].clientX},{passive:true});
  stage.addEventListener('touchend',e=>{if(touchStart===null)return;const dx=e.changedTouches[0].clientX-touchStart;touchStart=null;if(Math.abs(dx)>45)goTo(current+(dx<0?1:-1))},{passive:true});
  if('IntersectionObserver'in window){
    const io=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(inView)slides[current].querySelector('video').play().catch(()=>{});else stopAll()},{threshold:.3});io.observe(root);
  }else{inView=true}
  render();
})();

;

/* Delikatne animacje i nagłówek po przewinięciu; bez dodatkowych bibliotek. */
(function(){
  const header=document.querySelector('.site-header');
  const updateHeader=()=>header&&header.classList.toggle('is-scrolled',window.scrollY>28);
  window.addEventListener('scroll',updateHeader,{passive:true});updateHeader();
  if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const targets=document.querySelectorAll('.section-header,.hero h1,.hero-lead,.hero-actions,.hero-proof,.hero-panel,.trust-item,.audience-card,.partner-logo,.cta-box');
  targets.forEach((el,i)=>{el.classList.add('reveal');if(el.classList.contains('audience-card')||el.classList.contains('partner-logo'))el.classList.add('reveal-delay-'+(i%4));});
  document.documentElement.classList.add('js-motion');
  const io=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target);}})},{threshold:.08,rootMargin:'0px 0px 35px 0px'});
  targets.forEach(el=>io.observe(el));
})();

