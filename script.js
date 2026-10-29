const PRICE = 10000;
const photos = {
  p1: { title: 'Finish line energy', category: 'Lari', event: 'City Run Festival' },
  p2: { title: 'One step closer', category: 'Lari', event: 'City Run Festival' },
  p3: { title: 'Find your pace', category: 'Sepeda', event: 'Ride Together' },
  p4: { title: 'Into the wild', category: 'Outdoor', event: 'Weekend Challenge' },
  p5: { title: 'Run with friends', category: 'Lari', event: 'City Run Festival' },
  p6: { title: 'Chasing the sunrise', category: 'Sepeda', event: 'Ride Together' }
};
const cart = new Set();
let activeFilter = 'Semua';
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const formatIDR = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
$('#year').textContent = new Date().getFullYear();

function showToast(message) {
  const toast = $('#toast'); toast.textContent = message; toast.classList.add('show');
  clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('show'), 2300);
}
function renderCart() {
  $('#cartCount').textContent = cart.size;
  $('#cartTotal').textContent = formatIDR(cart.size * PRICE);
  $('#checkoutTotal').textContent = formatIDR(cart.size * PRICE);
  const container = $('#cartItems');
  if (!cart.size) { container.innerHTML = '<div class="cart-empty">Keranjangmu masih kosong.<br>Pilih foto dari galeri untuk mulai.</div>'; return; }
  container.innerHTML = [...cart].map(id => `<div class="cart-item"><div><strong>${photos[id].title}</strong><small>${photos[id].event} · ${formatIDR(PRICE)}</small></div><button class="remove-item" data-remove="${id}">Hapus ×</button></div>`).join('');
  $$('[data-remove]').forEach(btn => btn.addEventListener('click', () => togglePhoto(btn.dataset.remove, false)));
}
function togglePhoto(id, shouldAdd) {
  if (shouldAdd && !cart.has(id)) { cart.add(id); showToast('Foto ditambahkan ke keranjang'); }
  else if (!shouldAdd && cart.has(id)) { cart.delete(id); showToast('Foto dihapus dari keranjang'); }
  else if (cart.has(id)) { cart.delete(id); showToast('Foto dihapus dari keranjang'); }
  else { cart.add(id); showToast('Foto ditambahkan ke keranjang'); }
  $$('[data-id]').forEach(btn => { const selected = cart.has(btn.dataset.id); btn.classList.toggle('selected', selected); btn.textContent = selected ? '✓' : '＋'; });
  renderCart();
}
$$('.add-photo').forEach(btn => btn.addEventListener('click', () => togglePhoto(btn.dataset.id)));
$('#openCart').addEventListener('click', () => { $('#cartOverlay').hidden = false; document.body.style.overflow = 'hidden'; });
function closeCart() { $('#cartOverlay').hidden = true; document.body.style.overflow = ''; }
$('#closeCart').addEventListener('click', closeCart);
$('#cartOverlay').addEventListener('click', e => { if (e.target === $('#cartOverlay')) closeCart(); });
$('#checkoutBtn').addEventListener('click', () => {
  if (!cart.size) { showToast('Pilih minimal satu foto terlebih dahulu'); return; }
  closeCart(); $('#checkoutOverlay').hidden = false; document.body.style.overflow = 'hidden'; $('#checkoutResult').hidden = true;
});
function closeCheckout() { $('#checkoutOverlay').hidden = true; document.body.style.overflow = ''; }
$('#closeCheckout').addEventListener('click', closeCheckout);
$('#checkoutOverlay').addEventListener('click', e => { if (e.target === $('#checkoutOverlay')) closeCheckout(); });
$('#checkoutForm').addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const order = 'DEMO-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  const result = $('#checkoutResult');
  result.innerHTML = `<strong>Ringkasan demo berhasil dibuat: ${order}</strong><br>Nama: ${escapeHTML(data.get('name'))}<br>Email: ${escapeHTML(data.get('email'))}<br>Foto dipilih: ${cart.size}<br>Total: <strong>${formatIDR(cart.size * PRICE)}</strong><br><br>Ini hanya simulasi di browser. Pesanan belum tersimpan, email belum dikirim, dan belum ada pembayaran yang dibuat.`;
  result.hidden = false;
});
function escapeHTML(value) { return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char])); }
function filterPhotos() {
  const query = $('#searchInput').value.trim().toLowerCase(); let count = 0;
  $$('.photo-card').forEach(card => {
    const matchesFilter = activeFilter === 'Semua' || card.dataset.category === activeFilter;
    const matchesQuery = (card.dataset.search + ' ' + card.querySelector('strong').textContent).toLowerCase().includes(query);
    const show = matchesFilter && matchesQuery; card.hidden = !show; if (show) count++;
  });
  $('#visibleCount').textContent = count; $('#emptyState').hidden = count > 0;
}
$('#searchInput').addEventListener('input', filterPhotos);
$$('.filter').forEach(btn => btn.addEventListener('click', () => {
  activeFilter = btn.dataset.filter; $$('.filter').forEach(b => b.classList.toggle('active', b === btn)); filterPhotos();
}));
$$('.event-card').forEach(btn => btn.addEventListener('click', () => {
  activeFilter = btn.dataset.category; $$('.filter').forEach(b => b.classList.toggle('active', b.dataset.filter === activeFilter)); filterPhotos(); $('#galeri').scrollIntoView({ behavior: 'smooth' });
}));
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeCart(); closeCheckout(); } });
renderCart();
