/**
 * Google Apps Script untuk Sistem Reservasi Restoran
 * File ini harus di-deploy sebagai Web App
 */

function doPost(e) {
  try {
    // Parse data dari request
    const data = JSON.parse(e.postData.contents);
    
    // Validasi data
    if (!data.nama || !data.telepon || !data.jumlahTamu || !data.tanggal || !data.waktu) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Data tidak lengkap'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Buka spreadsheet aktif
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Hitung nomor urut
    const lastRow = sheet.getLastRow();
    const no = lastRow > 0 ? lastRow : 1;
    
    // Timestamp
    const timestamp = new Date();
    
    // Siapkan data sesuai urutan kolom spreadsheet
    const rowData = [
      no,                    // No
      data.nama,             // Nama
      data.telepon,          // Nomor Telepon
      data.jumlahTamu,       // Jumlah Tamu
      data.tanggal,          // Tanggal Reservasi
      data.waktu,            // Waktu Reservasi
      data.catatan || '-',   // Catatan Tambahan
      timestamp              // Timestamp
    ];
    
    // Tambahkan data ke spreadsheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Reservasi berhasil disimpan',
      data: {
        no: no,
        nama: data.nama,
        timestamp: timestamp
      }
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Function untuk testing (opsional)
 * Bisa dijalankan dari Apps Script Editor untuk test
 */
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        nama: "Test User",
        telepon: "081234567890",
        jumlahTamu: "4",
        tanggal: "2026-03-10",
        waktu: "19:00",
        catatan: "Meja dekat jendela"
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}
