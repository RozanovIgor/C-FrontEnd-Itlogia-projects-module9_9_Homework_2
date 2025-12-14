window.onload = function () {

    let fullNameValue = document.getElementsByClassName('inputs__name')[0];

    fullNameValue.onkeydown = (event) => {
        let number = parseInt(event.key);
        if (!isNaN(number)) {
            return false;
        }
    }

    let usernameValue = document.getElementsByClassName('inputs__username')[0];
    usernameValue.onkeydown = (event) => {
        let symbol = event.key;
        if (symbol === '.' || symbol === ',') {
            return false;
        }
    }

    let agreeValue = document.getElementById('inputs_agree-checkbox');
    agreeValue.onchange = (event) => {
        if (agreeValue.checked) {
            console.log('Клиент согласен');
        } else {
            console.log('Клиент не согласен')
        }

    }

    function checkSignUpFields() {
        if (!document.getElementsByClassName('inputs__name')[0].value) {
            alert('Please fill in Full Name');
            return;
        }
        if (!document.getElementsByClassName('inputs__username')[0].value) {
            alert('Please fill in Username');
            return;
        }

        if (!document.getElementsByClassName('inputs__email')[0].value) {
            alert('Please fill in E mail');
            return;
        }

        if (!document.getElementsByClassName('inputs__password')[0].value) {
            alert('Please fill in Password');
            return;
        }

        if (document.getElementsByClassName('inputs__password')[0].value !== document.getElementsByClassName('inputs__password-repeat')[0].value) {
            alert('Passwords dont match');
            return;
        }

        if (!document.getElementById('inputs_agree-checkbox').checked) {
            alert('Please agree with our terms')
            return;
        }
        document.getElementsByClassName('popup')[0].classList.remove('hidden');
    }

    function changeToLoginScreen() {
        document.getElementsByClassName('form__title')[0].innerText = 'Log in to the system'
        document.getElementsByClassName('inputs__name')[0].classList.add('hidden');
        document.getElementsByClassName('inputs__email')[0].classList.add('hidden');
        document.getElementsByClassName('inputs__password-repeat')[0].classList.add('hidden');
        document.getElementsByClassName('inputs__agree-label')[0].classList.add('hidden');
        document.getElementsByClassName('form__already')[0].classList.add('hidden');
        document.getElementsByClassName('form__submit')[0].innerText = 'Sign in'
        document.getElementsByClassName('form__submit')[0].addEventListener('click', checkSignInFields)
    }

    function checkSignInFields() {
        if (!document.getElementsByClassName('inputs__username')[0].value) {
            alert('Please fill in Username');
            return;
        }

        if (!document.getElementsByClassName('inputs__password')[0].value) {
            alert('Please fill in Password');
            return;
        }
        alert("Добро пожаловать " + document.getElementsByClassName('inputs__username')[0].value)
    }


    document.getElementsByClassName('form__submit')[0].addEventListener('click', (event)=> {
        checkSignUpFields(event);
        event.preventDefault();
    })

    document.getElementsByClassName('popup__button')[0].onclick = function () {
        document.getElementsByClassName('popup')[0].classList.add('hidden');
        document.getElementsByClassName('form__submit')[0].removeEventListener('click', checkSignUpFields)
        changeToLoginScreen();
    }

    document.getElementsByClassName('form__already')[0].addEventListener('click', (event) => {
        document.getElementsByClassName('form__submit')[0].removeEventListener('click', checkSignUpFields)
        changeToLoginScreen();
    })






}