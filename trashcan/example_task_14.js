window.onload = function() {

    document.getElementById('name').onkeydown = (event) => {
        if (!isNaN(parseInt(event.key))) {
            return false;
        }
    }

    document.getElementById('username').onkeydown = (event) => {
        if (event.key === '.' || event.key === ',') {
            return false;
        }
    }

    document.getElementById('agreement').onchange = (event) => {
        event.target.checked ?
            console.log('Согласен') :
            console.log('Не согласен');
    }

    const form = document.querySelector('form');
    const signUpInputs = document.querySelectorAll('input');
    const formFieldErrors = document.querySelectorAll('.form__input-error');
    const popup = document.getElementById('popup');
    const link = document.getElementById('form__link');
    const title = document.getElementById('main__title');
    const button = document.getElementById('submit');



    // 1 страница: Регистрация

    const inputsValidation = {
        fullName: {
            regExp: /^[а-яa-z\s]*$/i,
            errorText: 'Full Name может содержать только буквы и пробел'
        },
        yourUserName: {
            regExp: /^[а-я\w-]*$/i,
            errorText: 'Your username может содержать только буквы, цифры, символ подчеркивания и тире'
        },
        email: {
            regExp: /^[^@\s]+@[^@\s]+\.[^@\s]+$/i,
            errorText: 'В e-mail допускается один символ @ и любые другие символы, кроме пробелов.'
        },
        password: {
            regExp: /(?=.*[A-Z])(?=.*\d)(?=.*[-\(\)\.,:;\?!\*\+%<>@\[\]{}\/\\_\{\}\$#])/,
            errorText: 'Пароль должен содержать не менее 8 символов, включая хотя бы одну заглавную букву, хотя бы одну цифру и хотя бы один из следующих спецсимволов: ( . , : ; ? ! * + % - < > @ [ ] { } / \\ _ { } $ # )',
            minLength: 8
        },
        repeatPassword: {
            errorText: 'Пароли не совпадают'
        }
    }

    let hasError;

    // Обработчик отправки формы
    form.onsubmit = function(e) {
        e.preventDefault();
        removeFormFieldErrors();
        hasError = false;
        let password = '';
        signUpInputs.forEach((item) => {
            if (isEmptyInputValue(item)) {
                return;
            }
            switch (item.previousSibling.nodeValue.trim()) {
                case 'Full Name':
                    isInvalidInputValue(item, inputsValidation.fullName.regExp, inputsValidation.fullName.errorText);
                    break;
                case 'Your username':
                    isInvalidInputValue(item, inputsValidation.yourUserName.regExp, inputsValidation.yourUserName.errorText);
                    break;
                case 'E-mail':
                    isInvalidInputValue(item, inputsValidation.email.regExp, inputsValidation.email.errorText);
                    break;
                case 'Password':
                    isInvalidInputValue(item, inputsValidation.password.regExp, inputsValidation.password.errorText);
                    isPasswordLengthInvalid(item, inputsValidation.password.minLength, inputsValidation.password.errorText);
                    password = item.value;
                    break;
                case 'Repeat Password':
                    arePasswordsDifferent(password, item, inputsValidation.repeatPassword.errorText);
                    break;
                default:
                    isUserAgreed(item);
            }
        });
        if (!hasError) {
            popup.classList.add('popup-visible');
            let newClient = {
                fullName: signUpInputs[0].value,
                userName: signUpInputs[1].value,
                email: signUpInputs[2].value,
                password: signUpInputs[3].value,
            }
            let clients = [];
            let localStorageClients = localStorage.getItem('clients');
            if (localStorageClients) {
                clients = JSON.parse(localStorageClients);
            }
            clients.push(newClient);
            localStorage.setItem('clients', JSON.stringify(clients));
            form.reset();
        }
    }

    // Очистка ошибок перед валидацией формы
    function removeFormFieldErrors() {
        formFieldErrors.forEach((elem) => {
            elem.style.display = 'none';
            elem.previousElementSibling.style.borderBottomColor = '#C6C6C4';
        });
    }

    // Проверка на существование значения в текстовом поле
    function isEmptyInputValue(input) {
        if (!input.value) {
            input.parentElement.nextElementSibling.innerText = 'Заполните поле ' + input.previousSibling.data.trim();
            input.parentElement.nextElementSibling.style.display = 'block';
            input.style.borderBottomColor = 'red';
            hasError = true;
            return true;
        }
    }

    // Проверка значений полей на соответствие регулярным выражениям
    function isInvalidInputValue(input, inputRegExp, errorText) {
        if (!input.value.match(inputRegExp)) {
            input.parentElement.nextElementSibling.innerText = errorText;
            input.parentElement.nextElementSibling.style.display = 'block';
            hasError = true;
        }
    }

    // Пароль должен содержать не менее 8 символов
    function isPasswordLengthInvalid(passwordInput, minPasswordLength, errorText) {
        if (passwordInput.value.length < minPasswordLength) {
            passwordInput.parentElement.nextElementSibling.innerText = errorText;
            passwordInput.parentElement.nextElementSibling.style.display = 'block';
            hasError = true;
        }
    }

    // Проверка на совпадение пароля
    function arePasswordsDifferent(PasswordInputValue, repeatPasswordInput, errorText) {
        if (repeatPasswordInput.value !== PasswordInputValue) {
            repeatPasswordInput.parentElement.nextElementSibling.innerText = errorText;
            repeatPasswordInput.parentElement.nextElementSibling.style.display = 'block';
            hasError = true;
        }
    }

    // Проверка на чекбокс
    function isUserAgreed(checkbox) {
        if (!checkbox.checked) {
            checkbox.parentElement.nextElementSibling.style.display = 'block';
            hasError = true;
        }
    }

    // Обработчик события клика на ОК в попапе
    document.getElementById('popup-button').onclick = () => {
        popup.classList.remove('popup-visible');
        form.reset();
        moveToLogin();
    }



    // 2 страница: Страница входа

    // Обработчик события клика на ссылку «Already have an account?»
    link.onmousedown = () => {     // Реализация имитации перехода на страницу логина
        moveToLogin();
    };

    // Реализовать имитацию перехода на страницу логина
    function moveToLogin() {
        title.innerText = 'Log in to the system'; // Текст "Get your free account" заменить на "Log in to the system"

        for (let input of signUpInputs) {
            if (input.previousSibling.nodeValue.trim() === 'Your username' || input.previousSibling.nodeValue.trim() === 'Password') {
                continue;
            }
            input.parentElement.parentElement.remove(); // Блоки с полями "Full Name", "E-mail", "Repeat Password", блок с чекбоксом удалить
        }

        button.innerText = 'Sign in'; // Текст в кнопке заменить на «Sign In»
        title.scrollIntoView({behavior: "smooth"});

        link.innerText = 'Registration'; // Не надо удалять ссылку «Already have an account?», вместо этого нужно заменить на ней текст на «Registration»
        link.onmousedown = () => { // Заменить слушатель на ссылке «Registration»
            window.location.reload(); // При нажатии на ссылку «Registration» страница должна просто перезагружаться
        };

        form.onsubmit = ((e) => { // Заменить слушатель события для кнопки «Sign In»
            e.preventDefault();

            removeFormFieldErrors();
            hasError = false;

            const signInInputs = document.getElementsByTagName('input');
            for (let elem of signInInputs) {
                if (isEmptyInputValue(elem)) { // Проверьте на существование значения в каждом текстовом поле
                    elem.parentElement.style.borderBottomColor = 'red';
                }
            }

            if (!hasError) { // Если оба поля заполнены
                let clients = localStorage.getItem('clients');
                let userNameIndex = clients.indexOf(`"userName":"${signInInputs[0].value}"`); // проверять, если ли пользователь с таким логином в массиве clients в Local Storage

                if (~userNameIndex) {
                    signInInputs[0].parentElement.style.borderBottomColor = '#C6C6C4';
                    let client = JSON.parse(clients.slice(clients.lastIndexOf('{', userNameIndex), clients.indexOf('}', userNameIndex) + 1));

                    if (client.password === signInInputs[1].value) { // если пользователь найден и пароль введен верно
                        signInInputs[1].parentElement.style.borderBottomColor = '#C6C6C4';
                        moveToPersonalAccount(client); // имитация перехода в личный кабинет
                    } else {
                        showSignInError(signInInputs[1], 'Неверный пароль');
                    }
                } else {
                    showSignInError(signInInputs[0], 'Такой пользователь не зарегистрирован');
                }

            }

        });
        form.reset();
    }

    // Функция отображения ошибки в форме логина (если пользователь не найден, если пароль не совпадает)
    function showSignInError(input, textError) {
        input.parentElement.style.borderBottomColor = 'red';
        input.parentElement.nextElementSibling.innerText = textError;
        input.parentElement.nextElementSibling.style.display = 'block';
    }



    // 3 страница: Личный кабинет

    // Имитация перехода в личный кабинет
    function moveToPersonalAccount(clientData) {
        title.innerText = `Welcome, ${clientData.fullName}!`; // Текст заголовка необходимо заменить на "Welcome, name!", где name - это full name
        button.innerText = 'Exit'; // Текст в кнопке «Sign In» заменить на «Exit»
        form.onclick = () => {
            window.location.reload();
        }
        form.previousElementSibling.remove(); // Текст под заголовкой удалить
        form.innerHTML = ''; // поля Username и Password, ссылку "Registration" удалить
        form.appendChild(button.parentElement);
    }
}