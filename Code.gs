/**
 * Google Apps Script - Toko Emas Aurum Gold
 * Deploy sebagai Web App: Execute as Me, Access: Anyone
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const lastRow = sheet.getLastRow();
    const no = lastRow < 1 ? 1 : lastRow;
    const timestamp = new Date();

    // Kolom: No | Nama | Nomor Telepon | Produk | Jumlah | Alamat | Catatan | Timestamp
    const rowData = [
      no,
      data.nama        || '-',
      data.telepon     || '-',
      data.produk      || '-',
      data.jumlah      || '-',
      data.alamat      || '-',
      data.catatan     || '-',
      timestamp
    ];

    sheet.appendRow(rowData);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Pesanan berhasil disimpan'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
