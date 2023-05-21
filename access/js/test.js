// const nodemailer = require('nodemailer');

// // Tạo số ngẫu nhiên
// const randomNum = Math.floor(Math.random() * 1000); // Số ngẫu nhiên từ 0 đến 999

// // Thiết lập thông tin tài khoản Gmail để gửi email
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'your-email@gmail.com', // Địa chỉ email của bạn
//     pass: 'your-password' // Mật khẩu email của bạn
//   }
// });

// // Cấu hình email để gửi
// const mailOptions = {
//   from: 'your-email@gmail.com', // Địa chỉ email nguồn
//   to: 'recipient-email@example.com', // Địa chỉ email người nhận
//   subject: 'Số ngẫu nhiên', // Tiêu đề email
//   text: `Số ngẫu nhiên của bạn là: ${randomNum}` // Nội dung email
// };

// // Gửi email
// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
let accountLogout = document.getElementById('accountLogout');
console.log(accountLogout)
accountLogout.addEventListener('click', () => {
    localStorage.removeItem("checkLogin");
})