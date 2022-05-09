function authHandler() {
  const farmName = sessionStorage.getItem('farmName');
  console.log(farmName);
  const loginBar = document.getElementById('loginBar');
  let isLogin, isForm, isProfile = '';
  if (window.location.href.includes('form.html')) {
    isForm = ' active';
  } else if (window.location.href.includes('profile')) {
    isProfile = ' active';
  } else if (window.location.href.includes('login')) {
    isLogin = ' active';
  }

  if (farmName == null | farmName == '') {


    loginBar.innerHTML = `
    <li class="nav-item${isForm}">
      <a class="nav-link" href="../form/form.html" style="padding-left: 12px;padding-right: 12px;"><i class="fa fa-fw fa-file-text"></i> Register Your Local Farm Today </a>
    </li>
    <li class="nav-item${isLogin}">
      <a class="nav-link" href="../login/index.html" style="padding-left: 12px;padding-right: 12px;"><i class="fa fa-fw fa-user"></i> Login </a>
    </li>`
  } else {
    loginBar.innerHTML = `
    <li class="nav-item${isProfile}">
      <a class="nav-link" href="../profile/index.html" style="padding-left: 12px;padding-right: 12px;"><i class="fa fa-fw fa-user"></i> Profile </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="../user/logout" style="padding-left: 12px;padding-right: 12px;"> Logout </a>
    </li>`;
  }
}


window.addEventListener('load', authHandler);