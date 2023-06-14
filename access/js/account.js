
let accountLogout = document.getElementById('accountLogout');
accountLogout.addEventListener('click', () => {
    localStorage.removeItem("checkLogin");
    location.href = 'index.html'
})
// đổ thông tin vào trang account 
let userNow = document.getElementById('username-info');
let emailNow = document.getElementById('email-info');
let passwordNow = document.getElementById('password-info');

const userLogin = JSON.parse(localStorage.getItem("userNow"));
const accountList = JSON.parse(localStorage.getItem("loginUser"));
const foundUser = accountList.find((user) => user.userName === userLogin);

if (foundUser) {
 
    // Thực hiện các tác vụ với thông tin của người dùng đã tìm thấy
    userNow.value = foundUser.userName;
    emailNow.value = foundUser.email;
    console.log(foundUser.userName)
    passwordNow.value = foundUser.password;
} else {
    alert("Người dùng không tồn tại");
}