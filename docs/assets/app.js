(function(){
  const cfg = window.SOMIIL_CONFIG || {};
  const $ = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => Array.from(c.querySelectorAll(s));

  const menuBtn = $('[data-menu]');
  if(menuBtn){
    menuBtn.addEventListener('click',()=>{ const open=document.body.classList.toggle('menu-open'); menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false'); });
    $$('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('menu-open')));
  }

  $$('.faq button').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const item = btn.closest('.faq');
      const content = $('.faq-content', item);
      const open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true':'false');
      content.style.maxHeight = open ? content.scrollHeight+'px' : '0';
    });
  });

  const waText = encodeURIComponent("Hi Somiil, I'm in Australia and I have a question about a MahaVastu consultation.");
  $$('[data-whatsapp]').forEach(a=>{
    a.href = `https://wa.me/${cfg.whatsapp || '918081922432'}?text=${waText}`;
    a.target = '_blank';
    a.rel = 'noopener';
  });

  $$('[data-book]').forEach(a=>{
    const page = a.getAttribute('data-book') || '/book/';
    if(a.tagName === 'A' && !a.getAttribute('href')) a.href = page;
  });

  // Booking form demo + graceful live fallback to WhatsApp until scheduler/Stripe URLs are connected.
  const bookingForm = $('[data-booking-form]');
  if(bookingForm){
    let selectedSlot = '';
    $$('.slot').forEach(slot=>slot.addEventListener('click',()=>{
      $$('.slot').forEach(s=>s.classList.remove('selected'));
      slot.classList.add('selected');
      selectedSlot = slot.dataset.slot;
      const hidden = $('[name="preferred_slot"]', bookingForm);
      if(hidden) hidden.value = selectedSlot;
    }));
    bookingForm.addEventListener('submit',e=>{
      e.preventDefault();
      const data = new FormData(bookingForm);
      if(!data.get('name') || !data.get('email') || !data.get('mobile') || !data.get('property_type') || !data.get('concern')){
        alert('Please complete the required details first.'); return;
      }
      if(cfg.bookingUrl){
        window.location.href = cfg.bookingUrl; return;
      }
      const message = `Hi Somiil, I'd like to book the A$249 MahaVastu Diagnostic.\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nMobile: ${data.get('mobile')}\nProperty: ${data.get('property_type')}\nConcern: ${data.get('concern')}\nPreferred slot: ${selectedSlot || 'Please send availability'}`;
      const url = `https://wa.me/${cfg.whatsapp || '918081922432'}?text=${encodeURIComponent(message)}`;
      window.open(url,'_blank');
      const success = $('.success-card');
      if(success){ success.style.display='block'; success.scrollIntoView({behavior:'smooth',block:'nearest'}); }
    });
  }

  $$('[data-lead-form]').forEach(form=>form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    const msg = `Hi Somiil, please send me the Business Space Audit.\nName: ${data.get('name')||''}\nEmail: ${data.get('email')||''}\nInterest: ${data.get('segment')||''}`;
    window.open(`https://wa.me/${cfg.whatsapp || '918081922432'}?text=${encodeURIComponent(msg)}`,'_blank');
    const success = $('.success-card', form.parentElement);
    if(success) success.style.display='block';
  }));

  const scopeForm = $('[data-scope-form]');
  if(scopeForm){
    scopeForm.addEventListener('submit',e=>{
      e.preventDefault();
      const d = new FormData(scopeForm);
      const msg = `Hi Somiil, I'd like a Factory/Warehouse/Development Scope Assessment.\nName: ${d.get('name')}\nCompany: ${d.get('company')}\nSite type: ${d.get('site_type')}\nApprox area: ${d.get('area')} m²\nState: ${d.get('state')}\nConcern: ${d.get('concern')}`;
      window.open(`https://wa.me/${cfg.whatsapp || '918081922432'}?text=${encodeURIComponent(msg)}`,'_blank');
      const success = $('.success-card'); if(success){success.style.display='block'; success.scrollIntoView({behavior:'smooth'});}
    });
  }

  // Book-page fallback offer: one appearance per visitor, desktop exit-intent only.
  const exitOffer = $('[data-exit-offer]');
  if(exitOffer && window.innerWidth > 900 && !localStorage.getItem('somiil_discovery_seen')){
    let bookingIntent = false;
    $$('[data-booking-form] input, [data-booking-form] select, [data-booking-form] textarea, [data-booking-form] .slot').forEach(el=>{
      el.addEventListener('focus',()=>bookingIntent=true);
      el.addEventListener('click',()=>bookingIntent=true);
    });
    document.addEventListener('mouseout',e=>{
      if(bookingIntent && e.clientY <= 0 && !localStorage.getItem('somiil_discovery_seen')){
        exitOffer.hidden = false;
        localStorage.setItem('somiil_discovery_seen','1');
      }
    });
    $('[data-close-exit]')?.addEventListener('click',()=>exitOffer.hidden=true);
  }
})();
