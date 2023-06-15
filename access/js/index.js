// open reponsive menu
let openNav = document.getElementById('openNav');
const navMenu = document.getElementById('nav__menu');
openNav.addEventListener('click', () => {
    navMenu.classList.toggle('d-block');
    if (navMenu.classList.contains('d-block')) {
        navMenu.classList.add('open-menu');
        navMenu.classList.remove('close-menu');
    } else {
        navMenu.classList.add('close-menu');
        navMenu.classList.remove('open-menu');
    }
});

// open modal
let openLogin = document.getElementById('openLogin');
let modalLogin = document.getElementById('modal-login');
let openLoginMobile = document.getElementById('openLoginMobile');
openLogin.addEventListener('click', () => {
    modalLogin.classList.add('d-flex')
});
openLoginMobile.addEventListener('click', () => {
    modalLogin.classList.add('d-flex')
})
// close modal
let closeLogin = document.getElementById('close-login');
closeLogin.addEventListener('click', () => {
    modalLogin.classList.remove('d-flex');
}
)
// modalLogin.addEventListener('click', ()=>{
//     modalLogin.classList.remove('d-flex');
// })
// display signin and sign up
let boxSignin = document.querySelector('.box-signin');
let boxSignup = document.querySelector('.box-signup');
let ipSignin = document.querySelector('.ip-signin');
let ipSignup = document.querySelector('.ip-signup');
let signinOpen = document.getElementById('signin-open');
let signupOpen = document.getElementById('signup-open');
signupOpen.addEventListener('click', () => {
    event.stopPropagation();
    boxSignin.classList.add('d-none');
    boxSignup.classList.remove('d-none');
    ipSignin.classList.add('d-none');
    ipSignup.classList.remove('d-none');
})
signinOpen.addEventListener('click', () => {
    event.stopPropagation();
    boxSignup.classList.add('d-none');
    boxSignin.classList.remove('d-none');
    ipSignup.classList.add('d-none');
    ipSignin.classList.remove('d-none');
})
// // login and log out
// localStorage.removeItem("checkLogin")
let accountManagement = document.getElementById('account');
let accountManagementMobile = document.getElementById('accountMobile');
let checkedLogin = JSON.parse(localStorage.getItem("checkLogin"))
if (checkedLogin == 1) {
    openLogin.classList.add('d-none');
    openLoginMobile.classList.add('d-none');
    accountManagement.classList.add('account-on');
    accountManagementMobile.classList.add('account-mobile-on');
}
else if (checkedLogin === null) {
    openLogin.classList.remove('d-none')
    accountManagement.classList.remove('account-on')
    openLoginMobile.classList.remove('d-none')
    accountManagementMobile.classList.remove('account-mobile-on')
}

//khai báo lớp để lưu thông tin tài khoản
class Account {
    constructor(userName, email, pass) {
        this.userName = userName;
        this.email = email;
        this.password = pass;
    }
}
class accountSave {
    constructor(userName, password) {
        this.userName = userName;
        this.password = password;
    }
}
function xuLyDangKy(event) {
    event.preventDefault();
    //lấy thông tin người dùng nhập
    let userName = document.getElementById('username-su').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password-su').value;
    let passwordCf = document.getElementById('cf-password-su').value;
    let checkAgree = document.getElementById('checkAgree').checked;
    //kiểm tra hợp lệ
    if (userName === '' || email === '' || password === '') {
        alert('Vui lòng điền đầy đủ thông tin.');
        return; // Ngăn không cho biểu mẫu được gửi đi
    }
    if (!checkAgree) {
        alert('Vui lòng đồng ý với điều khoản.');
        return;
    }
    if (!/^[a-zA-Z][a-zA-Z0-9_]{2,15}$/.test(userName)) {
        alert('Vui lòng nhập tên người dùng hợp lệ.');
        return;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        alert('Vui lòng nhập mật khẩu hợp lệ.');
        return;
    }
    if (passwordCf != password) {
        alert('Vui lòng nhập lại mật khẩu.');
        return;
    }
    //Lưu thông tin tài khoản với key "user"
    let accountList = JSON.parse(localStorage.getItem("loginUser"))
    //Trường hợp key "user" chưa tồn tại, accountList = null
    if (!accountList) {
        //tạo tài khoản mới
        let admin = new Account("admin", "admin@gmail.com", "admin");
        accountList = []
        //lưu đối tượng vào mảng
        accountList.push(admin)
        //Lưu mảng accountList vào localStorage
        localStorage.setItem("loginUser", JSON.stringify(accountList))
    }
    //trường hợp đã tồn tại tài khoản
    else {
        //kiểm tra xem username có tồn tại chưa
        const foundEmail = accountList.find((user) => user.email === email);
        const foundUser = accountList.find((user) => user.userName === userName);

        if (foundUser) {
            alert("Tài khoản đã tồn tại");
            return;
        }

        if (foundEmail) {
            alert("Email đã tồn tại");
            return;
        }

    }
    // trường hợp không trùng thì tạo tài khoản mới cho người ta
    let newUser = new Account(userName, email, password)
    //lưu thêm vào mảng 
    accountList.push(newUser)
    //lưu mảng mới vào Localstorage 
    localStorage.setItem("loginUser", JSON.stringify(accountList))
    alert('Đăng ký tài khoản thành công')
    location.href = 'index.html';
}

function xuLyDangNhap(event) {
    event.preventDefault();
    let userName = document.getElementById('username-si').value;
    let password = document.getElementById('password-si').value;
    let checkboxSave = document.getElementById('checkBoxLogin').checked;
    if (userName.trim() === "" || password.trim() === "") {
        alert('Chưa nhập user hoặc mật khẩu');
        return;
    }
    const accountList = JSON.parse(localStorage.getItem("loginUser"))
    if (accountList) {
        const found = accountList.find((user) => user.userName === userName && user.password === password);
        if (found) {
            event.preventDefault();
            let checkLogin = 1;
            localStorage.setItem("checkLogin", JSON.stringify(checkLogin))
            alert("đăng nhập thành công");
            const userNow = found.userName;
            localStorage.setItem("userNow", JSON.stringify(userNow))
            // check
            if(checkboxSave){
                let saveData = new accountSave(userName, password)
                localStorage.setItem("saveData", JSON.stringify(saveData))
            }
            else{
                localStorage.removeItem("saveData");
                document.getElementById("checkBoxLogin").checked = false;
            }
            
            // bat modal login
            modalLogin.classList.remove('d-flex')
            openLogin.classList.add('d-none');
            openLoginMobile.classList.add('d-none');
            accountManagement.classList.add('account-on');
            accountManagementMobile.classList.add('account-mobile-on');

        }
        else {
            alert("tài khoản không tồn tại")
        }
    }
    else {
        alert("tài khoản không tồn tại")
    }
}
// luu tài khoản 
const saveData = JSON.parse(localStorage.getItem("saveData"));
let userName = document.getElementById('username-si');
let password = document.getElementById('password-si');
if (saveData) {
    document.getElementById("checkBoxLogin").checked = true;
    userName.value = saveData.userName;
    password.value = saveData.password;
}
// đổ dữ liệu tên đăng nhập vào 
document.getElementById('userNow').textContent = JSON.parse(localStorage.getItem("userNow"));
document.getElementById('userNowMobile').textContent = JSON.parse(localStorage.getItem("userNow"));