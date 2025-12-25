window.onload = function () {

    const usernameValue = document.getElementById('inputs__username');
    const inputsValue = document.querySelectorAll('input');
    const formButton = document.getElementById('form__submit');
    const passwordValue = document.getElementById('inputs__password');
    const popup = document.getElementById('popup');
    const circles = document.getElementsByClassName('circle');
    const formLink = document.getElementById('form__already')
    const hideElements = document.getElementsByClassName('hide');
    const curtain = document.getElementById('curtain');
    const formTitle = document.getElementById('form__title');
    const regexpArray = [
        /^\w+$/,
        /^[A-Za-z\s]+$/g,
        /\S+@\S+\.\S+/,
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
    ]

    function validateRegexp(regexps, values) {
        let check = 0;
        for (i = 0; i < regexps.length; i++) {
            if (!regexps[i].exec(values[i].value)) {
                // console.log(values[i].nextElementSibling);
                values[i].nextElementSibling.classList.remove('hidden');
                check += 1
            }
            console.log(check)
            if (!(values[3].value === values[4].value)) {
                check += 1
                values[4].nextElementSibling.classList.remove('hidden')
            }
        }
        return check
    }


    function checkSignInInputs() {
        let usersDataBase = localStorage.getItem('clients');
        let userDataBaseArray = JSON.parse(usersDataBase);
        userDataBaseArray.forEach((item) => {
            if (usernameValue.value === JSON.parse(item).username && passwordValue.value === JSON.parse(item).password) {
                console.log('user exist');
                changeToWelcome(usernameValue.value);
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
            }
            // !!!!!!!!!!!!! тут сделать уведомления о том что пароль или пользователь не существуют
        })
    }

    function showPopUp() {
        popup.classList.remove('hidden');
        curtain.classList.remove('hidden');
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

    function changeToSignUp() {
        form.reset();
        // location.reload();
        for (let elem of hideElements) {
            elem.classList.remove('hidden');
        }
        document.getElementById('form__title').innerText = 'Get your free account';
        formButton.innerText = 'Sign Up'
        formLink.innerText = "Already have an account?";
    }

    function changeToWelcome(username) {
        formTitle.innerText = `Welcome ${username}!`;
        document.querySelectorAll('label').forEach((elem) => {
            elem.classList.add('hidden');
        })

        formButton.innerText = "Exit"
        formButton.addEventListener('click', (event) => {
            location.reload();
        })
    }

// блок слушателей событий

    // событие по Submit кнопке - запускает проверку на regexp и совпадение паролей
    formButton.addEventListener('click', (event) => {
        event.preventDefault();
        for (let elem of inputsValue) {
            elem.nextElementSibling.classList.add('hidden') //убираем все алерты к полям если были ранее
        }
        if (formButton.innerText === 'Sign Up') {
            if (validateRegexp(regexpArray, inputsValue) === 0) {

                const userData = new FormData(form);
                let userDataObj = (Object.fromEntries(userData.entries()));

                if (!clients) {

                    let clientsArray = []
                    clientsArray.push(JSON.stringify(userDataObj))
                    localStorage.setItem('clients', JSON.stringify(clientsArray))
                    showPopUp();
                } else {
                    let clients = localStorage.getItem('clients');
                    let clientsArray = JSON.parse(clients);
                    for  (let i = 0; i < clientsArray.length; i++) {
                        if (clientsArray[i].username === userDataObj.username) {
                            console.log('user exist')
                            changeToSignIn();
                            /// почему то цикл не находит пользователя в базе

                        }
                    }
                    clientsArray.push(JSON.stringify(userDataObj));
                    localStorage.setItem('clients', JSON.stringify(clientsArray));
                    console.log('clientsArray', clientsArray);

                }
            }

        } else {
            checkSignInInputs()
        }
    })


    // клик на ссылку - в зависимости от текста ссылки происхдит переход в форме регистрации или входа

    formLink.addEventListener('click', (event) => {
        if (formLink.innerText === 'Already have an account?') {
            changeToSignIn();
        } else {
            changeToSignUp();
        }
    })

    // тут просто слушатель для вход на кнопку мышкой чтобы запустить аниманцию - сделал для оживления страницы

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

    document.getElementById('popup__button').addEventListener('click', (event) => {
        popup.classList.add('hidden');
        curtain.classList.add('hidden')
        changeToSignIn();
    })


}