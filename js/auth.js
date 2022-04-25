const $email = document.querySelector('.emailInput')
const $password = document.querySelector('.passwordInput')
const $register = document.querySelector('.register')
const $eye = document.querySelector('.eye')


$register.addEventListener('click', e => {
  e.preventDefault()

  if($email.value == 'admin' && $password.value == 'admin'){
    alert('Добро пожаловать!')
    setTimeout(() => {
      window.open('./index.html' , '_self')
    }, 1000)
  }else{
    alert('Проваливай!')
  }
})

$eye.addEventListener('click', () => {
	if ($password.getAttribute('type') == 'password') {
		$password.setAttribute('type', 'text');
	} else {
		$password.setAttribute('type', 'password');
	}
	return false;
})