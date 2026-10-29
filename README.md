# Lensa Arena — Starter Website Foto Olahraga

Starter awal Next.js untuk website galeri dan penjualan foto olahraga dengan alur pembayaran manual transfer BCA dan notifikasi email admin.

## Yang sudah tersedia

- Landing page responsif dengan gaya visual pink lembut.
- Halaman pencarian galeri (UI awal).
- Halaman instruksi pembayaran BCA (data contoh dari environment variables).
- Halaman dashboard admin contoh.
- Halaman cara kerja.
- Helper notifikasi email menggunakan Resend.
- Skema awal database Supabase.

## Belum aktif / belum production-ready

Ini adalah **starter UI dan fondasi**, bukan website transaksi siap produksi. Form pesanan, upload bukti, galeri foto dari database, login admin, pencarian wajah, email trigger, serta konfirmasi pembayaran belum terhubung secara penuh. Halaman admin sengaja diberi peringatan karena belum ada login. Jangan menerima pembayaran sungguhan sampai fitur keamanan backend selesai.

## Prasyarat

- Node.js 20.9+ (disarankan versi LTS yang masih didukung)
- Akun Supabase
- Akun Resend dan domain pengirim email yang terverifikasi untuk produksi
- Akun hosting yang mendukung Next.js (misalnya Vercel)

## Menjalankan lokal

```bash
npm install
cp .env.example .env.local
npm run dev
```

Buka `http://localhost:3000`.

Isi `.env.local` dengan kredensial project milik sendiri. Jangan pernah commit file `.env.local` ke GitHub.

## Setup Supabase

1. Buat project Supabase.
2. Buka SQL Editor dan jalankan `supabase/schema.sql`.
3. Buat storage bucket `photo-previews`, `photo-originals`, dan `payment-proofs`.
4. Pastikan `photo-originals` dan `payment-proofs` private.
5. Terapkan Row Level Security dan kebijakan server/admin sebelum memasukkan data asli.

## Setup email Resend

1. Buat akun Resend dan verifikasi domain pengirim.
2. Tambahkan `RESEND_API_KEY`, `ADMIN_EMAIL`, dan `EMAIL_FROM` ke environment hosting.
3. Gunakan `notifyAdmin()` dari server-side handler setelah pesanan dibuat atau bukti transfer diunggah.
4. Jangan panggil Resend dari client/browser dan jangan menaruh API key di variabel `NEXT_PUBLIC_`.

## Pembayaran BCA

Isi `NEXT_PUBLIC_BANK_ACCOUNT_NAME` dan `NEXT_PUBLIC_BANK_ACCOUNT_NUMBER` dengan data rekening yang benar. Nomor rekening memang ditampilkan kepada pelanggan. Jangan menandai order lunas hanya karena gambar bukti transfer diunggah. Admin harus memeriksa mutasi BCA lalu melakukan persetujuan melalui endpoint server yang memverifikasi sesi admin.

## Catatan pencarian wajah

Pencarian wajah belum diimplementasikan. Sebelum mengaktifkannya, tentukan penyedia pencocokan wajah, aturan persetujuan yang jelas, pembatasan retensi foto selfie/biometrik, dan mekanisme penghapusan data. Alternatif MVP adalah pencarian berdasarkan acara, tanggal, nomor peserta, atau kode foto terlebih dahulu.

## Deploy dan GitHub

Push folder ini ke repository GitHub milikmu, lalu impor repository ke hosting Next.js. Tambahkan environment variables di pengaturan hosting; jangan menyimpan secret di repository.
