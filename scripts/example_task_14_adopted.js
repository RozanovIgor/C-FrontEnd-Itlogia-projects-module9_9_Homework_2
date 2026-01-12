window.onload = function () {

    document.getElementById('inputs__name').onkeydown = (event) => {
        if (!isNaN(parseInt(event.key))) {
            return false;
        }
    }

    document.getElementById('inputs__username').onkeydown = (event) => {
        if (event.key === '.' || event.key === ',') {
            return false;
        }
    }

    document.getElementById('inputs_agree-checkbox').onchange = (event) => {
        event.target.checked ?
            console.log('Согласен') :
            console.log('Не согласен');
    }

    const form = document.querySelector('form');
    const signUpInputs = document.querySelectorAll('input');
    const formFieldErrors = document.querySelectorAll('.input_error');
    const popup = document.getElementById('popup');
    const link = document.getElementById('form__already');
    const title = document.getElementById('form__title');
    const button = document.getElementById('form__submit');
    const usernameValue = document.getElementById('inputs__username');
    const passwordValue = document.getElementById('inputs__password');


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
    form.onsubmit = function (e) {
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
            popup.classList.remove('hidden');
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
            elem.classList.add('hidden');
            elem.previousElementSibling.style.borderBottomColor = '#C6C6C4';
        });
    }

    // Проверка на существование значения в текстовом поле
    function isEmptyInputValue(input) {
        input.nextElementSibling.innerText = '';
        input.nextElementSibling.style.display = 'none';
        if (!input.value) {
            input.nextElementSibling.innerText = 'Заполните поле ' + input.previousSibling.data.trim();
            input.nextElementSibling.style.display = 'block';
            input.style.borderBottomColor = 'red';
            hasError = true;
            return true;
        }
    }

    // Проверка значений полей на соответствие регулярным выражениям
    function isInvalidInputValue(input, inputRegExp, errorText) {
        if (!input.value.match(inputRegExp)) {
            input.nextElementSibling.innerText = errorText;
            input.nextElementSibling.classList.remove('hidden');
            hasError = true;
        }
    }

    // Пароль должен содержать не менее 8 символов
    function isPasswordLengthInvalid(passwordInput, minPasswordLength, errorText) {
        if (passwordInput.value.length < minPasswordLength) {
            passwordInput.nextElementSibling.innerText = errorText;
            passwordInput.nextElementSibling.style.display = 'block';
            hasError = true;
        }
    }

    // Проверка на совпадение пароля
    function arePasswordsDifferent(PasswordInputValue, repeatPasswordInput, errorText) {
        if (repeatPasswordInput.value !== PasswordInputValue) {
            repeatPasswordInput.nextElementSibling.innerText = errorText;
            repeatPasswordInput.nextElementSibling.style.display = 'block';
            hasError = true;
        }
    }

    // Проверка на чекбокс - тут пришлось костылить тк где то сбрасываются все сообщения об ошибке и обнуляется текст внутри тега small
    function isUserAgreed(checkbox) {
        // console.log(checkbox);
        // console.log(checkbox.nextElementSibling);
        checkbox.nextElementSibling.classList.add('hidden');
        if (!checkbox.checked) {
            checkbox.nextElementSibling.classList.remove('hidden');
            checkbox.nextElementSibling.style.display = 'block';
            checkbox.nextElementSibling.innerText = 'You must agree with our terms'
            hasError = true;
        }
    }

    // Обработчик события клика на ОК в попапе
    document.getElementById('popup__button').onclick = () => {
        popup.classList.add('hidden');
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
            if (input.id === 'inputs__username' || input.id === 'inputs__password') {
                continue;
            }
            input.parentElement.style.display = 'none'; // Блоки с полями "Full Name", "E-mail", "Repeat Password", блок с чекбоксом удалить
        }

        button.innerText = 'Sign in'; // Текст в кнопке заменить на «Sign In»
        title.scrollIntoView({behavior: "smooth"});

        link.innerText = 'Registration'; // Не надо удалять ссылку «Already have an account?», вместо этого нужно заменить на ней текст на «Registration»
        link.onmousedown = () => { // Заменить слушатель на ссылке «Registration»
            window.location.reload(); // При нажатии на ссылку «Registration» страница должна просто перезагружаться
        };

        form.onsubmit = ((e) => {// Заменить слушатель события для кнопки «Sign In»


            e.preventDefault();

            removeFormFieldErrors();
            hasError = false;

            const signInInputs = document.getElementsByTagName('input');
            for (let elem of signInInputs) {
                if (isEmptyInputValue(elem)) { // Проверьте на существование значения в каждом текстовом поле
                    elem.parentElement.style.borderBottomColor = 'red';
                }
            }

            if (hasError) { // Если оба поля заполнены
                let validationResult = findUserAndPassword('clients', usernameValue.value, passwordValue.value)


                if (validationResult[0] === true && validationResult[1] === true) {

                    moveToPersonalAccount(validationResult[2]);
                } else {
                    if (validationResult[1] === false) {
                        passwordValue.style.border = '2px solid red';
                        document.getElementById('inputs__password-error').innerText = 'Incorrect password';
                        document.getElementById('inputs__password-error').classList.remove('hidden');
                        document.getElementById('inputs__password-error').style.display = 'block';

                    }
                    if (validationResult[0] === false) {
                        usernameValue.style.border = '2px solid red';
                        document.getElementById('inputs__username-error').innerText = 'No such user';
                        document.getElementById('inputs__username-error').classList.remove('hidden');
                        document.getElementById('inputs__username-error').style.display = 'block';
                    }
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
        document.querySelectorAll('label').forEach((elem) => {
            elem.classList.add('hidden');
        })
        document.getElementById('form__subtitle').classList.add('hidden');
        link.classList.add('hidden');

        form.appendChild(button.parentElement);
    }

    function findUserAndPassword(LSitem, userName, password) { // принимает ключ LocalStorage возвращает итоги проверки на username и password и объект user если проверка прошла

        let userExists = false;
        let passwordCorrect = false;
        let validationResult = [];
        let clientsArray = JSON.parse(localStorage.getItem(LSitem));
        const user = clientsArray.find((client) => client.userName === userName);

        if (user) {
            userExists = true;
            validationResult.push(userExists);
            if (user.password === password) {
                passwordCorrect = true;
                validationResult.push(passwordCorrect);
            } else {
                validationResult.push(passwordCorrect);
            }
        } else {
            validationResult.push(userExists);
        }
        validationResult.push(user); // добавляем объект с данными пользователя для дальнейшего использования
        return validationResult;
    }
}