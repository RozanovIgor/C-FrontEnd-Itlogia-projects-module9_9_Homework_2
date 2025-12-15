window.onload = function () {

    // блок переменных

    let fullNameValue = document.getElementById('inputs__name');
    let usernameValue = document.getElementById('inputs__username');
    let emailValue = document.getElementById('inputs__email')
    let agreeValue = document.getElementById('inputs_agree-checkbox');
    let inputsValue = document.querySelectorAll('input');
    let formButton = document.getElementById('form__submit');
    let passwordValue = document.getElementById('inputs__password');
    let popup = document.getElementById('popup');
    let circles = document.getElementsByClassName('circle');
    let formLink = document.getElementById('form__already')
    let hideElements = document.getElementsByClassName('hide');

    let curtain = document.getElementById('curtain');


//=========================================================


    const form = document.getElementById('form');

// function showError (elem, errorText) {
//     const errorSpan = elem.querySelectorAll('.input_error')
//     elem.classList.add('error');
//     errorSpan.textContent = errorText;
// }
//
// function hideError (elem) {
//     elem.classList.remove('error');
//
// }
//
// function validate(elem) {
//  const input = elem.querySelectorAll('input')
//     if (!input.value.trim()) {
//         const text = `Field ${elem.textContent} is mandatory`
//         showError(elem, text)
//         return true;
//     }
// }

//
// function submitSign () {
//     const listElements = form.querySelectorAll('label');
//     for (let elem of listElements) {
//         if (validate(elem)) {
// break
//
//         }
//         showPopUp();
//
//     }
// }

    //+====================================================

    function findLabelForControl(el) {
        let idVal = el.id;
        labels = document.getElementsByTagName('label');
        for (var i = 0; i < labels.length; i++) {
            if (labels[i].htmlFor == idVal)
                return labels[i];
        }
    }

// функция проверки вввода данных в поле для подсказки использует label
    function checkSignUpInputs() {
        for (let elem of inputsValue) {
            if (!elem.value) {
                alert('Please enter your ' + findLabelForControl(elem.innerText));
                return
            }
        }
        if (!/^\w+$/.exec(usernameValue.value)) {
            usernameValue.style.border = '2px solid red';
            document.getElementById('inputs__username-error').classList.remove('hidden');
            return
        } else {
            usernameValue.style.border = 'unset';
            document.getElementById('inputs__username-error').classList.add('hidden');
        }


        if (!/^[A-Za-z\s]+$/g.exec(fullNameValue.value)) {
            fullNameValue.style.border = '2px solid red';
            document.getElementById('inputs__name-error').classList.remove('hidden');
            return
        } else {
            fullNameValue.style.border = 'unset';
            document.getElementById('inputs__name-error').classList.add('hidden');
        }

        if (!/\S+@\S+\.\S+/.exec(emailValue.value)) {
            emailValue.style.border = '2px solid red';
            document.getElementById('inputs__email-error').classList.remove('hidden');
            return
        } else {
            emailValue.style.border = 'unset';
            document.getElementById('inputs__email-error').classList.add('hidden');
        }

        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.exec(passwordValue.value)) {
            passwordValue.style.border = '2px solid red';
            document.getElementById('inputs__password-error').classList.remove('hidden');
            return
        } else {
            passwordValue.style.border = 'unset';
            document.getElementById('inputs__password-error').classList.add('hidden')
        }


        if (passwordValue.value !== document.getElementById('inputs__password-repeat').value) {
            alert('Passwords dont match');
            return;
        }
        if (!document.getElementById('inputs_agree-checkbox').checked) {
            document.getElementById('inputs_agree').classList.remove('hidden');
            return;

        } else {
            document.getElementById('inputs_agree').classList.add('hidden');
        }

        if (passwordValue.value.length < 8) {
            alert('Password must be at least 8 symbols')
            return;
        }
        return true;
    }

    function showPopUp() {
        popup.classList.remove('hidden');
        curtain.classList.remove('hidden');
    }

    function showCheckPopUp() {
        document.getElementById('input_check-popup').classList.remove('hidden');
        document.getElementById('input_check-popup__button').addEventListener('click', () => {
            document.getElementById('input_check-popup').classList.add('hidden')
        })


    }


    function changeToSignIn() {
        form.reset();
        for (let elem of hideElements) {
            elem.classList.add('hidden');
        }
        document.getElementById('form__title').innerText = 'Log in to the system';
        formButton.innerText = 'Sign In'
        formLink.innerText = "Don't have account yet";
    }

// функция перехода к форме ргеистрации

    function changeToSignUp() {
        form.reset();
        for (let elem of hideElements) {
            elem.classList.remove('hidden');
        }
        document.getElementById('form__title').innerText = 'Get your free account';
        formButton.innerText = 'Sign Up'
        formLink.innerText = "Already have an account?";
    }

    // функция перехода в Личный кабинет

    function changeToAccount(username) {

    }


    // функция проверки значения на форме логина

    function checkSignInInputs() {
        if (!usernameValue.value) {
            document.getElementById('inputs__username-error').innerText = 'Please fill in username';
            document.getElementById('inputs__username-error').classList.remove('hidden');
            usernameValue.style.border = '2px solid red';
            return;
        }
        if (!passwordValue.value) {
            document.getElementById('inputs__password-error').innerText = 'Please fill in password';
            document.getElementById('inputs__password-error').classList.remove('hidden');
            passwordValue.style.border = '2px solid red';
            return;
        }
        console.log('ls contains')
        console.log(localStorage.getItem('clients'))
        let usersDataBase = localStorage.getItem('clients');

        let userDataBaseArray = JSON.parse(usersDataBase);
        userDataBaseArray.forEach((item) => {
            if (usernameValue.value === JSON.parse(item).username && passwordValue.value === JSON.parse(item).password) {
                console.log('user exist');
                document.getElementById('form__title').innerText = "Welcome " + usernameValue.value;
                document.getElementById('form__subtitle').classList.add('hidden');
                // usernameValue.classList.add('hidden');
                // passwordValue.classList.add('hidden');
                // const labels = document.getElementsByTagName('label');
                // labels.forEach(label => {
                //     label.classList.add('hidden')
                // });
                document.getElementById('username_label').classList.add('hidden');
                document.getElementById('password_label').classList.add('hidden');
                document.getElementById('agree_label').style.display = 'hidden'
                document.getElementById('agree_label').classList.add('hidden');

                formButton.innerText = "Exit"
                formButton.addEventListener('click', (event) => {
                        changeToSignUp()
                    }
                )
                return;

            } else {
                if (usernameValue.value === JSON.parse(item).username) {
                    passwordValue.style.border = '2px solid red';
                    document.getElementById('inputs__password-error').innerText = 'Incorrect password';
                    document.getElementById('inputs__password-error').classList.remove('hidden');

                }
                if (passwordValue.value === JSON.parse(item).password) {
                    usernameValue.style.border = '2px solid red';
                    document.getElementById('inputs__username-error').innerText = 'No such user';
                    document.getElementById('inputs__username-error').classList.remove('hidden');

                }

                //
                // passwordValue.style.border = '2px solid red';
                // usernameValue.style.border = '2px solid red';

            }
        })


    }


    fullNameValue.onkeydown = (event) => {
        let number = parseInt(event.key);
        if (!isNaN(number)) {
            return false;
        }
    }

    usernameValue.onkeydown = (event) => {
        let symbol = event.key;
        if (symbol === '.' || symbol === ',') {
            return false;
        }
    }

    agreeValue.onchange = (event) => {
        if (agreeValue.checked) {
            // console.log('Клиент согласен');
        } else {
            // console.log('Клиент не согласен')
        }
    }


// по клику запускает проверку на ввод полей значений

    formButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (formButton.innerText === 'Sign Up') {
            if (checkSignUpInputs()) {
                showPopUp();
                const userData = new FormData(form);
                let userDataObj = (Object.fromEntries(userData.entries()));
                // console.log(userDataObj);
                let clients = localStorage.getItem('clients');
                if (!clients) {
                    // console.log('local storage is empty')
                    let clientsArray = []
                    clientsArray.push(JSON.stringify(userDataObj))
                    console.log(clientsArray)
                    localStorage.setItem('clients', JSON.stringify(clientsArray))
                } else {
                    let clientsArray = JSON.parse(clients);
                    console.log(clientsArray);
                    clientsArray.push(JSON.stringify(userDataObj));
                    localStorage.setItem('clients', JSON.stringify(clientsArray));
                }
            }
        } else {
            checkSignInInputs()
        }
    })

    document.getElementById('popup__button').addEventListener('click', (event) => {
        popup.classList.add('hidden');
        curtain.classList.add('hidden')
        changeToSignIn();
    })

    formLink.addEventListener('click', (event) => {
        if (formLink.innerText === 'Already have an account?') {
            changeToSignIn();
        } else {
            changeToSignUp();
        }
    })


    formButton.addEventListener('mouseenter', (e) => {
        for (i = 0; i < circles.length; i++) {
            circles[i].classList.add('img__animated')
        }
    })

    formButton.addEventListener('mouseout', (e) => {
        for (i = 0; i < circles.length; i++) {
            circles[i].classList.remove('img__animated')
        }
    })


}