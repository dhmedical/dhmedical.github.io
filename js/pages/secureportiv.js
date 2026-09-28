/* Skrypty strony secureportiv.html; zachowana kolejność wykonywania */
(function(){const header=document.querySelector('.site-header');if(!header)return;const update=()=>header.classList.toggle('is-scrolled',window.scrollY>28);window.addEventListener('scroll',update,{passive:true});update()})();
