
const PRICE = 3000;
const EVENT_NAME = 'Yoga JJ Plus Saturday Event 1';
const EVENT_LOCATION = 'JJ Plus Fitness';
const EVENT_DATE = '24 Oktober 2026';

const CART_KEY = 'yard_foto_cart';

const photoFiles = [
  'yoga-001.jpg','yoga-002.jpg','yoga-003.jpg','yoga-004.jpg',
  'yoga-005.jpg','yoga-006.jpg','yoga-007.jpg','yoga-008.jpg',
  'yoga-009.jpg','yoga-010.jpg','yoga-011.jpg','yoga-012.jpg',
  'yoga-013.jpg','yoga-014.jpg','yoga-015.jpg','yoga-016.jpg',
  'yoga-017.jpg','yoga-018.jpg','yoga-019.jpg','yoga-020.jpg',
  'yoga-021.jpg','yoga-022.jpg','yoga-023.jpg','yoga-024.jpg',
  'yoga-025.jpg','yoga-026.jpg','yoga-027.jpg','yoga-028.jpg',
  'yoga-029.jpg','yoga-030.jpg','yoga-031.jpg','yoga-032.jpg'
];

const photos = Object.fromEntries(
  photoFiles.map((file, i) => {
    const id = `yoga-${String(i + 1).padStart(3, '0')}`;
    const num = String(i + 1).padStart(3, '0');
    const isGroup = [7,14,15,17,18,23,30,32].includes(i + 1);

    return [id, {
      id,
      num,
      file,
      title: `Foto Yoga ${num}`,
      kind: isGroup ? 'Grup' : 'Potret',
      event: EVENT_NAME
    }];
  })
);

// Memulihkan keranjang dari penyimpanan browser
let savedCart = [];

try {
  savedCart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
} catch (error) {
  savedCart = [];
}

const cart = new Set(
  savedCart.filter(id => photos[id])
);

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

const formatIDR = n =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(n);

$('#year').textContent = new Date().getFullYear();
$('#totalPhotos').textContent = photoFiles.length;

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify([...cart]));
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

function renderGallery() {
  const query = $('#searchInput').value.trim().toLowerCase();
  const filter = $('.filter.active')?.dataset.filter || 'Semua';

  const found = Object.values(photos).filter(p =>
    (filter === 'Semua' || p.kind === filter) &&
    (
      !query ||
      p.num.includes(query) ||
      p.title.toLowerCase().includes(query) ||
      p.event.toLowerCase().includes(query)
    )
  );

  $('#visibleCount').textContent = found.length;

  $('#photoGrid').innerHTML = found.map(p => `
    <article class="photo-card">
      <div class="photo-image">
        <img loading="lazy"
          src="assets/photos/${p.file}"
          alt="Preview ${p.title}">
        <span class="photo-number">YOGA · ${p.num}</span>
        <span class="watermark">YARD FOTO</span>
      </div>

      <div class="photo-meta">
        <div>
          <small>${p.kind.toUpperCase()} · FRAME ${p.num}</small>
          <strong>${p.title}</strong>
        </div>

        <button
          class="add-photo ${cart.has(p.id) ? 'selected' : ''}"
          data-id="${p.id}"
          aria-label="Pilih ${p.title}">
          ${cart.has(p.id) ? '✓' : '＋'}
        </button>
      </div>

      <div class="photo-price">
        ${formatIDR(PRICE)} <span>· per foto</span>
      </div>
    </article>
  `).join('');

  $('#emptyState').hidden = found.length > 0;

  $$('.add-photo').forEach(btn => {
    btn.addEventListener('click', () => togglePhoto(btn.dataset.id));
  });
}

function renderCart() {
  $('#cartCount').textContent = cart.size;
  $('#cartTotal').textContent = formatIDR(cart.size * PRICE);

  const container = $('#cartItems');

  if (!cart.size) {
    container.innerHTML = `
      <div class="cart-empty">
        Belum ada foto yang dipilih.<br>
        Pilih foto dari galeri untuk mulai.
      </div>
    `;
    return;
  }

  container.innerHTML = [...cart].map(id => {
    const p = photos[id];

    return `
      <div class="cart-item">
        <div>
          <strong>${p.title}</strong>
          <small>${EVENT_NAME} · ${formatIDR(PRICE)}</small>
        </div>
        <button class="remove-item" data-remove="${id}">
          Hapus ×
        </button>
      </div>
    `;
  }).join('');

  $$('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      togglePhoto(btn.dataset.remove, false);
    });
  });
}

function togglePhoto(id, shouldAdd) {
  if (!photos[id]) return;

  if (shouldAdd === false || cart.has(id)) {
    cart.delete(id);
    showToast('Foto dihapus dari keranjang');
  } else {
    cart.add(id);
    showToast('Foto ditambahkan ke keranjang');
  }

  saveCart();
  renderGallery();
  renderCart();
}

function openCart() {
  $('#cartOverlay').hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  $('#cartOverlay').hidden = true;
  document.body.style.overflow = '';
}

// Pencarian dan filter
$('#searchInput').addEventListener('input', renderGallery);

$$('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.filter').forEach(b => {
      b.classList.toggle('active', b === btn);
    });

    renderGallery();
  });
});

// Keranjang
$('#openCart').addEventListener('click', openCart);
$('#closeCart').addEventListener('click', closeCart);

$('#cartOverlay').addEventListener('click', event => {
  if (event.target === $('#cartOverlay')) {
    closeCart();
  }
});

// Checkout: wajib login sebelum melanjutkan
$('#checkoutBtn').addEventListener('click', async () => {
  if (!cart.size) {
    showToast('Pilih minimal satu foto terlebih dahulu');
    return;
  }

  saveCart();

  try {
    if (typeof supabaseClient === 'undefined') {
      showToast('Koneksi akun belum tersedia. Coba lagi nanti.');
      return;
    }

    const { data, error } = await supabaseClient.auth.getSession();

    if (error) throw error;

    if (!data.session) {
      window.location.href = './login.html?next=checkout';
      return;
    }

    showToast('Login berhasil. Tahap checkout akan segera disiapkan.');
  } catch (error) {
    console.error(error);
    showToast('Gagal memeriksa login. Coba lagi.');
  }
});

// Render awal
renderGallery();
renderCart();

// Jika kembali dari login, buka keranjang otomatis
const urlParams = new URLSearchParams(window.location.search);

if (urlParams.get('checkout') === '1') {
  openCart();

  // Bersihkan parameter setelah digunakan
  window.history.replaceState(
    {},
    document.title,
    window.location.pathname
  );
}
