/* Luyện theo dạng bài: gom các đề Task 1 thành nhóm nhỏ trong từng dạng đề.
   - Map và Process: xếp tay theo mã đề (bảng MAPTAG, PROCTAG bên dưới). Đề mới thêm vào ngân hàng mà chưa có trong bảng sẽ chỉ hiện ở trang dạng đề, không hiện trong nhóm nhỏ.
   - Line, Bar, Table, Pie, Mixed: trang tự xếp theo số liệu của đề (trục thời gian, số đường, đơn vị, đối tượng so sánh), nên đề mới được xếp tự động.
   Muốn đổi tên nhóm hoặc lời khuyên: sửa ở DIMS. Mỗi nhóm: [mã, tên, lời khuyên khi viết]. */
(function () {
  var DIMS = {
    map: [
      { n: "Theo không gian", g: [
        ["in", "Trong nhà · sơ đồ mặt bằng", "Tả theo lối đi: từ cửa vào, bên trái, bên phải, cuối hành lang. Từ cần có: to the left of the entrance, at the far end, adjacent to, opposite. Tránh dùng north / south nếu sơ đồ không có la bàn."],
        ["site", "Ngoài trời · khuôn viên một cơ sở", "Một trường học, bệnh viện, công viên với vài hạng mục. Chia khuôn viên thành hai nửa hoặc bốn góc rồi tả từng phần; dùng in the north-west corner, to the south of, along the eastern edge."],
        ["town", "Ngoài trời · thị trấn, vùng rộng", "Nhiều đối tượng trên diện rộng. Lấy một mốc cố định (sông, đường chính, bờ biển) làm trục, rồi tả hai phía của trục đó. Overview nên nói vùng này trở nên đô thị hơn, nhiều nhà ở hơn hay nhiều dịch vụ du lịch hơn."]
      ] },
      { n: "Theo mốc thời gian", g: [
        ["pp", "Hai mốc đều ở quá khứ", "Cả hai mốc đã qua nên dùng quá khứ đơn bị động (was demolished, were replaced by). Dùng quá khứ hoàn thành khi có “by + năm”: By 2012, the café had been converted into a ticket office."],
        ["pn", "Quá khứ so với hiện tại", "Mốc cũ dùng quá khứ đơn; thay đổi kéo đến nay dùng hiện tại hoàn thành bị động: has been replaced by, have been added. Phần không đổi: has remained unchanged, is still in the same position."],
        ["fut", "Hiện tại so với kế hoạch tương lai", "Kế hoạch chưa xảy ra: will be converted into, is to be built, is planned to, is set to be replaced by, the proposed car park. Không dùng thì quá khứ cho sơ đồ thứ hai."],
        ["three", "Ba mốc thời gian", "Chia thân bài theo hai giai đoạn (mốc 1 đến mốc 2, mốc 2 đến mốc 3), không tả lần lượt ba hình. Overview nêu hướng thay đổi xuyên suốt cả ba mốc."],
        ["cmp", "So sánh hai sơ đồ, không có thời gian", "Không có thay đổi theo thời gian nên dùng hiện tại đơn và ngôn ngữ so sánh: whereas, while, both rooms, the larger room also has. Không dùng các động từ chỉ thay đổi."]
      ] },
      { n: "Theo đặc điểm thay đổi", g: [
        ["conv", "Đổi công năng, thay thế tại chỗ", "Vị trí giữ nguyên, công năng đổi: was converted into, was turned into, made way for, in place of, on the site of the former. Nhóm các phòng đổi công năng theo hướng chung (ví dụ: thêm khu dịch vụ, bớt khu trưng bày)."],
        ["ext", "Mở rộng, xây thêm", "Công trình lớn lên: was extended northwards, was enlarged, a new wing was added, doubled in size. Overview nên nói rõ quy mô tăng và phần nào giữ nguyên."],
        ["urb", "Đô thị hóa, phát triển khu dân cư và du lịch", "Đất nông nghiệp, cây xanh hoặc khu công nghiệp nhường chỗ cho nhà ở, dịch vụ: gave way to housing, residential development, became more built-up, at the expense of farmland."],
        ["road", "Giao thông và lối vào", "Trọng tâm là đường, vòng xuyến, bến xe, lối đi bộ: a roundabout was constructed at the junction, the road was pedestrianised, access to the hospital was improved. Nêu mục đích của thay đổi nếu đề có cho (giảm tai nạn, dễ tiếp cận hơn)."],
        ["zone", "Quy hoạch lại theo khu chức năng", "Mặt bằng chia thành các khu rõ ràng và các khu đổi chỗ hoặc đổi chức năng cho nhau. Tả theo từng khu: the north-western section, the area formerly occupied by; nêu khu nào thu hẹp, khu nào chuyển vị trí (was relocated to)."]
      ] }
    ],
    process: [
      { n: "Theo loại quy trình", g: [
        ["man", "Sản xuất, chế biến", "Quy trình nhân tạo: dùng hiện tại đơn bị động xuyên suốt (are harvested, is then heated). Overview nêu số công đoạn, điểm bắt đầu (nguyên liệu) và điểm kết thúc (thành phẩm)."],
        ["rec", "Tái chế, xử lý nước và rác", "Thường có vòng lặp hoặc nhánh quay lại: is fed back into, is reused, the cycle then begins again. Nêu rõ cái gì đi vào và cái gì đi ra ở mỗi bể, mỗi máy."],
        ["ene", "Sản xuất điện, năng lượng", "Tả đường đi của năng lượng: nhiên liệu, hơi nước, tua-bin, máy phát, lưới điện. Động từ: is pumped, drives the turbine, is converted into electricity, is transmitted via power lines."],
        ["mech", "Cấu tạo, vận hành và xây lắp", "Đề vừa có cấu tạo vừa có cách hoạt động hoặc cách dựng. Một đoạn tả các bộ phận (consists of, is fitted with), một đoạn tả trình tự vận hành hoặc lắp dựng."],
        ["evo", "Tiến hóa, phát triển qua các thời kỳ", "Không phải quy trình lặp lại mà là thay đổi qua thời gian: dùng quá khứ đơn và ngôn ngữ so sánh (became longer, more refined, far more sophisticated than). Không dùng first, next, then như quy trình sản xuất."],
        ["proc", "Thủ tục, lưu đồ", "Flow chart có điều kiện và nhánh: if the applicant fails, they must retake; once the outline has been approved. Chủ ngữ thường là người thực hiện nên dùng được cả chủ động lẫn bị động."]
      ] },
      { n: "Theo độ dài quy trình", g: [
        ["s1", "Ngắn · đến 7 bước", "Ít bước nên mỗi bước cần được tả đủ chi tiết: thiết bị, nguyên liệu, kết quả của bước. Vẫn cần đủ 150 từ."],
        ["s2", "Vừa · 8 đến 10 bước", "Chia thân bài thành hai giai đoạn hợp lý (ví dụ: chuẩn bị nguyên liệu, rồi chế biến và đóng gói) và nói rõ điểm chia trong overview."],
        ["s3", "Dài · từ 11 bước", "Phải gộp các bước liên tiếp vào một câu bằng mệnh đề rút gọn và after / before + V-ing: after being washed and sorted, the fruit is… Không viết mỗi bước một câu."]
      ] }
    ],
    line: [
      { n: "Theo số đường", g: [
        ["l2", "Hai đường", "So sánh trực tiếp hai đường ở mọi mốc quan trọng: điểm giao nhau, khoảng cách rộng nhất, đường nào dẫn đầu. Có đủ chỗ để dẫn số liệu ở mốc đầu, đỉnh, đáy và mốc cuối."],
        ["l3", "Ba đường", "Tìm đường khác biệt (đi ngược chiều hoặc đứng yên) và tả riêng; hai đường còn lại tả cùng nhau nếu cùng hướng."],
        ["l4", "Bốn đường", "Nhóm theo hướng (tăng, giảm) hoặc theo mức (cao, thấp), mỗi nhóm một đoạn thân bài. Không tả lần lượt từng đường."],
        ["l5", "Năm đường trở lên", "Không thể tả hết. Chọn đường cao nhất, đường thay đổi mạnh nhất và đường đi ngược xu hướng; các đường còn lại gộp trong một câu với khoảng giá trị (between 5% and 10%)."]
      ] },
      { n: "Theo khung thời gian", g: [
        ["past", "Qua nhiều năm, đã kết thúc", "Dùng quá khứ đơn; quá khứ hoàn thành với “by + năm”. Chia thân bài theo giai đoạn nếu các đường cùng đổi hướng ở một mốc."],
        ["proj", "Có dự báo tương lai", "Phần quá khứ dùng quá khứ đơn; phần dự báo dùng is projected to, is expected to, is forecast to, will have risen by. Nói rõ mốc chuyển từ số liệu thật sang dự báo."],
        ["month", "Theo tháng trong một năm", "Khung thời gian ngắn nên biến động (fluctuated, dipped, recovered) quan trọng hơn xu hướng dài. Dùng in the first quarter, over the following three months, by the end of the year."]
      ] },
      { n: "Theo đơn vị đo", g: [
        ["pct", "Tỉ lệ phần trăm", "Phân biệt percentage (con số) và proportion / share (phần). Thay đổi tính bằng percentage points: rose by 5 percentage points, không phải “rose 5%”."],
        ["abs", "Số lượng tuyệt đối", "Có thể dùng bội số và phân số: doubled, a threefold increase, fell by half. Ghi đúng đơn vị (million, tonnes) ở lần nhắc đầu."]
      ] },
      { n: "Theo đối tượng so sánh", g: "CMP" }
    ],
    bar: [
      { n: "Theo yếu tố thời gian", g: [
        ["tr", "Xu hướng qua nhiều mốc · trục ngang là thời gian", "Viết như line graph: tả xu hướng của từng nhóm cột qua các mốc, không đọc từng cột. Dùng động từ chỉ thay đổi và thì quá khứ."],
        ["yr", "So sánh hai, ba mốc năm theo hạng mục", "Mỗi hạng mục có hai, ba cột ứng với các năm. Nhóm các hạng mục tăng với nhau, các hạng mục giảm với nhau; nêu hạng mục thay đổi nhiều nhất và hạng mục gần như không đổi."],
        ["st", "Không có thời gian · so sánh tĩnh", "Không có xu hướng nên không dùng rise / fall. Dùng ngôn ngữ so sánh và xếp hạng: the highest figure, twice as many as, by contrast, respectively. Nếu đề không ghi năm thì dùng hiện tại đơn."]
      ] },
      { n: "Theo đơn vị đo", g: [
        ["pct", "Tỉ lệ phần trăm", "Luân phiên the percentage of, the proportion of, the share of. Kiểm tra xem các cột có cộng lại thành 100% không: nếu có thì có thể nói về phần còn lại (the remaining 20%)."],
        ["abs", "Số lượng tuyệt đối", "So sánh bằng bội số và hiệu số: three times as many, 50 more than. Ghi đúng đơn vị ở lần nhắc đầu."]
      ] },
      { n: "Theo đối tượng so sánh", g: "CMP" }
    ],
    table: [
      { n: "Theo yếu tố thời gian", g: [
        ["tr", "Có thay đổi qua các năm", "Đọc theo hàng để thấy xu hướng, đọc theo cột để thấy thứ hạng ở từng năm. Overview cần cả hai: xu hướng chung và đối tượng luôn đứng đầu hoặc đứng cuối."],
        ["st", "Không có thời gian · so sánh tĩnh", "Tìm giá trị lớn nhất và nhỏ nhất của mỗi cột, rồi tìm đối tượng nổi bật ở nhiều cột. Thân bài chia theo cột hoặc theo nhóm đối tượng giống nhau, không đọc từng hàng từ trên xuống."]
      ] },
      { n: "Theo đơn vị đo", g: [
        ["pct", "Tỉ lệ phần trăm", "Luân phiên the percentage of, the proportion of, the share of; dùng phân số gần đúng (just under a third, roughly one in five) để tránh lặp con số."],
        ["abs", "Số lượng tuyệt đối", "Bảng có số lớn và lẻ: làm tròn hợp lý (approximately 11.3 million, just over 200,000) thay vì chép nguyên con số."],
        ["mix", "Nhiều đơn vị khác nhau", "Mỗi cột một đơn vị (số lượng, phần trăm, tiền). Tả từng chỉ số riêng, rồi nêu mối liên hệ giữa các chỉ số nếu có (nơi có A cao nhất không phải là nơi có B cao nhất)."]
      ] },
      { n: "Theo đối tượng so sánh", g: "CMP" }
    ],
    pie: [
      { n: "Theo yếu tố thời gian", g: [
        ["yr", "Các pie ứng với các mốc năm", "Mỗi pie là một năm nên vẫn có thay đổi: phần nào lớn lên, phần nào thu hẹp. Dùng the share of X rose from … to …, X overtook Y as the largest category."],
        ["st", "Cùng một thời điểm · so sánh hai nhóm", "Hai pie là hai nơi, hai nhóm người hoặc hai chỉ số. Không có xu hướng: so sánh cùng một hạng mục ở hai pie (whereas, compared with, the corresponding figure for)."]
      ] },
      { n: "Theo số biểu đồ", g: [
        ["p2", "Hai pie", "Đi theo từng hạng mục và so sánh hai pie trong cùng một câu, bắt đầu từ hạng mục lớn nhất. Gộp các hạng mục nhỏ vào một câu."],
        ["p3", "Từ ba pie trở lên", "Nhiều pie thì phải chọn: tả hạng mục lớn nhất và hạng mục thay đổi rõ nhất qua tất cả các pie; nhóm các pie giống nhau lại với nhau."]
      ] }
    ],
    mixed: [
      { n: "Theo cách kết hợp", g: [
        ["same", "Hai biểu đồ cùng loại", "Hai biểu đồ cùng dạng nhưng đo hai thứ khác nhau. Mỗi biểu đồ một đoạn thân bài; overview có một câu cho mỗi biểu đồ và, nếu có, một câu nối hai biểu đồ."],
        ["wpie", "Biểu đồ hoặc bảng đi kèm pie chart", "Pie cho biết cơ cấu, biểu đồ còn lại cho biết số lượng hoặc xu hướng. Tả phần xu hướng trước, phần cơ cấu sau; không ép hai phần phải liên hệ với nhau nếu số liệu không cho thấy điều đó."],
        ["wtab", "Biểu đồ đi kèm bảng", "Bảng thường bổ sung chi tiết cho biểu đồ (mức thay đổi, phân nhóm). Dùng bảng để giải thích hoặc bổ sung cho điều biểu đồ cho thấy, tránh chép lại toàn bộ bảng."]
      ] },
      { n: "Theo yếu tố thời gian", g: [
        ["tr", "Có xu hướng qua các năm", "Ít nhất một biểu đồ có trục thời gian: phần đó viết như line graph với động từ chỉ thay đổi."],
        ["st", "Không có thời gian · so sánh tĩnh", "Cả hai biểu đồ đều là so sánh ở một thời điểm: dùng ngôn ngữ so sánh và xếp hạng, không dùng động từ chỉ thay đổi."]
      ] }
    ]
  };
  /* Nhóm “đối tượng so sánh” dùng chung cho line, bar, table. */
  var CMP = [
    ["place", "Giữa các quốc gia, thành phố", "Tên nước lặp lại nhiều lần: thay bằng the former, the latter, the two European countries, its neighbour; nhóm các nước có số liệu gần nhau."],
    ["age", "Giữa các nhóm tuổi", "Cách gọi nhóm tuổi: those aged 18–25, people in their thirties, the oldest age group, the under-30s. Tìm quy luật theo tuổi (càng lớn tuổi càng…)."],
    ["sex", "Giữa nam và nữ", "Luân phiên men / women, males / females, the figure for women, their male counterparts. Chỉ ra chỗ khoảng cách giữa hai giới lớn nhất và nhỏ nhất."],
    ["cat", "Giữa các hạng mục, loại hình", "Hạng mục là sản phẩm, hoạt động, ngành nghề. Xếp hạng trước (the most popular, the least common), rồi mới dẫn số liệu."]
  ];

  var MAPTAG = {
    d1jb2VI: "in pn conv", d1xyc9W: "site three zone", d1cshqC: "in pp conv", d1qGrNA: "site three zone", d1OqYH: "town pn urb",
    d1c6juR: "site pn zone", d1YcSh: "site pp ext", d1YippH: "site fut ext", d1gwAdD: "site fut zone", d1eRoBj: "town pn urb",
    d12GgsD: "in pn conv", d1Ts5G: "site pn zone", d1Y6JgB: "town pn urb", d1ruqtj: "in pn ext", d18TqDq: "in pn conv",
    d1QETBX: "in pp ext", d15NdQM: "town pp urb", d10xSQX: "town fut road", d1bFmE8: "in pn ext", d1v3FPW: "town pp urb",
    d1cR6yR: "town pp urb", d1jqvOt: "in cmp", d1f5GMm: "town pn urb", d1isGyw: "site pn ext", d1ZB9TR: "town fut road zone",
    d1yJPQ8: "site pp road", d1mgja: "in fut ext", d16aFxn: "site pn conv", d1voKWV: "in fut ext", d1XL7tA: "town fut zone urb", d1Utm08: "in pn conv"
  };
  var PROCTAG = {
    a1: "ene", d1DjvOp: "rec", d15Ok2g: "mech", d13WCO1: "man", d1WjF5W: "man", d1M7qCF: "man", d1u353Y: "proc", d1NBjD9: "man",
    d1SPIXh: "ene mech", d1M7lH: "rec", d1Rdlm2: "evo", d1zFlHR: "man", d1zRmW: "evo", d1igULq: "man", d1L74EE: "rec", d1Joto: "rec",
    d19qT1H: "mech", d1dlTdR: "man", d1dhKRU: "man", d17v4Yy: "mech", d19u2Q: "proc", d1SCLjj: "man", d1gQRUj: "man", d1onaLQ: "rec mech",
    d1wYbC3: "mech", d1PBwLN: "ene", d1EpkpW: "ene", d1X8uOv: "man", d1chIhj: "man", d1Ib7N0: "rec"
  };
  /* Chỉnh tay cho vài đề mà quy tắc tự động xếp chưa đúng: thêm (+) hoặc bớt (-) nhóm. */
  var FIX = { d1x9jLA: "+yr -st -place +cat", d1rDUDx: "+st -tr -yr +place -cat", d1SZUP: "+cat -place", d1HBBEd: "+yr -tr +sex", d1A3E9T: "+yr -st", d1Ahyfe: "+mix -abs", a8: "+mix -abs" };

  var isYr = function (s) { s = String(s); return s.length <= 16 && (/(^|[^\d,.])(1[5-9]|20)\d\d(?![\d,.])/.test(s) || /^(Year \d|This year|Now|Today|Present)/.test(s)); };
  var isMon = function (s) { return /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Mon|Tue|Wed|Thu|Fri|Sat|Sun)/.test(String(s)); };
  var most = function (a, f) { return a.length > 0 && a.filter(f).length >= Math.max(2, a.length * 0.6); };
  var PLACE = /\b(Australia|Canada|China|Russia|Turkey|UK|United Kingdom|Great Britain|USA|US|United States|Japan|France|Germany|Spain|Italy|Sweden|Netherlands|Portugal|Poland|Czech Republic|Romania|Hungary|Slovenia|Iceland|Denmark|Mexico|South Korea|Thailand|India|Vietnam|Philippines|Malaysia|Indonesia|Belgium|Switzerland|New Zealand|Luxembourg|Singapore|Nigeria|Chad|Congo|Somalia|Tanzania|Guatemala|Cambodia|Egypt|Brazil|Chile|Jordan|Bahamas|Slovakia|Austria|Greece|Africa|Asia|Europe|America|Country [A-E1-9]|Toronto|Madrid|Kuala Lumpur|Amman|Sydney|Melbourne|Brisbane|Adelaide|Hobart|Perth|Canberra|Darwin|Paris|Stockholm|Lisbon|Rome|Berlin|London|California|Utah|Florida|Louvre)\b/;
  var AGE = /(\d\s?[–-]\s?\d|\bUnder \d|\bOver \d|\bAged?\b|\d\+|\d (or|and) over|\d years)/;
  var SEX = /\b(Men|Women|Males?|Females?|Boys|Girls|Dad|Mom)\b/;

  function labels(ds) {
    if (ds.kind === "table") { var h = (ds.head || []).slice(1), r = (ds.rows || []).map(function (x) { return x[0]; }); return { x: r, s: h, unit: (ds.title || "") + " " + (ds.head || []).join(" ") + " " + (ds.rows || []).map(function (x) { return x.slice(1).join(" "); }).join(" ") }; }
    return { x: ds.x || [], s: (ds.series || []).map(function (z) { return z.n || ""; }), unit: (ds.unit || "") + " " + (ds.title || "") };
  }
  function timeTag(L) {
    if (most(L.x, isYr) || most(L.x, isMon)) return most(L.s, isYr) ? "yr" : "tr";
    if (most(L.s, isYr)) return L.s.length > 3 ? "tr" : "yr";
    return "st";
  }
  function cmpTags(L, out) {
    var all = L.x.concat(L.s).filter(function (s) { return !isYr(s) && !isMon(s); }), n = out.length;
    if (most(L.x.filter(function (s) { return !isYr(s); }), function (s) { return PLACE.test(s); }) || most(L.s.filter(function (s) { return !isYr(s); }), function (s) { return PLACE.test(s); })) out.push("place");
    if (all.filter(function (s) { return AGE.test(s) && !/\$/.test(s); }).length >= 2) out.push("age");
    if (all.filter(function (s) { return SEX.test(s); }).length >= 2) out.push("sex");
    if (out.length === n) out.push("cat");
  }
  function unitTag(p, l) {
    if (p.kind !== "table") return /%|percent|share|proportion/i.test(l.unit) ? "pct" : "abs";
    if (/%|percentage|proportion/i.test(p.title || "")) return "pct";
    var cells = []; (p.rows || []).forEach(function (r) { r.slice(1).forEach(function (c) { if (String(c).trim()) cells.push(String(c)); }); });
    var f = cells.length ? cells.filter(function (c) { return /%/.test(c); }).length / cells.length : 0;
    return f >= 0.8 ? "pct" : f >= 0.2 ? "mix" : "abs";
  }
  function classify(b) {
    var ds = b.ds, out = [], tp = b.tp, f;
    if (!ds) return out;
    if (tp === "map") out = (MAPTAG[b.id] || "").split(" ");
    else if (tp === "process") { out = (PROCTAG[b.id] || "").split(" "); var n = (ds.steps || []).length; if (n) out.push(n <= 7 ? "s1" : n <= 10 ? "s2" : "s3"); }
    else {
      var parts = ds.kind === "multi" ? ds.parts : [ds], Ls = parts.map(labels), L = Ls[0];
      var times = Ls.map(timeTag), pct = Ls.map(function (l, i) { return unitTag(parts[i], l); });
      if (tp === "line") {
        var ns = L.s.length; out.push(ns <= 2 ? "l2" : ns === 3 ? "l3" : ns === 4 ? "l4" : "l5");
        var last = L.x.map(function (s) { var m = /(1[5-9]|20)\d\d/.exec(s); return m ? +m[0] : 0; }).reduce(function (a, c) { return Math.max(a, c); }, 0), exam = +((b.d && b.d[0]) || "2024").slice(0, 4) || 2024;
        out.push(most(L.x, isMon) ? "month" : last > exam ? "proj" : "past"); out.push(pct[0]); cmpTags(L, out);
      } else if (tp === "bar") {
        out.push(times.indexOf("tr") >= 0 ? "tr" : times.indexOf("yr") >= 0 ? "yr" : "st"); out.push(pct[0]); Ls.forEach(function (l) { cmpTags(l, out); });
      } else if (tp === "table") {
        out.push(times[0] === "st" ? "st" : "tr"); out.push(pct[0]); cmpTags(L, out);
      } else if (tp === "pie") {
        var np = parts.reduce(function (a, p) { return a + (p.kind === "pie" ? (p.series || []).length : 0); }, 0);
        out.push(times.some(function (t) { return t !== "st"; }) ? "yr" : "st"); out.push(np >= 3 ? "p3" : "p2");
      } else if (tp === "mixed") {
        var ks = parts.map(function (p) { return p.kind; });
        out.push(ks.indexOf("pie") >= 0 ? "wpie" : ks.indexOf("table") >= 0 ? "wtab" : "same");
        out.push(times.some(function (t) { return t !== "st"; }) ? "tr" : "st");
      }
    }
    if ((f = FIX[b.id])) f.split(" ").forEach(function (t) { var k = t.slice(1), i = out.indexOf(k); if (t[0] === "+" && i < 0) out.push(k); if (t[0] === "-" && i >= 0) out.splice(i, 1); });
    return out.filter(function (k, i) { return k && out.indexOf(k) === i; });
  }
  Object.keys(DIMS).forEach(function (tp) { DIMS[tp].forEach(function (d) { if (d.g === "CMP") d.g = CMP; }); });
  window.B79_SUB = { dims: DIMS, classify: classify };
})();
