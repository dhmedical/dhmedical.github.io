/* DH Medical — pojedynczy kontroler menu na wszystkich podstronach. */
(()=>{'use strict';
 const button=document.querySelector('.site-header .mobile-toggle');
 const menu=document.querySelector('.site-header .nav-links');
 if(!button||!menu)return;
 function setOpen(open){menu.classList.toggle('open',open);button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Zamknij menu':'Otwórz menu');button.innerHTML=open?'<i class="bi bi-x-lg" aria-hidden="true"></i>':'<i class="bi bi-list" aria-hidden="true"></i>';}
 button.addEventListener('click',()=>setOpen(!menu.classList.contains('open')));
 menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setOpen(false)));
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.classList.contains('open')){setOpen(false);button.focus();}});
 document.addEventListener('click',event=>{if(menu.classList.contains('open')&&!event.target.closest('.site-header'))setOpen(false)});
 window.addEventListener('resize',()=>{if(window.innerWidth>700&&menu.classList.contains('open'))setOpen(false)});
 setOpen(false);
})();
