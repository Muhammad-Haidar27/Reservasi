# 🍽️ Sistem Reservasi Meja Restoran Digital

Website form reservasi meja restoran yang modern, responsive, dan terintegrasi dengan Google Spreadsheet. Cocok untuk restoran yang ingin menerima reservasi melalui QR Code atau media sosial.

## ✨ Fitur

- ✅ Form reservasi yang user-friendly
- ✅ Validasi real-time untuk semua input
- ✅ Responsive design (mobile-first)
- ✅ Loading state & notifikasi sukses/error
- ✅ Integrasi langsung ke Google Spreadsheet
- ✅ Tema modern dengan warna warm orange/terracotta
- ✅ Smooth animations & transitions
- ✅ Production-ready

## 🎨 Tech Stack

- **Frontend**: HTML5, Tailwind CSS (CDN), Vanilla JavaScript
- **Backend**: Google Apps Script
- **Database**: Google Spreadsheet
- **API**: Fetch API

## 📁 Struktur File

```
.
├── index.html              # Website form reservasi
├── Code.gs                 # Google Apps Script backend
├── DEPLOYMENT_GUIDE.md     # Panduan deployment lengkap
└── README.md               # File ini
```

## 🚀 Quick Start

1. Buat Google Spreadsheet dengan header:
   ```
   No | Nama | Nomor Telepon | Jumlah Tamu | Tanggal Reservasi | Waktu Reservasi | Catatan Tambahan | Timestamp
   ```

2. Buka Extensions → Apps Script, paste kode dari `Code.gs`

3. Deploy sebagai Web App (Execute as: Me, Access: Anyone)

4. Copy Web App URL dan paste ke `index.html`:
   ```javascript
   const WEB_APP_URL = "YOUR_WEB_APP_URL";
   ```

5. Buka `index.html` di browser dan test!

📖 **Panduan lengkap ada di [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)**

## 📊 Data Flow

```
User mengisi form → Submit → Fetch API (POST JSON) → 
Google Apps Script → Validasi data → Simpan ke Spreadsheet → 
Return response → Tampilkan notifikasi
```

## 🎯 Use Case

- Reservasi meja via QR Code di meja restoran
- Link reservasi di Instagram/Facebook bio
- Reservasi via WhatsApp Business (link)
- Website restoran

## 📱 Responsive Design

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## 🔒 Security

- Input validation di frontend & backend
- Sanitasi data sebelum disimpan
- HTTPS via Google Apps Script
- No database credentials exposed

## 🎨 Customization

### Ubah Warna Tema:
Edit di `index.html`, cari class Tailwind:
- `orange-600` → ganti dengan warna lain (blue-600, green-600, dll)
- `orange-50` → sesuaikan background

### Ubah Teks:
- Judul: Edit tag `<h1>`
- Label form: Edit tag `<label>`
- Placeholder: Edit attribute `placeholder`

### Tambah Field:
1. Tambah input di HTML
2. Tambah validasi di JavaScript
3. Tambah kolom di Spreadsheet
4. Update `Code.gs` untuk handle field baru

## 📈 Pengembangan Lebih Lanjut

- [ ] Dashboard admin untuk lihat reservasi
- [ ] Notifikasi email/WhatsApp otomatis
- [ ] Sistem konfirmasi reservasi
- [ ] Cek ketersediaan meja real-time
- [ ] Export data ke PDF/Excel
- [ ] Multi-language support
- [ ] Dark mode

## 🐛 Troubleshooting

Lihat section Troubleshooting di [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

## 📄 License

Free to use untuk keperluan komersial maupun personal.

## 🙏 Credits

Dibuat dengan ❤️ untuk membantu bisnis restoran go digital.

---

**Happy Coding! 🚀**
