# 🚀 Panduan Deployment Sistem Reservasi Restoran

## 📋 Daftar Isi
1. [Setup Google Spreadsheet](#step-1--setup-google-spreadsheet)
2. [Setup Google Apps Script](#step-2--setup-google-apps-script)
3. [Deploy Web App](#step-3--deploy-web-app)
4. [Hubungkan ke Website](#step-4--hubungkan-ke-website)
5. [Testing](#step-5--testing)
6. [Troubleshooting](#troubleshooting)

---

## STEP 1 — Setup Google Spreadsheet

1. Buka [Google Sheets](https://sheets.google.com)
2. Klik **+ Blank** untuk membuat spreadsheet baru
3. Rename file (contoh: `Reservasi Restoran`)
4. Di baris pertama (row 1), buat header dengan urutan PERSIS seperti ini:

```
| No | Nama | Nomor Telepon | Jumlah Tamu | Tanggal Reservasi | Waktu Reservasi | Catatan Tambahan | Timestamp |
```

5. Format kolom (opsional tapi direkomendasikan):
   - Kolom A (No): Number
   - Kolom B (Nama): Plain text
   - Kolom C (Nomor Telepon): Plain text
   - Kolom D (Jumlah Tamu): Number
   - Kolom E (Tanggal Reservasi): Date
   - Kolom F (Waktu Reservasi): Plain text
   - Kolom G (Catatan Tambahan): Plain text
   - Kolom H (Timestamp): Date time

6. Simpan spreadsheet

---

## STEP 2 — Setup Google Apps Script

1. Dari spreadsheet yang sudah dibuat, klik menu **Extensions** → **Apps Script**
2. Akan terbuka tab baru dengan Apps Script Editor
3. Hapus semua kode default yang ada (biasanya ada function myFunction())
4. Copy seluruh isi file `Code.gs` yang sudah disediakan
5. Paste ke Apps Script Editor
6. Klik **💾 Save** atau tekan `Ctrl+S`
7. Rename project (opsional): Klik "Untitled project" → ganti nama (contoh: "Reservasi API")

---

## STEP 3 — Deploy Web App

1. Di Apps Script Editor, klik tombol **Deploy** (pojok kanan atas)
2. Pilih **New deployment**
3. Klik ⚙️ icon di samping "Select type"
4. Pilih **Web app**
5. Isi konfigurasi:
   - **Description**: `Reservasi API v1` (atau nama lain)
   - **Execute as**: **Me** (email Anda)
   - **Who has access**: **Anyone** ⚠️ PENTING!
6. Klik **Deploy**
7. Akan muncul dialog "Authorize access":
   - Klik **Authorize access**
   - Pilih akun Google Anda
   - Klik **Advanced** (jika muncul warning)
   - Klik **Go to [Project Name] (unsafe)**
   - Klik **Allow**
8. Setelah authorized, akan muncul **Web App URL**
9. **COPY URL INI** - Anda akan membutuhkannya di step berikutnya

URL akan terlihat seperti ini:
```
https://script.google.com/macros/s/AKfycbx.../exec
```

---

## STEP 4 — Hubungkan ke Website

1. Buka file `index.html`
2. Cari baris ini (sekitar baris 180):

```javascript
const WEB_APP_URL = "YOUR_WEB_APP_URL";
```

3. Ganti `YOUR_WEB_APP_URL` dengan URL yang Anda copy dari Step 3:

```javascript
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbx.../exec";
```

4. Save file `index.html`

---

## STEP 5 — Testing

### Test 1: Buka Website
1. Buka file `index.html` di browser
2. Pastikan form tampil dengan baik
3. Cek responsiveness (resize browser atau buka di mobile)

### Test 2: Submit Form
1. Isi semua field yang required:
   - Nama: `Test User`
   - Nomor Telepon: `081234567890`
   - Jumlah Tamu: `4`
   - Tanggal: Pilih tanggal hari ini atau besok
   - Waktu: `19:00`
   - Catatan: `Test reservasi` (opsional)
2. Klik **Kirim Reservasi**
3. Tunggu beberapa detik
4. Seharusnya muncul notifikasi hijau "Reservasi Berhasil!"

### Test 3: Cek Spreadsheet
1. Buka Google Spreadsheet Anda
2. Refresh halaman
3. Seharusnya ada data baru di baris kedua (row 2)
4. Pastikan semua data sesuai dengan yang Anda input

### Test 4: Validasi Form
1. Coba submit form kosong → harus muncul error
2. Coba isi nomor telepon dengan huruf → harus muncul error
3. Coba pilih tanggal kemarin → harus muncul error
4. Coba isi jumlah tamu dengan 0 → harus muncul error

---

## 🎯 Arsitektur Sistem

```
┌─────────────────────────────────────────┐
│  Frontend (index.html)                  │
│  - HTML5 + Tailwind CSS                 │
│  - Vanilla JavaScript                   │
│  - Form Validation                      │
│  - Fetch API                            │
└──────────────┬──────────────────────────┘
               │
               │ POST Request (JSON)
               │ {nama, telepon, jumlahTamu, ...}
               ▼
┌─────────────────────────────────────────┐
│  Google Apps Script Web App             │
│  - doPost() function                    │
│  - Data validation                      │
│  - JSON parsing                         │
└──────────────┬──────────────────────────┘
               │
               │ appendRow()
               ▼
┌─────────────────────────────────────────┐
│  Google Spreadsheet (Database)          │
│  - 8 kolom data                         │
│  - Auto numbering                       │
│  - Timestamp otomatis                   │
└─────────────────────────────────────────┘
```

---

## 🔧 Troubleshooting

### ❌ Error: "Terjadi kesalahan saat mengirim data"

**Penyebab:**
- Web App URL salah atau belum diganti
- Apps Script belum di-deploy
- Permission "Anyone" belum diset

**Solusi:**
1. Cek kembali Web App URL di `index.html`
2. Pastikan sudah deploy dengan "Who has access: Anyone"
3. Coba deploy ulang (New deployment)

---

### ❌ Data tidak masuk ke Spreadsheet

**Penyebab:**
- Header spreadsheet tidak sesuai
- Sheet yang aktif bukan sheet pertama

**Solusi:**
1. Pastikan header PERSIS seperti di Step 1
2. Pastikan Anda berada di sheet pertama (Sheet1)
3. Coba test dengan function `testDoPost()` di Apps Script

---

### ❌ Form tidak bisa di-submit

**Penyebab:**
- Validasi form gagal
- JavaScript error

**Solusi:**
1. Buka Developer Console (F12)
2. Cek tab Console untuk error
3. Pastikan semua field required terisi
4. Pastikan tanggal tidak lampau

---

### ❌ CORS Error

**Penyebab:**
- Ini normal untuk Google Apps Script dengan mode `no-cors`

**Solusi:**
- Tidak perlu diperbaiki, sistem sudah menggunakan `mode: 'no-cors'`
- Data tetap akan masuk ke spreadsheet meskipun ada CORS warning

---

## 🔄 Update Deployment

Jika Anda mengubah kode di Apps Script:

1. Buka Apps Script Editor
2. Edit kode sesuai kebutuhan
3. Save
4. Klik **Deploy** → **Manage deployments**
5. Klik ✏️ icon di deployment yang aktif
6. Ubah **Version** menjadi **New version**
7. Klik **Deploy**
8. URL tetap sama, tidak perlu update di `index.html`

---

## 📱 Deploy ke Production

### Hosting Website:

1. **GitHub Pages** (Gratis):
   - Upload `index.html` ke GitHub repository
   - Enable GitHub Pages di Settings
   - Akses via `https://username.github.io/repo-name`

2. **Netlify** (Gratis):
   - Drag & drop folder ke Netlify
   - Dapat custom domain

3. **Vercel** (Gratis):
   - Connect GitHub repo
   - Auto deploy on push

### Generate QR Code:

1. Buka [QR Code Generator](https://www.qr-code-generator.com/)
2. Paste URL website Anda
3. Download QR Code
4. Print dan letakkan di meja restoran

---

## 📊 Fitur Tambahan (Opsional)

### Auto-reply WhatsApp:
Tambahkan di Apps Script setelah `sheet.appendRow(rowData)`:

```javascript
// Kirim notifikasi ke admin via email
MailApp.sendEmail({
  to: "admin@restoran.com",
  subject: "Reservasi Baru: " + data.nama,
  body: `Reservasi baru dari:\n\nNama: ${data.nama}\nTelepon: ${data.telepon}\nTanggal: ${data.tanggal}\nWaktu: ${data.waktu}\nJumlah: ${data.jumlahTamu} orang`
});
```

### Dashboard Admin:
Buat sheet kedua untuk statistik:
- Total reservasi hari ini
- Grafik reservasi per hari
- Tamu terbanyak

---

## ✅ Checklist Deployment

- [ ] Spreadsheet dibuat dengan header yang benar
- [ ] Apps Script di-paste dan di-save
- [ ] Web App di-deploy dengan "Anyone" access
- [ ] Web App URL di-copy
- [ ] URL di-paste ke `index.html`
- [ ] Website dibuka dan form tampil
- [ ] Test submit berhasil
- [ ] Data masuk ke spreadsheet
- [ ] Validasi form berfungsi
- [ ] Website di-deploy ke hosting
- [ ] QR Code di-generate

---

## 📞 Support

Jika masih ada masalah, cek:
1. Console browser (F12) untuk JavaScript errors
2. Apps Script logs (View → Logs)
3. Spreadsheet permissions (pastikan Anda owner)

Selamat menggunakan sistem reservasi! 🎉
