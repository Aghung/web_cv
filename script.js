// 1. Typing Effect untuk Nama
const textElement = document.getElementById('typing-text');
const nameText = "SYAHPUTRA AGUNG"; // Ganti dengan nama Anda
let index = 0;

function typeWriter() {
    if (index < nameText.length) {
        textElement.innerHTML += nameText.charAt(index);
        index++;
        setTimeout(typeWriter, 100); // Kecepatan mengetik
    } else {
        // Efek kursor berkedip setelah selesai mengetik
        textElement.style.borderRight = "none";
    }
}

// 2. Scroll Reveal Animation
const observerOptions = {
    threshold: 0.2 // Elemen muncul saat 20% terlihat
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.hidden').forEach((el) => {
    observer.observe(el);
});

// Jalankan saat load
window.onload = () => {
    // Tambahkan kursor berkedip css sementara
    textElement.style.borderRight = "2px solid #ff003c";
    typeWriter();
};

document.addEventListener('DOMContentLoaded', function () {
  // -- WhatsApp handlers (jika sudah ada) --
  const waBtn = document.getElementById('wa-btn');
  const waModal = document.getElementById('contact-modal-wa');
  const waClose = document.getElementById('contact-close-wa');
  const waSend = document.getElementById('wa-send');

  function openModal(modal) {
    modal.classList.add('visible');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(modal) {
    modal.classList.remove('visible');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (waBtn) waBtn.addEventListener('click', function(e){ e.preventDefault(); openModal(waModal); });
  if (waClose) waClose.addEventListener('click', function(){ closeModal(waModal); });
  if (waModal) waModal.addEventListener('click', function (e) { if (e.target === waModal) closeModal(waModal); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') {
    if (waModal && waModal.classList.contains('visible')) closeModal(waModal);
    if (document.getElementById('contact-modal-ig')?.classList.contains('visible')) closeModal(document.getElementById('contact-modal-ig'));
  } });

  if (waSend) {
    waSend.addEventListener('click', function () {
      const rawTarget = document.getElementById('wa-target').textContent || '';
      const targetNumber = rawTarget.replace(/\D+/g, '').replace(/^0+/, '');
      const name = document.getElementById('wa-input-name').value.trim();
      const message = document.getElementById('wa-input-message').value.trim();
      if (!name || !message) { alert('ett ya di isi dulu cuY'); return; }
      const text = `Halo, saya ${name}%0A%0A${encodeURIComponent(message)}`;
      const waUrl = `https://wa.me/${encodeURIComponent(targetNumber)}?text=${text}`;
      window.open(waUrl, '_blank');
      closeModal(waModal);
      document.getElementById('wa-input-name').value = '';
      document.getElementById('wa-input-message').value = '';
    });
  }

  // -- Instagram handlers baru --
  const igBtn = document.getElementById('ig-btn');
  const igModal = document.getElementById('contact-modal-ig');
  const igClose = document.getElementById('contact-close-ig');
  const igSend = document.getElementById('ig-send');

  if (igBtn) igBtn.addEventListener('click', function(e){ e.preventDefault(); openModal(igModal); });
  if (igClose) igClose.addEventListener('click', function(){ closeModal(igModal); });
  if (igModal) igModal.addEventListener('click', function (e) { if (e.target === igModal) closeModal(igModal); });

  if (igSend) {
    igSend.addEventListener('click', async function () {
      const rawTarget = document.getElementById('ig-target').textContent || '';
      // ambil username tanpa '@' dan tanpa spasi
      const username = rawTarget.replace(/@/g, '').trim();
      const name = document.getElementById('ig-input-name').value.trim();
      const message = document.getElementById('ig-input-message').value.trim();
      if (!name || !message) { alert('ett ya di isi dulu cuy'); return; }

      const fullMessage = `Halo, saya ${name}\n\n${message}`;
      // salin ke clipboard (modern API)
      try {
        await navigator.clipboard.writeText(fullMessage);
      } catch (err) {
        // fallback: buat textarea temporer
        const ta = document.createElement('textarea');
        ta.value = fullMessage;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch(e) {}
        document.body.removeChild(ta);
      }

      // coba buka aplikasi Instagram (mobile) dahulu, lalu web profile
      const appUrl = `instagram://user?username=${encodeURIComponent(username)}`;
      const webUrl = `https://instagram.com/${encodeURIComponent(username)}`;

      // buka tab web profile — jika di mobile Instagram app mungkin menangani intent
      window.open(webUrl, '_blank');

      alert('Pesan telah disalin ke clipboard. Buka DM di Instagram dan paste pesan untuk mengirim.');

      closeModal(igModal);
      document.getElementById('ig-input-name').value = '';
      document.getElementById('ig-input-message').value = '';
    });
  }
});