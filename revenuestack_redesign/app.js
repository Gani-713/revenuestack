const q=(s,r=document)=>r.querySelector(s), qa=(s,r=document)=>[...r.querySelectorAll(s)];
const menu=q('.menu-btn'), nav=q('.nav'); if(menu&&nav) menu.addEventListener('click',()=>nav.classList.toggle('open'));
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.12});
qa('.reveal,.stagger').forEach(el=>obs.observe(el));
const counters=qa('[data-counter]'); const cobs=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return; const el=e.target, target=+el.dataset.counter, prefix=el.dataset.prefix||'', suffix=el.dataset.suffix||''; const start=performance.now(), dur=1250; function tick(t){const p=Math.min(1,(t-start)/dur), eased=1-Math.pow(1-p,3), v=Math.floor(target*eased); el.textContent=prefix+v.toLocaleString()+suffix; if(p<1)requestAnimationFrame(tick)} requestAnimationFrame(tick); cobs.unobserve(el)}),{threshold:.5}); counters.forEach(el=>cobs.observe(el));
qa('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{qa('[data-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;qa('[data-case]').forEach(c=>c.classList.toggle('hidden',f!=='All'&&c.dataset.case!==f));}));

// Contact form: phone number accepts digits only.
const phoneField = q('#phone');
if (phoneField) {
  const sanitizePhone = () => {
    phoneField.value = phoneField.value.replace(/\D/g, '').slice(0, 15);
  };
  phoneField.addEventListener('input', sanitizePhone);
  phoneField.addEventListener('paste', () => setTimeout(sanitizePhone, 0));
}
