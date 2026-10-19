/* =====================================================================
   LƯU PHẢN HỒI CỦA TRỢ LÝ AI + BÁO EMAIL CHO GIÁO VIÊN
   Dán toàn bộ đoạn này xuống CUỐI file Code.gs (sau dấu } cuối cùng).
   Cần thêm 2 dòng nhỏ ở chỗ khác trong Code.gs, xem hướng dẫn kèm theo.
   ===================================================================== */

var REVIEW_URL = "https://ces-training.github.io/ielts-writing-upgrade-from-7-to-9/#/review/";
var FB_IMG_FOLDER = "Band 7-9 · hình đề Task 1 của học sinh";
var FB_MAIL_GAP = 1800;      // cùng một bài: tối đa 1 email mỗi 30 phút (lần chấm đầu luôn có email)
var FB_MAIL_PER_DAY = 80;    // giới hạn email mỗi ngày, tránh chạm hạn mức gửi thư của Google

function fbTab_() {
  return tab_("ai_feedback", ["time", "sid", "name", "mode", "k", "input", "output", "image", "teacher_rating", "teacher_note"]);
}

/* Chạy hàm này MỘT LẦN trong Apps Script để cấp quyền Drive và tạo tab ai_feedback */
function setupFeedback() {
  fbTab_();
  var it = DriveApp.getFoldersByName(FB_IMG_FOLDER);
  if (!it.hasNext()) DriveApp.createFolder(FB_IMG_FOLDER);
  MailApp.getRemainingDailyQuota();
  Logger.log("Đã sẵn sàng: có tab ai_feedback và thư mục \"" + FB_IMG_FOLDER + "\" trong Drive.");
}

/* Gọi sau mỗi lần trợ lý AI trả lời thành công. Lỗi ở đây không làm hỏng lượt chấm của học sinh. */
function saveFb_(d, out) {
  try {
    var sid = String(d.sid || "").replace(/[^a-z0-9]/gi, "").slice(0, 16) || "nosid";
    var o = {};
    for (var k in out) if (k !== "left" && k !== "ok") o[k] = out[k];
    var inp = d.mode === "step"
      ? { m: d.m, k: d.k, why: d.why, how: d.how, before: d.before, after: d.after }
      : { m: d.m, dtype: d.dtype, q: d.q, text: d.text, auto: d.auto };
    var img = "";
    if (d.mode !== "step" && d.img) { try { img = saveImg_(d.img, sid, d.name); } catch (x) { console.log("saveImg_: " + x); } }
    var lock = LockService.getScriptLock(); lock.waitLock(20000);
    try {
      fbTab_().appendRow([new Date(), sid, clip_(d.name, 80), clip_(d.mode, 10), clip_(d.k || "", 10),
        clip_(JSON.stringify(inp), 45000), clip_(JSON.stringify(o), 45000), img, "", ""]);
    } finally { lock.releaseLock(); }
    fbMail_(d, o, sid);
  } catch (x) { console.log("saveFb_: " + x); }
}

function saveImg_(url, sid, name) {
  var m = /^data:(image\/(png|jpeg|gif|webp));base64,/.exec(String(url));
  if (!m) return "";
  var it = DriveApp.getFoldersByName(FB_IMG_FOLDER), f = it.hasNext() ? it.next() : DriveApp.createFolder(FB_IMG_FOLDER);
  var fn = String(name || "hs").replace(/[\\\/:*?"<>|]/g, "").slice(0, 40) + " · " + sid + "." + (m[2] === "jpeg" ? "jpg" : m[2]);
  return f.createFile(Utilities.newBlob(Utilities.base64Decode(String(url).slice(m[0].length)), m[1], fn)).getId();
}

function fbMail_(d, o, sid) {
  var cache = CacheService.getScriptCache(), ck = "fbm-" + sid, first = d.mode !== "step" && !cache.get("fbd-" + sid);
  if (!first && cache.get(ck)) return;
  var day = "fbmail-" + Utilities.formatDate(new Date(), "GMT+7", "yyyyMMdd"), sent = Number(cache.get(day)) || 0;
  if (sent >= FB_MAIL_PER_DAY) return;
  cache.put(day, String(sent + 1), 86400); cache.put(ck, "1", FB_MAIL_GAP);
  if (d.mode !== "step") cache.put("fbd-" + sid, "1", 21600);
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var name = String(d.name || "").slice(0, 80), link = REVIEW_URL + sid, task = d.m === "t1" ? "Task 1" : "Task 2", what, txt;
  if (d.mode === "step") {
    what = "AI vừa nhận xét bản sửa của " + name;
    txt = "Bước " + (d.k || "") + ": " + (o.pass ? "ĐẠT" : "CHƯA ĐẠT") + "\n" + String(o.comment || "").slice(0, 700);
  } else {
    var b = o.bands || {};
    what = (first ? "AI vừa chấm bài của " : "AI vừa ước lượng lại bài của ") + name;
    txt = "Band: TR/TA " + (b.TR != null ? b.TR : "–") + " · CC " + (b.CC != null ? b.CC : "–") + " · LR " + (b.LR != null ? b.LR : "–") + " · GRA " + (b.GRA != null ? b.GRA : "–") + " · chung " + (b.overall != null ? b.overall : "–") +
      "\n" + String(o.summary || "").slice(0, 700) + ((o.steps || []).length ? "\nSố bước sửa AI đề xuất: " + o.steps.length : "");
  }
  var note = "Các phản hồi tiếp theo của bài này trong 30 phút tới không gửi email riêng; chị xem tất cả ở trang trên.";
  MailApp.sendEmail({
    to: TEACHER_EMAIL,
    subject: "[Band 7→9] " + what + " (" + task + ")",
    body: what + " (" + task + ")\n\n" + txt + "\n\nXem đúng như học sinh thấy và đánh giá phản hồi: " + link + "\n\n" + note,
    htmlBody: "<p><b>" + esc(what) + "</b> (" + task + ")</p><p style=\"white-space:pre-wrap\">" + esc(txt) + "</p>" +
      "<p><a href=\"" + link + "\" style=\"display:inline-block;background:#1b1e3c;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none\">Xem phản hồi như học sinh thấy và đánh giá →</a></p>" +
      "<p style=\"color:#777;font-size:12px\">" + esc(note) + "</p>"
  });
}

/* Trang xem lại của giáo viên: danh sách bài, chi tiết một bài, và lưu đánh giá (cần đúng TEACHER_KEY) */
function review_(d) {
  if (!TEACHER_KEY || String(d.key || "") !== String(TEACHER_KEY)) return { ok: false, error: "key" };
  var sh = fbTab_();
  if (d.set) {
    var row = Math.floor(Number(d.set.row) || 0);
    if (row < 2 || row > sh.getLastRow() || String(sh.getRange(row, 2).getValue()) !== String(d.sid)) return { ok: false, error: "row" };
    var rt = ["ok", "fix", "bad"].indexOf(d.set.rating) >= 0 ? d.set.rating : "";
    sh.getRange(row, 9, 1, 2).setValues([[rt, clip_(d.set.note, 3000)]]);
    return { ok: true };
  }
  var v = sh.getDataRange().getValues(), iso = function (t) { return t instanceof Date ? t.toISOString() : String(t); };
  if (d.sid) {
    var rows = [], img = "";
    for (var i = 1; i < v.length; i++) {
      if (String(v[i][1]) !== String(d.sid)) continue;
      rows.push({ row: i + 1, time: iso(v[i][0]), name: String(v[i][2]), mode: String(v[i][3]), k: String(v[i][4]),
        input: String(v[i][5]), output: String(v[i][6]), rating: String(v[i][8]), note: String(v[i][9]) });
      if (!img && v[i][7]) { try { var bl = DriveApp.getFileById(String(v[i][7])).getBlob(); img = "data:" + bl.getContentType() + ";base64," + Utilities.base64Encode(bl.getBytes()); } catch (x) {} }
    }
    return { ok: true, rows: rows, image: img };
  }
  var by = {}, order = [];
  for (var j = 1; j < v.length; j++) {
    var r = v[j], sid = String(r[1]), e = by[sid];
    if (!e) { e = by[sid] = { sid: sid, name: String(r[2]), m: "", q: "", band: "", n: 0, steps: 0, rated: 0, last: "" }; order.push(sid); }
    e.n++; e.last = iso(r[0]); if (r[8]) e.rated++;
    if (String(r[3]) === "step") e.steps++;
    else if (!e.m) { try { var a = JSON.parse(r[5]), b2 = JSON.parse(r[6]); e.m = a.m || ""; e.q = String(a.q || "").slice(0, 200); e.band = b2.bands && b2.bands.overall != null ? b2.bands.overall : ""; } catch (x) {} }
  }
  return { ok: true, essays: order.map(function (s) { return by[s]; }).sort(function (x, y) { return x.last < y.last ? 1 : -1; }).slice(0, 300) };
}
