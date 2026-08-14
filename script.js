const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/library/d/1sptE3h8fa_ytSMYOjXrmF9co0Y0714XzoESEeTzbGV49ZNPY_btgyjbt/1';
const modal=document.getElementById('modal');
const service=document.getElementById('service');
const selectedService=document.getElementById('selectedService');
const selectedPrice=document.getElementById('selectedPrice');
const form=document.getElementById('requestForm');
const success=document.getElementById('success');

document.querySelectorAll('.order').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const s=btn.dataset.service||'Другая работа';
    const p=btn.dataset.price||'по запросу';
    service.value=s; selectedService.textContent=s; selectedPrice.textContent=p;
    form.style.display='grid'; success.classList.remove('show');
    modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  });
});

function closeModal(){
  modal.classList.remove('open'); modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
document.getElementById('close').onclick=closeModal;
document.getElementById('closeSuccess').onclick=closeModal;
document.querySelector('.modal-backdrop').onclick=closeModal;

document.querySelectorAll('.filter').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    document.querySelectorAll('.product').forEach(card=>{
      card.style.display=(f==='all'||card.dataset.category===f)?'flex':'none';
    });
  });
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const payload = {
    service: data.get('service'),
    price: selectedPrice.textContent,
    name: data.get('name'),
    group: data.get('group'),
    contact: data.get('telegram'),
    topic: data.get('topic'),
    deadline: data.get('deadline'),
    comment: data.get('comment')
  };

  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = 'Отправляем...';

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(payload)
    });

    form.style.display = 'none';
    success.classList.add('show');

    document.getElementById('successText').textContent =
      `${payload.name}, заявка отправлена! Мы получили ваши данные и свяжемся с вами.`;

  } catch (error) {
    console.error(error);
    alert('Не удалось отправить заявку. Попробуйте ещё раз.');

    button.disabled = false;
    button.innerHTML = 'Отправить заявку <span>→</span>';
  }
});
