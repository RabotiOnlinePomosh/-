const modal = document.getElementById('modal');
const service = document.getElementById('service');
const selectedService = document.getElementById('selectedService');
const selectedPrice = document.getElementById('selectedPrice');
const form = document.getElementById('requestForm');
const success = document.getElementById('success');

document.querySelectorAll('.order').forEach(btn => {
  btn.addEventListener('click', function () {
    const s = btn.dataset.service || 'Другая работа';
    const p = btn.dataset.price || 'по запросу';

    service.value = s;
    selectedService.textContent = s;
    selectedPrice.textContent = p;

    form.style.display = 'grid';
    success.classList.remove('show');

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.getElementById('close').addEventListener('click', closeModal);
document.getElementById('closeSuccess').addEventListener('click', closeModal);
document.querySelector('.modal-backdrop').addEventListener('click', closeModal);

document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.filter').forEach(x => {
      x.classList.remove('active');
    });

    btn.classList.add('active');

    const f = btn.dataset.filter;

    document.querySelectorAll('.product').forEach(card => {
      card.style.display =
        (f === 'all' || card.dataset.category === f)
          ? 'flex'
          : 'none';
    });
  });
});

form.addEventListener('submit', async function () {
  const button = form.querySelector('button[type="submit"]');

  button.disabled = true
  button.textContent = 'Отправляем...';
});
 
