# YARD Foto — Event 01 (static preview)

Versi galeri statis untuk GitHub Pages, dengan aset dari folder yang dikirim.

## Data event
- Nama: Yoga JJ Plus Saturday Event 1
- Tanggal: 24 Oktober 2026
- Lokasi: JJ Plus Fitness
- Kategori: Yoga
- Harga per foto: Rp3.000
- Jumlah foto preview: 32

## Isi folder
- `index.html` — halaman utama dan galeri event
- `style.css` — desain responsif
- `script.js` — galeri, pencarian, filter, keranjang simulasi
- `assets/logo/` — logo YARD yang dirender dari PDF menjadi PNG
- `assets/photos/` — preview foto dengan watermark YARD FOTO

## Memasang di repository GitHub Pages
1. Buat cadangan branch/commit repository yang sekarang.
2. Ekstrak ZIP ini di komputer.
3. Unggah isi folder `YARD-foto-event1` langsung ke root repository `ardansyahfardan-spec/YARD-foto` (bukan ZIP-nya). Pastikan `index.html` berada di root.
4. Jika repository masih berisi Next.js, jangan mencampur file/folder Next.js dengan versi statis ini. Simpan backup dahulu, lalu gunakan satu versi yang konsisten.
5. Buka **Settings → Pages**.
6. Pilih **Deploy from a branch**, branch `main`, folder `/(root)`, lalu **Save**.
7. Tunggu deployment selesai.

## Penting: status transaksi
Ini masih frontend statis/demo:
- Keranjang hanya berjalan di browser dan tidak membuat pesanan di server.
- Belum ada database Supabase, email Resend, upload bukti transfer, login admin, verifikasi BCA, atau unduhan foto asli.
- Tombol checkout sengaja tidak mengaktifkan pembayaran. Jangan menerima transfer berdasarkan versi ini.
- Detail rekening BCA belum ditampilkan di halaman publik supaya pelanggan tidak transfer sebelum sistem pesanan siap.
- Foto di `assets/photos/` adalah preview ber-watermark dan berukuran lebih kecil; jangan menaruh foto asli beresolusi penuh di repository publik.

## Tahap integrasi berikutnya
1. Buat project Supabase Free dan tabel untuk event, foto, order, item order, dan bukti pembayaran.
2. Buat autentikasi admin dan fungsi server/Edge Function untuk membuat pesanan, mengunggah bukti transfer secara privat, dan mengubah status menjadi `paid` hanya setelah admin memeriksa mutasi rekening.
3. Sambungkan Resend untuk email pesanan baru dan bukti transfer baru. API key Resend tidak boleh ditaruh di JavaScript publik atau repository.
4. Simpan foto asli dan bukti transfer di storage privat. Unduhan foto asli hanya boleh diberikan setelah pembayaran disetujui.
5. Baru tampilkan instruksi transfer BCA pada checkout yang sudah terhubung dengan pesanan yang tercatat.

## Privasi foto
Pastikan kamu memiliki izin yang diperlukan untuk menampilkan dan menjual foto peserta. Foto bisa memuat orang yang dapat dikenali; gunakan hanya sesuai hak penggunaan dan izin yang berlaku.
