import Link from 'next/link';
import { ArrowRight, Camera, CalendarDays, Images, Search, ShieldCheck, Sparkles } from 'lucide-react';

const events = [
  { name: 'Fun Run Weekend', date: '12 Oktober 2026', location: 'Surabaya', count: '1.248 foto', cls: 'cover-a', icon: '🏃' },
  { name: 'Cycling City Ride', date: '18 Oktober 2026', location: 'Sidoarjo', count: '862 foto', cls: 'cover-b', icon: '🚴' },
  { name: 'Turnamen Futsal', date: '25 Oktober 2026', location: 'Surabaya', count: '540 foto', cls: 'cover-c', icon: '⚽' },
];

export default function Home() {
  return <main><div className="shell">
    <nav className="nav"><Link href="/" className="brand"><span className="brand-mark"><Camera size={21}/></span>Lensa Arena</Link><div className="nav-links"><Link href="#acara">Jelajahi Acara</Link><Link href="/cara-kerja">Cara Kerja</Link><Link href="/admin" className="nav-cta">Admin <ArrowRight size={15}/></Link></div></nav>
    <section className="hero"><div><span className="eyebrow"><Sparkles size={14}/> MOMENMU, TERTANGKAP</span><h1>Temukan momen.<br/><span>Abadikan ceritamu.</span></h1><p>Foto terbaikmu di setiap garis finis, pertandingan, dan tantangan. Cari foto acara olahraga, pilih yang kamu suka, lalu unduh kualitas aslinya.</p><div className="hero-actions"><Link className="button" href="/galeri">Cari Foto Saya <Search size={17}/></Link><Link className="button secondary" href="#acara">Lihat Acara <ArrowRight size={16}/></Link></div><div className="hero-note"><ShieldCheck size={16} color="var(--green)"/><span><strong>Pembayaran terverifikasi</strong> · Foto asli tersedia setelah disetujui admin</span></div></div>
      <div className="photo-collage"><div className="collage-top"><span>YOUR SPORTS MOMENTS</span><span>✦ 2026</span></div><div className="photo-card one"><div className="mock-photo mock-run">🏃🏻</div><small>FINISH LINE · 01</small></div><div className="photo-card two"><div className="mock-photo mock-bike">🚴🏻</div><small>RIDE DAY · 02</small></div><div className="photo-card three"><div className="mock-photo mock-finish">🏅</div><small>YOUR BEST MOMENT · 03</small></div><div className="floating-tag"><b>📸 Momen spesialmu</b><span className="muted">Tersimpan selamanya</span></div></div>
    </section>
    <section className="search-strip"><div className="search-ico"><span className="round"><Images size={23} color="var(--pink-dark)"/></span><div><h3>Belum menemukan fotomu?</h3><p>Pilih acara terlebih dahulu. Pencarian wajah akan ditambahkan setelah integrasi fitur siap.</p></div></div><Link className="button" href="/galeri">Mulai Cari <ArrowRight size={16}/></Link></section>
    <section className="section" id="acara"><div className="section-head"><div><span className="eyebrow"><CalendarDays size={14}/> GALERI PILIHAN</span><h2>Acara olahraga</h2><p>Jelajahi galeri dan temukan momen terbaikmu.</p></div><Link href="/galeri" className="text-link">Lihat semua acara →</Link></div><div className="event-grid">{events.map((event) => <article className="event-card" key={event.name}><div className={`event-cover ${event.cls}`}><div className="cover-icon">{event.icon}</div><span>GALERI ACARA</span></div><div className="event-info"><h3>{event.name}</h3><div className="event-meta"><span>{event.date}</span><span>{event.location}</span></div><div className="event-bottom"><span>{event.count}</span><strong>Jelajahi →</strong></div></div></article>)}</div><p className="muted small" style={{marginTop:14}}>Acara di atas adalah data contoh untuk pratinjau. Ganti dengan acara dan foto asli dari dashboard setelah backend disiapkan.</p></section>
    <footer className="footer"><Link href="/" className="brand"><span className="brand-mark"><Camera size={17}/></span>Lensa Arena</Link><span>Foto olahraga, untuk setiap cerita.</span><span>© 2026 Lensa Arena</span></footer>
  </div></main>;
}
