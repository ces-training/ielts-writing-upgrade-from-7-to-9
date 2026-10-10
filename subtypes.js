/* Luyện theo dạng bài: gom các đề Task 1 thành nhóm nhỏ trong từng dạng đề.
   - Map và Process: xếp tay theo mã đề (bảng MAPTAG, PROCTAG bên dưới). Đề mới thêm vào ngân hàng mà chưa có trong bảng sẽ chỉ hiện ở trang dạng đề, không hiện trong nhóm nhỏ.
   - Line, Bar, Table, Pie, Mixed: trang tự xếp theo số liệu của đề (trục thời gian, số đường, đơn vị, đối tượng so sánh), nên đề mới được xếp tự động.
   Muốn đổi tên nhóm hoặc lời khuyên: sửa ở DIMS. Mỗi nhóm: [mã, tên, mốc band 7, việc cần làm để lên band 9].
   Lời khuyên đã được đối chiếu (10/2026) với bảng mô tả band điểm công khai của IELTS và các trang IDP IELTS, IELTS Liz, IELTS Advantage, IELTS Podcast. */
(function () {
  /* Mỗi nhóm: [mã, tên, mốc band 7 (điều người viết band 7 đã làm được với nhóm đề này), việc cần làm để lên band 9]. */
  var DIMS = {
    map: [
      { n: "Theo không gian", g: [
        ["in", "Trong nhà · sơ đồ mặt bằng", "Bạn xác định đúng vị trí từng phòng so với cửa vào và các phòng bên cạnh. Overview nói được phần nào của mặt bằng thay đổi và phần nào giữ nguyên.", "Tả theo lối đi của người bước vào, bằng cụm vị trí chính xác và đa dạng: to the left of the entrance, at the far end, adjacent to, opposite, in the corner nearest the stairs. Sơ đồ trong nhà thường không có la bàn nên ưu tiên các mốc bên trong tòa nhà; chỉ dùng north / south khi hình có ghi hướng."],
        ["site", "Ngoài trời · khuôn viên một cơ sở", "Bạn nêu đủ các hạng mục và vị trí của chúng bằng hướng la bàn, và chia thân bài hợp lý (theo mốc thời gian, hoặc theo phần thay đổi và phần giữ nguyên).", "Chia khuôn viên thành hai nửa hoặc bốn góc và tả trọn từng phần, để người đọc dựng lại được mặt bằng mà không cần nhìn hình: in the north-west corner, immediately to the south of, along the eastern edge. Nếu hình không ghi hướng, có thể coi phía trên là hướng bắc."],
        ["town", "Ngoài trời · thị trấn, vùng rộng", "Bạn nêu được các thay đổi chính và những gì giữ nguyên, có overview cho biết hướng thay đổi chung của cả vùng.", "Lấy một mốc cố định (sông, đường chính, bờ biển) làm trục và tả hai phía của trục đó, thay vì liệt kê từng công trình. Overview gọi đúng tên hướng thay đổi mà hình cho thấy (more residential, more built-up, more facilities for visitors). Không suy đoán nguyên nhân hay hệ quả mà hình không thể hiện."]
      ] },
      { n: "Theo mốc thời gian", g: [
        ["pp", "Hai mốc đều ở quá khứ", "Bạn dùng đúng quá khứ đơn cho cả hai mốc và dùng được bị động cho các thay đổi (was built, were removed).", "Phối hợp nhiều cấu trúc thay vì lặp một mẫu câu bị động: quá khứ hoàn thành với “by + năm” (By 2012, the café had been converted into a ticket office), danh hóa (the demolition of…, the construction of…), mệnh đề rút gọn."],
        ["pn", "Quá khứ so với hiện tại", "Bạn tách được hai thì: quá khứ đơn cho mốc cũ, hiện tại hoàn thành hoặc hiện tại đơn cho hiện trạng.", "Dùng hiện tại hoàn thành bị động chính xác cho thay đổi kéo đến nay (has been replaced by, have been added), và nói về phần không đổi bằng nhiều cách: has remained unchanged, still occupies the same position, is the only feature to have survived."],
        ["fut", "Hiện tại so với kế hoạch tương lai", "Bạn không dùng thì quá khứ cho sơ đồ kế hoạch, và dùng được will + bị động (will be built).", "Đa dạng cách nói về kế hoạch: is to be built, is planned to, is set to be replaced by, the proposed car park, under the plans. Giữ hiện tại đơn cho hiện trạng và tương lai cho kế hoạch ngay trong cùng một câu so sánh."],
        ["three", "Ba mốc thời gian", "Bạn tả đủ cả ba mốc theo trình tự thời gian và có overview nêu hướng thay đổi chung.", "Chia thân bài theo giai đoạn (mốc 1 đến mốc 2, mốc 2 đến mốc 3) thay vì tả lần lượt ba hình, và chỉ ra điều xuyên suốt cả ba mốc: cái gì liên tục lớn lên, cái gì thu hẹp dần, cái gì không đổi."],
        ["cmp", "So sánh hai sơ đồ, không có thời gian", "Bạn nhận ra đề không có thay đổi theo thời gian, dùng hiện tại đơn và nêu được điểm giống, điểm khác chính.", "So sánh từng cặp đặc điểm trong cùng một câu (whereas, while, both rooms, the larger room also has) và sắp theo mức độ quan trọng. Không dùng động từ chỉ thay đổi."]
      ] },
      { n: "Theo đặc điểm thay đổi", g: [
        ["conv", "Đổi công năng, thay thế tại chỗ", "Bạn nói được cái gì thay cho cái gì bằng các từ cơ bản (was replaced by, was changed into).", "Dùng đúng động từ cho từng kiểu thay đổi: was converted into, was turned into, made way for, in place of, on the site of the former. Nếu hình cho thấy một hướng chung (ví dụ: bớt khu trưng bày, thêm khu dịch vụ) thì gom các thay đổi theo hướng đó thay vì kể từng phòng."],
        ["ext", "Mở rộng, xây thêm", "Bạn nêu được phần xây thêm, phần mở rộng và vị trí của chúng.", "Nói rõ hướng và mức độ mở rộng: was extended northwards, a new wing was added to the east, roughly doubled in size. Overview nêu quy mô tăng và phần lõi giữ nguyên."],
        ["urb", "Đô thị hóa, phát triển khu dân cư và du lịch", "Bạn nêu được những gì mất đi, những gì xuất hiện, và overview nói vùng này phát triển hơn.", "Gọi tên quá trình bằng danh hóa và collocation tự nhiên: residential development, gave way to housing, became more built-up, at the expense of farmland. Nhóm thay đổi theo loại (nhà ở, dịch vụ, hạ tầng) thay vì theo thứ tự nhìn thấy trên hình."],
        ["road", "Giao thông và lối vào", "Bạn tả được các thay đổi về đường và lối vào bằng từ cơ bản (a new road was built, was added).", "Dùng từ vựng giao thông chính xác: a roundabout was constructed at the junction, the road was pedestrianised, access to the hospital. Chỉ nêu mục đích của thay đổi khi đề bài ghi rõ (ví dụ: để giảm tai nạn)."],
        ["zone", "Quy hoạch lại theo khu chức năng", "Bạn tả được từng khu ở từng mốc và nêu khu nào đổi chức năng.", "Tả theo khu thay vì theo công trình: the north-western section, the area formerly occupied by. Chỉ ra khu nào thu hẹp, khu nào chuyển vị trí (was relocated to) và bố cục chung của khu đất thay đổi ra sao."]
      ] }
    ],
    process: [
      { n: "Theo loại quy trình", g: [
        ["man", "Sản xuất, chế biến", "Bạn tả đủ mọi công đoạn theo đúng thứ tự, dùng hiện tại đơn bị động và từ nối trình tự (first, then, next, finally). Overview nêu số công đoạn, điểm bắt đầu và điểm kết thúc.", "Giảm từ nối đứng đầu câu: nối các bước bằng mệnh đề (once the beans have been dried, they…; …, after which…; before being packaged). Dùng động từ đúng cho từng thao tác (ground, fermented, sieved) thay cho put / make lặp lại."],
        ["rec", "Tái chế, xử lý nước và rác", "Bạn theo được đường đi chính và nói được trong overview quy trình là một chiều hay vòng lặp.", "Xử lý gọn các nhánh và vòng lặp: is fed back into, is diverted to, the remainder is…, at which point the cycle begins again. Ở mỗi bể, mỗi máy nói rõ cái gì đi vào và cái gì đi ra."],
        ["ene", "Sản xuất điện, năng lượng", "Bạn tả đủ các bước từ nguồn năng lượng đến điện năng theo đúng thứ tự.", "Thể hiện quan hệ nhân quả giữa các bước chứ không chỉ trình tự: which drives the turbine, thereby generating…, is converted into electricity, is transmitted via power lines. Gọi tên bộ phận đúng như trên hình."],
        ["mech", "Cấu tạo, vận hành và xây lắp", "Bạn tả được cả các bộ phận lẫn trình tự vận hành hoặc lắp dựng, không bỏ sót phần nào của hình.", "Tách rõ hai phần: một đoạn về cấu tạo (consists of, is fitted with, is lined with), một đoạn về trình tự. Dùng cụm vị trí chính xác (beneath, at the base of, on either side of) để người đọc hình dung được vật thể."],
        ["evo", "Tiến hóa, phát triển qua các thời kỳ", "Bạn nhận ra đây là thay đổi qua thời gian nên dùng quá khứ đơn, và tả được từng giai đoạn.", "So sánh giữa các giai đoạn thay vì tả riêng từng giai đoạn: became progressively longer, far more refined than its predecessor. Đánh dấu trình tự bằng mốc thời kỳ (initially, over the following millennia, by the final stage) bên cạnh các từ nối trình tự thông thường."],
        ["proc", "Thủ tục, lưu đồ", "Bạn tả đủ các bước và các nhánh điều kiện của lưu đồ theo đúng thứ tự.", "Diễn đạt điều kiện và nhánh rẽ tự nhiên: should the applicant fail, they must…; once the outline has been approved; provided that. Phối hợp chủ động (khi có người thực hiện) với bị động, không ép mọi câu vào bị động."]
      ] },
      { n: "Theo độ dài quy trình", g: [
        ["s1", "Ngắn · đến 7 bước", "Bài đạt đủ 150 từ mà không thêm thông tin ngoài hình.", "Ít bước nên mỗi bước cần đủ chi tiết có trên hình: thiết bị, nguyên liệu, kết quả của bước. Làm đầy câu bằng mệnh đề quan hệ và cụm chỉ mục đích, không lặp lại ý."],
        ["s2", "Vừa · 8 đến 10 bước", "Bạn tả hết các bước và chia thân bài thành hai đoạn.", "Chia hai đoạn theo hai giai đoạn có nghĩa (ví dụ: chuẩn bị nguyên liệu, rồi chế biến và đóng gói) và nói rõ điểm chia đó trong overview."],
        ["s3", "Dài · từ 11 bước", "Bạn tả hết các bước, không bỏ sót bước nào, dù bài còn dài và mỗi bước một câu.", "Gộp các bước liên tiếp vào một câu bằng mệnh đề rút gọn và after / before + V-ing (after being washed and sorted, the fruit is…), để bài vẫn gọn mà không mất bước nào."]
      ] }
    ],
    line: [
      { n: "Theo số đường", g: [
        ["l2", "Hai đường", "Bạn tả xu hướng của cả hai đường với số liệu ở mốc đầu và mốc cuối, và overview nói đường nào cao hơn.", "So sánh trực tiếp hai đường trong cùng một câu ở các mốc quan trọng: điểm giao nhau, khoảng cách rộng nhất, đỉnh và đáy. Dùng cấu trúc so sánh thay cho hai câu tả riêng."],
        ["l3", "Ba đường", "Bạn tả đủ ba đường, có số liệu minh họa, và overview nêu xu hướng chính.", "Tìm đường khác biệt (đi ngược chiều hoặc gần như đứng yên) để tả riêng; hai đường cùng hướng tả chung trong một đoạn."],
        ["l4", "Bốn đường", "Bạn nhắc đến cả bốn đường và chia thân bài thành hai đoạn.", "Chia đoạn theo một tiêu chí nói được thành lời (nhóm tăng và nhóm giảm, hoặc nhóm cao và nhóm thấp) và nêu tiêu chí đó trong overview, thay vì tả lần lượt từng đường."],
        ["l5", "Năm đường trở lên", "Mọi đường đều được nhắc đến ít nhất một lần và overview nêu được xu hướng chung.", "Chọn lọc độ sâu: tả kỹ đường cao nhất, đường thay đổi mạnh nhất và đường đi ngược xu hướng; các đường còn lại gộp trong một câu với khoảng giá trị (remained between 5% and 10%). Không bỏ hẳn đường nào."]
      ] },
      { n: "Theo khung thời gian", g: [
        ["past", "Qua nhiều năm, đã kết thúc", "Bạn dùng quá khứ đơn nhất quán và đúng giới từ (rose from … to …, by, at).", "Chia thân bài theo giai đoạn khi các đường cùng đổi hướng ở một mốc. Thêm quá khứ hoàn thành với “by + năm” và cụm danh từ (a threefold rise, a period of stability) để đổi nhịp câu."],
        ["proj", "Có dự báo tương lai", "Bạn tách được phần đã xảy ra (quá khứ đơn) và phần dự báo (will).", "Dùng ngôn ngữ dự báo với nhiều dạng: is projected to, is expected to, is forecast to reach, will have risen by 2040. Nói rõ mốc chuyển từ số liệu thật sang dự báo."],
        ["month", "Theo tháng trong một năm", "Bạn tả được biến động qua các tháng, có số liệu ở đỉnh và đáy.", "Khung thời gian ngắn nên biến động quan trọng hơn xu hướng dài: dipped, recovered, peaked in. Dùng mốc thời gian đa dạng: in the first quarter, over the following three months, by the end of the year."]
      ] },
      { n: "Theo đơn vị đo", g: [
        ["pct", "Tỉ lệ phần trăm", "Bạn dùng được the percentage of / the proportion of và dẫn đúng số liệu.", "Chính xác về đơn vị: percentage là con số, proportion / share là phần. Khi nói mức thay đổi, viết rose from 20% to 25% hoặc rose by 5 percentage points; “rose by 5%” có thể bị hiểu là tăng tương đối."],
        ["abs", "Số lượng tuyệt đối", "Bạn ghi đúng đơn vị (million, tonnes) và đúng thang đo của trục.", "Thay một phần con số bằng bội số và phân số: doubled, a threefold increase, fell by half. Chỉ dùng khi số liệu thật sự khớp; nếu chỉ gần đúng thì thêm roughly / almost."]
      ] },
      { n: "Theo đối tượng so sánh", g: "CMP" }
    ],
    bar: [
      { n: "Theo yếu tố thời gian", g: [
        ["tr", "Xu hướng qua nhiều mốc · trục ngang là thời gian", "Bạn tả được xu hướng qua các mốc bằng động từ chỉ thay đổi và thì quá khứ, không đọc từng cột.", "Viết như line graph: nhóm các hạng mục cùng hướng, nêu mốc đổi hướng, và so sánh thứ hạng ở mốc đầu với mốc cuối."],
        ["yr", "So sánh hai, ba mốc năm theo hạng mục", "Bạn so sánh được từng hạng mục giữa các năm và có số liệu.", "Nhóm các hạng mục tăng với nhau, các hạng mục giảm với nhau; nêu hạng mục thay đổi nhiều nhất và hạng mục gần như không đổi, thay vì đi lần lượt từng hạng mục."],
        ["st", "Không có thời gian · so sánh tĩnh", "Bạn không dùng rise / fall cho biểu đồ không có thời gian, và dùng được so sánh hơn, so sánh nhất.", "Ngôn ngữ so sánh đa dạng và chính xác: twice as many as, marginally higher than, by contrast, respectively. Thì theo năm của đề: có năm trong quá khứ thì dùng quá khứ đơn, đề không ghi năm thì dùng hiện tại đơn."]
      ] },
      { n: "Theo đơn vị đo", g: [
        ["pct", "Tỉ lệ phần trăm", "Bạn dẫn đúng tỉ lệ và không nhầm tỉ lệ với số lượng.", "Luân phiên the percentage of, the proportion of, the share of; dùng phân số gần đúng (just under a third, roughly one in five). Chỉ báo cáo số liệu có trên biểu đồ, không tự tính thêm tổng hay trung bình."],
        ["abs", "Số lượng tuyệt đối", "Bạn ghi đúng đơn vị và thang đo.", "So sánh bằng bội số và hiệu số: three times as many, 50 more than. Khi số đọc từ cột không chính xác thì làm tròn có đánh dấu (approximately, just over)."]
      ] },
      { n: "Theo đối tượng so sánh", g: "CMP" }
    ],
    table: [
      { n: "Theo yếu tố thời gian", g: [
        ["tr", "Có thay đổi qua các năm", "Bạn tả được thay đổi của các đối tượng qua các năm và có overview nêu xu hướng chung.", "Đọc bảng theo cả hai chiều: theo hàng để thấy xu hướng, theo cột để thấy thứ hạng ở từng năm. Overview nêu cả xu hướng chung lẫn đối tượng luôn đứng đầu hoặc đứng cuối."],
        ["st", "Không có thời gian · so sánh tĩnh", "Bạn nêu được giá trị lớn nhất, nhỏ nhất và không đọc lần lượt mọi ô của bảng.", "Chia thân bài theo cột hoặc theo nhóm đối tượng giống nhau; tìm đối tượng nổi bật ở nhiều cột cùng lúc để làm trục cho bài."]
      ] },
      { n: "Theo đơn vị đo", g: [
        ["pct", "Tỉ lệ phần trăm", "Bạn dẫn đúng tỉ lệ và nêu được tỉ lệ cao nhất, thấp nhất.", "Luân phiên the percentage of, the proportion of, the share of; dùng phân số gần đúng (just under a third, roughly one in five) để tránh lặp con số."],
        ["abs", "Số lượng tuyệt đối", "Bạn chép đúng số liệu và đơn vị.", "Bảng có số lớn và lẻ: làm tròn có đánh dấu (approximately 11.3 million, just over 200,000) và so sánh bằng bội số, thay vì chép nguyên từng con số."],
        ["mix", "Nhiều đơn vị khác nhau", "Bạn không nhầm đơn vị giữa các cột và tả được từng chỉ số.", "Tả mỗi chỉ số trong một phần riêng, rồi nêu mối liên hệ nếu số liệu cho thấy (nơi có A cao nhất không phải là nơi có B cao nhất). Không suy diễn nguyên nhân."]
      ] },
      { n: "Theo đối tượng so sánh", g: "CMP" }
    ],
    pie: [
      { n: "Theo yếu tố thời gian", g: [
        ["yr", "Các pie ứng với các mốc năm", "Bạn nêu được phần nào lớn lên, phần nào thu hẹp giữa các năm, có số liệu.", "Dùng ngôn ngữ thay đổi cho tỉ trọng: the share of X rose from … to …, X overtook Y as the largest category, accounted for a shrinking proportion."],
        ["st", "Cùng một thời điểm · so sánh hai nhóm", "Bạn so sánh được cùng một hạng mục ở các pie và không dùng động từ chỉ thay đổi.", "So sánh trong cùng một câu với cấu trúc đa dạng: whereas, compared with, the corresponding figure for. Nêu hạng mục có chênh lệch lớn nhất trước."]
      ] },
      { n: "Theo số biểu đồ", g: [
        ["p2", "Hai pie", "Bạn nhắc đến mọi hạng mục và có số liệu cho các hạng mục chính.", "Đi theo hạng mục, bắt đầu từ hạng mục lớn nhất, và so sánh hai pie trong cùng một câu. Các hạng mục nhỏ gộp vào một câu (each accounted for under 5%)."],
        ["p3", "Từ ba pie trở lên", "Bạn tả được từng pie và có overview.", "Chọn hạng mục lớn nhất và hạng mục khác biệt rõ nhất để theo qua tất cả các pie; nhóm các pie giống nhau với nhau thay vì tả lần lượt từng pie."]
      ] }
    ],
    mixed: [
      { n: "Theo cách kết hợp", g: [
        ["same", "Hai biểu đồ cùng loại", "Bạn giới thiệu và tả cả hai biểu đồ; overview có ý cho từng biểu đồ.", "Mỗi biểu đồ một đoạn thân bài, overview có một câu cho mỗi biểu đồ. Chỉ nối hai biểu đồ với nhau khi số liệu cho thấy mối liên hệ rõ ràng."],
        ["wpie", "Biểu đồ hoặc bảng đi kèm pie chart", "Bạn tả được cả phần cơ cấu (pie) lẫn phần còn lại, không bỏ sót biểu đồ nào.", "Dùng đúng ngôn ngữ cho từng phần: ngôn ngữ thay đổi cho phần có thời gian, ngôn ngữ tỉ trọng cho pie (accounted for, made up). Không ép hai phần phải liên hệ với nhau nếu số liệu không cho thấy điều đó."],
        ["wtab", "Biểu đồ đi kèm bảng", "Bạn dẫn số liệu từ cả biểu đồ lẫn bảng.", "Chọn lọc số liệu của bảng: dùng bảng để bổ sung cho điều biểu đồ cho thấy (mức thay đổi, phân nhóm), không chép lại toàn bộ bảng."]
      ] },
      { n: "Theo yếu tố thời gian", g: [
        ["tr", "Có xu hướng qua các năm", "Phần có trục thời gian được tả bằng động từ chỉ thay đổi và đúng thì.", "Viết phần đó như line graph (giai đoạn, mốc đổi hướng) và chuyển hẳn sang ngôn ngữ so sánh ở biểu đồ còn lại; hai kiểu ngôn ngữ không lẫn vào nhau."],
        ["st", "Không có thời gian · so sánh tĩnh", "Bạn dùng ngôn ngữ so sánh, không dùng động từ chỉ thay đổi.", "Xếp hạng và so sánh với cấu trúc đa dạng ở cả hai biểu đồ; overview nêu điểm nổi bật nhất của mỗi biểu đồ."]
      ] }
    ]
  };
  /* Nhóm “đối tượng so sánh” dùng chung cho line, bar, table. */
  var CMP = [
    ["place", "Giữa các quốc gia, thành phố", "Bạn so sánh được các nước với nhau và nêu nước cao nhất, thấp nhất.", "Tránh lặp tên nước: the former, the latter, the two European countries, its neighbour. Nhóm các nước có số liệu gần nhau vào một câu."],
    ["age", "Giữa các nhóm tuổi", "Bạn gọi đúng các nhóm tuổi và so sánh được giữa các nhóm.", "Đa dạng cách gọi: those aged 18–25, people in their thirties, the oldest age group, the under-30s. Nêu quy luật theo tuổi nếu số liệu cho thấy (the older the group, the lower the figure)."],
    ["sex", "Giữa nam và nữ", "Bạn so sánh được số liệu của nam và nữ ở từng hạng mục, không nhầm hai giới.", "Luân phiên men / women, males / females, the figure for women, their male counterparts. Chỉ ra hạng mục có khoảng cách giữa hai giới lớn nhất và nhỏ nhất."],
    ["cat", "Giữa các hạng mục, loại hình", "Bạn nêu được hạng mục cao nhất, thấp nhất và có số liệu minh họa.", "Xếp hạng trước rồi mới dẫn số liệu (by far the most popular, the least common), và gọi hạng mục bằng cụm danh từ chính xác thay vì chép nguyên nhãn trên biểu đồ."]
  ];
  /* Mốc band 7 và band 9 chung cho cả bài, diễn đạt lại từ bảng mô tả band điểm Writing công khai của IELTS. */
  var BANDS = {
    t1: { b7: [
      "Có một overview rõ, nêu xu hướng, khác biệt hoặc giai đoạn chính. (Các trang luyện thi lớn đều khuyên không đưa số liệu cụ thể vào overview.)",
      "Các đặc điểm chính đều được nêu và làm nổi bật, có số liệu đúng đơn vị minh họa; một vài chỗ còn có thể phát triển kỹ hơn.",
      "Thông tin sắp xếp logic, bài tiến triển rõ; dùng nhiều phương tiện liên kết, đôi chỗ còn lạm dụng hoặc thiếu.",
      "Từ vựng đủ để diễn đạt linh hoạt và khá chính xác, có vài từ ít gặp và collocation; còn đôi chỗ chọn từ chưa hợp.",
      "Dùng nhiều kiểu câu phức; câu không lỗi xuất hiện thường xuyên; còn vài lỗi ngữ pháp nhưng không gây khó hiểu."
    ], b9: "Band 9 đáp ứng trọn vẹn mọi yêu cầu của đề, liên kết kín đến mức người đọc không để ý, chia đoạn khéo, dùng từ tự nhiên và chính xác, và lỗi cực kỳ hiếm." },
    t2: { b7: [
      "Trả lời các phần chính của đề và giữ một lập trường rõ ràng từ đầu đến cuối bài.",
      "Ý chính được mở rộng và có dẫn chứng, dù đôi chỗ còn khái quát quá mức hoặc dẫn chứng chưa sát.",
      "Bố cục logic, tiến triển rõ, chia đoạn hợp lý; dùng nhiều phương tiện liên kết, đôi chỗ còn lạm dụng hoặc thiếu.",
      "Từ vựng đủ để diễn đạt linh hoạt và khá chính xác, có vài từ ít gặp và collocation; còn đôi chỗ chọn từ chưa hợp.",
      "Dùng nhiều kiểu câu phức; câu không lỗi xuất hiện thường xuyên; còn vài lỗi ngữ pháp nhưng không gây khó hiểu."
    ], b9: "Band 9 đào sâu vấn đề với lập trường được phát triển trọn vẹn, ý được mở rộng và chứng minh đầy đủ, liên kết kín đến mức người đọc không để ý, dùng từ tự nhiên và chính xác, và lỗi cực kỳ hiếm." }
  };

  var MAPTAG = {
    d1jb2VI: "in pn conv", d1WhtxZ: "in pn ext", d1xyc9W: "site three zone", d1cshqC: "in pp conv", d1qGrNA: "site three zone", d1OqYH: "town pn urb",
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
  window.B79_SUB = { dims: DIMS, bands: BANDS, classify: classify };
})();
