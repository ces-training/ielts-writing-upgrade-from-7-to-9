/* =====================================================================
   ĐỒNG BỘ TIẾN ĐỘ HỌC (Band 7→9 Writing Lab)
   Giúp học sinh học trên máy tính rồi mở điện thoại / Zalo vẫn thấy đủ
   giờ học, bài đã làm, bài viết đã nộp và gói chữa bài đã mua.

   Cách cài (một lần):
   1. Trong dự án Apps Script, bấm dấu + cạnh "Tệp" → Tập lệnh → đặt tên Sync,
      xóa hết nội dung mặc định rồi dán TOÀN BỘ file này vào.
   2. Mở file Code.gs, tìm dòng   function doPost(e) {
      và thêm ngay BÊN DƯỚI nó đúng một dòng:
          var s_ = syncHandle_(e); if (s_) return s_;
   3. Lưu, rồi Triển khai → Quản lý các lần triển khai → biểu tượng bút chì →
      Phiên bản: "Phiên bản mới" → Triển khai.
   Tiến độ của từng học sinh được lưu ở trang tính mới tên "state"
   (tự tạo ra). Không cần sửa gì trong trang tính đó.
   ===================================================================== */

var SYNC_CHUNK = 45000;   // mỗi ô của Google Sheets chứa tối đa 50.000 ký tự
var SYNC_MAXCH = 80;      // tối đa khoảng 3,6 triệu ký tự cho một học sinh

/* Trả về câu trả lời nếu đây là yêu cầu đồng bộ; trả về null để doPost cũ xử lý như trước. */
function syncHandle_(e) {
  var d;
  try { d = JSON.parse(e.postData.contents); } catch (x) { return null; }
  if (!d || (d.kind !== 'state_get' && d.kind !== 'state_put')) return null;
  var out;
  try { out = d.kind === 'state_get' ? syncGet_(d) : syncPut_(d); }
  catch (err) { out = { ok: 0, error: String(err) }; }
  out.sync = 1;
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}

function syncSlug_(s) {
  return String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
/* Google Sheets hay bỏ số 0 ở đầu số điện thoại, nên chuẩn hóa lại cho khớp. */
function syncPhone_(v) {
  var d = String(v == null ? '' : v).replace(/\D/g, '');
  if (d.indexOf('84') === 0 && d.length >= 11) d = '0' + d.slice(2);
  if (d && d.charAt(0) !== '0') d = '0' + d;
  return d;
}
function syncBook_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('no-sheet');
  return ss;
}
function syncSheet_(ss) {
  var sh = ss.getSheetByName('state');
  if (!sh) {
    sh = ss.insertSheet('state');
    sh.getRange(1, 1, 1, 5).setValues([['key', 'name', 'phone', 'updated', 'chunks']]);
    sh.setFrozenRows(1);
  }
  return sh;
}
/* Mỗi người học = tên (bỏ dấu, không phân biệt hoa thường) + số Zalo. Hai bạn trùng tên nhưng khác số không lẫn tiến độ. */
function syncKey_(d) { return syncSlug_(d.name) + '|' + syncPhone_(d.phone); }
function syncFind_(sh, key) {
  var n = sh.getLastRow(); if (n < 2) return 0;
  var keys = sh.getRange(2, 1, n - 1, 1).getValues();
  for (var i = 0; i < keys.length; i++) if (String(keys[i][0]) === key) return i + 2;
  return 0;
}
function syncRead_(sh, row) {
  var nc = +sh.getRange(row, 5).getValue() || 0; if (!nc) return null;
  var parts = sh.getRange(row, 6, 1, nc).getValues()[0];
  var js = parts.map(function (p) { return String(p).slice(1); }).join('');
  try { return JSON.parse(js); } catch (x) { return null; }
}
/* Nhật ký của một người học trong trang log: các số Zalo người đó từng khai và các dòng bài làm. */
function syncLog_(ss, name, withRows) {
  var out = { phones: {}, rows: [] };
  var sh = ss.getSheetByName('log'); if (!sh) return out;
  var n = sh.getLastRow(); if (n < 2) return out;
  var v = sh.getRange(2, 1, n - 1, 12).getValues(), me = syncSlug_(name);
  for (var i = 0; i < v.length; i++) {
    var r = v[i];
    if (syncSlug_(r[1]) !== me) continue;
    if (r[3] === 'login' && r[6] === 'phone' && r[11] !== '' && r[11] != null) out.phones[syncPhone_(r[11])] = 1;
    if (withRows && (r[3] === 'item' || r[3] === 'write' || r[3] === 'coach')) {
      var ts = r[0] instanceof Date ? r[0].getTime() : (Date.parse(r[0]) || 0);
      out.rows.push([ts, r[3], String(r[4]), String(r[5]), String(r[6]), +r[7] || 0, +r[8] || 0, +r[9] || 0, +r[10] || 0, r[3] === 'write' ? String(r[11] == null ? '' : r[11]) : '']);
    }
  }
  return out;
}
/* Gói chữa bài đã mua: chỉ trả về khi số Zalo khớp với số người học đó đã khai, để người trùng tên không dùng được mã. */
function syncPaid_(ss, name) {
  var sh = ss.getSheetByName('paid'); if (!sh) return null;
  var n = sh.getLastRow(); if (n < 2) return null;
  var v = sh.getRange(2, 1, n - 1, 7).getValues(), me = syncSlug_(name), best = null;
  for (var i = 0; i < v.length; i++) {
    if (!v[i][0] || syncSlug_(v[i][1]) !== me) continue;
    best = { code: String(v[i][0]), left: Math.max(0, (+v[i][3] || 0) - (+v[i][4] || 0)) };  // dòng mới nhất được ưu tiên
  }
  return best;
}

function syncGet_(d) {
  if (!d.name) return { ok: 0 };
  var ss = syncBook_(), sh = syncSheet_(ss), key = syncKey_(d), phone = syncPhone_(d.phone);
  var row = syncFind_(sh, key), state = row ? syncRead_(sh, row) : null;
  var hasPaid = syncPaid_(ss, d.name);
  var out = { ok: 1, state: state, rows: null, paid: null };
  if (!state || (hasPaid && phone)) {
    var lg = syncLog_(ss, d.name, !state);
    var known = Object.keys(lg.phones).length > 0;
    var mine = phone ? (!known || lg.phones[phone] === 1) : !known;
    if (!state && mine) out.rows = lg.rows;
    if (hasPaid && phone && lg.phones[phone] === 1) out.paid = hasPaid;
  }
  return out;
}

function syncPut_(d) {
  if (!d.name || !d.state || typeof d.state !== 'object') return { ok: 0 };
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var ss = syncBook_(), sh = syncSheet_(ss), key = syncKey_(d), row = syncFind_(sh, key), st = d.state, prev = 0;
    if (row) { prev = +sh.getRange(row, 5).getValue() || 0; var old = syncRead_(sh, row); if (old) syncMerge_(st, old); }
    else row = sh.getLastRow() + 1;
    var js = JSON.stringify(st), parts = [];
    for (var i = 0; i < js.length; i += SYNC_CHUNK) parts.push('j' + js.substr(i, SYNC_CHUNK));  // chữ j ở đầu để Sheets không hiểu nhầm thành số hay công thức
    if (parts.length > SYNC_MAXCH) return { ok: 0, error: 'too-big' };
    var need = 5 + Math.max(parts.length, prev);
    if (sh.getMaxColumns() < need) sh.insertColumnsAfter(sh.getMaxColumns(), need - sh.getMaxColumns());
    sh.getRange(row, 1, 1, 5).setValues([[key, d.name, "'" + syncPhone_(d.phone), new Date(), parts.length]]);
    sh.getRange(row, 6, 1, parts.length).setValues([parts]);
    if (prev > parts.length) sh.getRange(row, 6 + parts.length, 1, prev - parts.length).clearContent();
    return { ok: 1 };
  } finally {
    lock.releaseLock();
  }
}

/* Gộp tiến độ F vào T (giống hệt cách trang web gộp): không làm mất gì, khi trùng thì T giữ phần của mình. */
function syncMerge_(T, F) {
  if (!T || !F || typeof F !== 'object') return T;
  ['done', 'wr', 'sec', 'draft'].forEach(function (k) { if (!T[k] || typeof T[k] !== 'object') T[k] = {}; });
  Object.keys(F.done || {}).forEach(function (id) {
    var a = T.done[id], b = F.done[id]; if (!b || typeof b !== 'object') return;
    if (!a) { T.done[id] = b; return; }
    a.n = Math.max(a.n || 0, b.n || 0); a.c = Math.max(a.c || 0, b.c || 0);
    if (a.f == null && b.f != null) a.f = b.f; a.ts = Math.max(a.ts || 0, b.ts || 0);
  });
  Object.keys(F.sec || {}).forEach(function (k) { var v = +F.sec[k] || 0; if (v > (+T.sec[k] || 0)) T.sec[k] = v; });
  Object.keys(F.wr || {}).forEach(function (id) {
    var b = F.wr[id]; if (!Array.isArray(b)) return;
    var a = Array.isArray(T.wr[id]) ? T.wr[id] : [], seen = {};
    a.forEach(function (r) { if (r) seen[r.ts + ':' + r.words] = 1; });
    var add = b.filter(function (r) { return r && !seen[r.ts + ':' + r.words]; }); if (!add.length) return;
    T.wr[id] = a.concat(add).sort(function (x, y) { return (x.ts || 0) - (y.ts || 0); }).slice(-5);
  });
  Object.keys(F.draft || {}).forEach(function (id) {
    if (T.draft[id] == null && F.draft[id] != null && (T.wr[id] || []).length <= ((F.wr && F.wr[id]) || []).length) T.draft[id] = F.draft[id];
  });
  if (F.paid && F.paid.code && !(T.paid && T.paid.code)) T.paid = F.paid;
  if (F.lab && typeof F.lab === 'object') {
    if (!T.lab || typeof T.lab !== 'object') T.lab = F.lab;
    else {
      if (F.lab.runs) { T.lab.runs = T.lab.runs || {}; Object.keys(F.lab.runs).forEach(function (r) { if (!T.lab.runs[r]) T.lab.runs[r] = F.lab.runs[r]; }); }
      Object.keys(F.lab).forEach(function (k) { if (k !== 'runs' && T.lab[k] == null && F.lab[k] != null) T.lab[k] = F.lab[k]; });
    }
  }
  Object.keys(F).forEach(function (k) { if (['done', 'wr', 'sec', 'draft', 'paid', 'lab'].indexOf(k) < 0 && T[k] == null && F[k] != null) T[k] = F[k]; });
  return T;
}
