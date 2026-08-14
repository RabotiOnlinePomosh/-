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

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const data=new FormData(form);
  const name=data.get('name');
  const tg=data.get('telegram');
  const s=data.get('service');
  success.classList.add('show');
  form.style.display='none';
  document.getElementById('successText').textContent =
    `${name}, заявка на «${s}» заполнена. В этой демо-версии данные никуда не отправляются. Подключите форму по инструкции в README.md, чтобы заявки и файлы приходили вам.`;
});
