/* Cấu hình trang. Sửa file này rồi tải lại lên GitHub là xong, không cần đụng vào index.html. */
window.B79_CONFIG = {
  /* Dán địa chỉ Web App của Google Apps Script vào đây để nhận kết quả của học sinh.
     Để trống thì trang vẫn chạy, nhưng tiến độ chỉ lưu trên máy của từng học sinh. */
  endpoint: "",

  /* HAI CHẾ ĐỘ CHẤM BÀI
     Miễn phí: bộ phân tích tự động, luôn bật cho mọi học sinh.
     Trả phí: trợ lý AI chấm riêng từng bài, chỉ mở cho học sinh đã được giáo viên cấp mã kích hoạt.
     Phí công bố trên nút yêu cầu = aiCostPerEssayVND × markup. */
  paid: {
    enabled: true,                    // false = ẩn hẳn chế độ trả phí
    email: "duyenvth@hanu.edu.vn",    // nơi nhận yêu cầu bật trả phí
    aiCostPerEssayVND: 2000,          // chi phí trợ lý AI cho MỘT bài (ước tính ban đầu; xem số thực tế ở teacher.html rồi sửa lại)
    markup: 2,                        // phí học sinh trả = gấp 2 lần chi phí AI
    usdToVnd: 26000,                  // tỉ giá dùng để quy đổi chi phí thực tế ở trang giáo viên
    packs: [5, 10, 20],               // các gói số bài học sinh có thể chọn
    payNote: ""                       // ví dụ: thông tin chuyển khoản; để trống thì giáo viên trả lời qua email
  },

  /* Khung giờ mục tiêu cho chặng band 7 lên band 9, và số tuần của khóa. */
  targetHours: 200,
  weeks: 20,

  /* Danh sách lớp để học sinh chọn. Để [] thì học sinh tự gõ tên lớp. */
  classes: []
};
