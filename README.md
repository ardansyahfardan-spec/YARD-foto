# YARD Foto — Static Starter (GitHub Pages)

Website statis HTML/CSS/JavaScript yang bisa dipublikasikan di GitHub Pages tanpa hosting berbayar. Tidak perlu Node.js, build command, atau framework.

## Isi
- `index.html` — halaman utama, contoh event, galeri, keranjang, dan checkout demo.
- `style.css` — tampilan responsif.
- `script.js` — pencarian, filter kategori, keranjang, dan simulasi checkout di browser.

## Cara pasang ke repository `YARD-foto`
1. Download ZIP dan ekstrak di komputer.
2. Buka repository GitHub `ardansyahfardan-spec/YARD-foto`.
3. Unggah `index.html`, `style.css`, `script.js`, dan `README.md` langsung ke root repository (halaman utama repository), bukan mengunggah ZIP-nya saja.
4. Jika repository berisi versi Next.js sebelumnya, simpan salinan/branch cadangan dahulu. Jangan campur file ini dengan file `app/` dan konfigurasi Next.js; gunakan satu versi saja untuk GitHub Pages.
5. Buka **Settings → Pages**.
6. Di **Build and deployment**, pilih **Deploy from a branch**; Branch `main`, folder `/(root)`, lalu **Save**.
7. Tunggu workflow selesai. Alamat biasanya `https://ardansyahfardan-spec.github.io/YARD-foto/`.

## Batas versi ini
Ini hanya frontend demo. Tidak menyimpan pesanan ke server, tidak mengirim email, tidak memverifikasi transfer, dan tidak mengamankan file foto berbayar. Jangan masukkan rekening asli atau menerima pembayaran berdasarkan demo ini.

Untuk versi produksi gratis, sambungkan frontend ke backend yang sesuai, misalnya Supabase Free dan fungsi server/Edge Function untuk memverifikasi admin serta mengirim email melalui Resend. API key rahasia tidak boleh diletakkan di `script.js` atau repository publik. Foto asli harus disimpan secara privat dan hanya diberikan setelah admin mengonfirmasi uang masuk.

## Kustomisasi
- Ubah nama/brand di `index.html`.
- Harga demo di `script.js`, pada konstanta `PRICE`.
- Contoh acara/foto ada di `index.html`. Ganti gradien placeholder dengan foto milik sendiri sebelum diluncurkan.
