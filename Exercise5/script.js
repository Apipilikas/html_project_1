window.onload = validate;

function validate() {

    //get elements to use by their ID
    const form = document.getElementById('form');
    const password1 = document.getElementById('password_txt');
    const password2 = document.getElementById('password2_txt');
    const username = document.getElementById('username_txt');
    const card = document.getElementById('card_txt');
    const firstname = document.getElementById('firstname_txt');
    const lastname = document.getElementById('lastname_txt');
    const email = document.getElementById('email_txt');
    const address = document.getElementById('address_txt');
    const birth_date = document.getElementById('birth_txt');
    const country = document.getElementById('country_txt');
    const telephone = document.getElementById('telephone_txt');
    const cvv = document.getElementById('cvv_txt');
    const card_email = document.getElementById('card_email_txt');
    const card_date = document.getElementById('card_date_txt');

    form.addEventListener('submit', function (e) {

        // prevent the form from submitting
        e.preventDefault();

        //validate every input on the form
        let isPasswordValid = confirmPassword();
        let isConfirmPasswordValid = confirmSecondPassword();
        let isCUsernameValid = confirmUsername();
        let isCardValid = confirmCardNumber();
        let isCvvValid = confirmCVV();
        let isEmailValid = confirmEmail();
        let isCardEmailValid = confirmCardEmail();
        let isPhoneNumberValid = confirmPhoneNumber();
        let isRestValid = blankConfirmRest();

        //only if all inputs are valid -> submit
        if (isConfirmPasswordValid && isCUsernameValid && isCardValid && isCvvValid && isEmailValid && isCardEmailValid &&
            isPhoneNumberValid && isRestValid) {

            form.submit();
        }

    });

    //check if an input is empty
    function isEmpty(value) {
        if (value === '') {
            return true;
        }
        else {
            return false;
        }
    }

    //check if an input's length is between min,max
    function isBetween(length, min, max) {
        if (length < min || length > max) {
            return false;
        }
        else {
            return true;
        }
    }

    //check if card number input is 16 digits
    function isCardValid(card_number) {
        const re = new RegExp("^[0-9]{16}");
        return re.test(card_number);
    };

    //check if cvv input is only digits
    function isCvvValid(cvv) {
        const re = new RegExp("^[0-9]");
        return re.test(cvv);
    };

    //check if email input is in email-standard form
    function isEmailValid(email) {
        const re = /^([a-zA-Z\d\.-]+)@([a-zA-Z\d-]+)\.([a-zA-Z]{2,4})(\.[a-zA-Z]{2,4})?$/;
        return re.test(email);
    };

    //check if phone input is 10 digits
    function isPhoneValid(phone_number) {
        const re = new RegExp("^[0-9]{10}");
        return re.test(phone_number);
    };

    //function for not valid inputs
    const showError = (input, message) => {

        // get the form-field element (.form-field)
        const formField = input.parentElement;

        // add the error class for css customization
        formField.classList.remove('success');
        formField.classList.add('error');

        // show the error message
        const error = formField.querySelector('small');
        error.textContent = message;
    };

    const showSuccess = (input) => {

        // get the form-field element (.form-field)
        const formField = input.parentElement;

        // remove the error class & add success class for css customization
        formField.classList.remove('error');
        formField.classList.add('success');

        // hide the error message
        const error = formField.querySelector('small');
        error.textContent = '';
    }

    const confirmPassword = () => {

        let valid = false;
        const min = 8, max = 16;
        //trim -> no whitespace
        const password_value = password1.value.trim();

        if (isEmpty(password_value)) {
            showError(password1, 'Συμπληρώστε τον κωδικό σας.');
        } else if (!isBetween(password_value.length, min, max)) {
            showError(password1, `Ο κωδικός σας πρέπει να έχει από ${min} εώς ${max} χαρακτήρες.`)
        } else {
            showSuccess(password1);
            valid = true;
        }
        return valid;
    }

    const confirmSecondPassword = () => {

        let valid = false;

        const confirm_password = password2.value.trim();
        const password_value = password1.value.trim();

        if (isEmpty(confirm_password)) {
            showError(password2, 'Πληκτρολογήστε ξανά τον κωδικό.');
        } else if (password_value !== confirm_password) {
            showError(password2, 'Πληκτρολογήσατε διαφορετικό κωδικό.');
        } else {
            showSuccess(password2);
            valid = true;
        }

        return valid;
    };

    const confirmUsername = () => {

        let valid = false;
        const min = 5, max = 15;
        const username_value = username.value.trim();

        if (isEmpty(username_value)) {
            showError(username, 'Συμπληρώστε το username.');
        } else if (!isBetween(username_value.length, min, max)) {
            showError(username, `Το username πρέπει να έχει από ${min} εώς ${max} χαρακτήρες.`)
        } else {
            showSuccess(username);
            valid = true;
        }
        return valid;
    }

    const confirmCardNumber = () => {

        let valid = false;
        const card_value = card.value.trim();

        if (isEmpty(card_value)) {
            showError(card, 'Συμπληρώστε τον αριθμό της κάρτας σας.');
        } else if (!isCardValid(card_value)) {
            showError(card, 'Ο αριθμός κάρτας αποτελείται απο 16 ψηφία.')
        } else {
            showSuccess(card);
            valid = true;
        }
        return valid;
    }

    const confirmCVV = () => {

        let valid = false;
        const min = 3, max = 4;
        const CVV_value = cvv.value.trim();

        if (isEmpty(CVV_value)) {
            showError(cvv, 'Συμπληρώστε το CVV.');
        } else if (!isBetween(CVV_value.length, min, max)) {
            showError(cvv, `Ο κωδικός CVV πρέπει να έχει από ${min} εώς ${max} χαρακτήρες.`)
        }
        else if (!isCvvValid(CVV_value)) {
            showError(cvv, `Ο κωδικός CVV πρέπει να αποτελείται μόνο από αριθμούς.`)
        } else {
            showSuccess(cvv);
            valid = true;
        }
        return valid;
    }

    const confirmEmail = () => {

        let valid = false;
        const email_value = email.value.trim();

        if (isEmpty(email_value)) {
            showError(email, 'Συμπληρώστε το email σας.');
        } else if (!isEmailValid(email_value)) {
            showError(email, 'Το email δεν έχει έγκυρη μορφή.')
        } else {
            showSuccess(email);
            valid = true;
        }
        return valid;
    }

    const confirmCardEmail = () => {

        let valid = false;
        const card_email_value = card_email.value.trim();
        if (isEmpty(card_email_value)) {
            showError(card_email, 'Συμπληρώστε το email σας.');
        } else if (!isEmailValid(card_email_value)) {
            showError(card_email, 'Το email δεν έχει έγκυρη μορφή.')
        } else {
            showSuccess(card_email);
            valid = true;
        }
        return valid;
    }

    const confirmPhoneNumber = () => {

        let valid = false;
        const telephone_value = telephone.value.trim();

        if (isEmpty(telephone_value)) {
            showError(telephone, 'Συμπληρώστε τον αριθμό επικοινωνίας σας.');
        } else if (!isPhoneValid(telephone_value)) {
            showError(telephone, 'Ο αριθμός τηλεφώνου αποτελείται απο 10 ψηφία.')
        } else {
            showSuccess(telephone);
            valid = true;
        }
        return valid;
    }

    const blankConfirmRest = () => {

        let valid1 = false;
        const firstname_value = firstname.value.trim();

        if (isEmpty(firstname_value)) {
            showError(firstname, 'Συμπληρώστε το όνομά σας.');
        } else {
            showSuccess(firstname);
            valid1 = true;
        }

        let valid2 = false;
        const lastname_value = lastname.value.trim();

        if (isEmpty(lastname_value)) {
            showError(lastname, 'Συμπληρώστε το επίθετό σας.');
        } else {
            showSuccess(lastname);
            valid2 = true;
        }

        let valid3 = false;
        const address_value = address.value.trim();

        if (isEmpty(address_value)) {
            showError(address, 'Συμπληρώστε την διεύθυνσή σας.');
        } else {
            showSuccess(address);
            valid3 = true;
        }

        let valid4 = false;
        const country_value = country.value.trim();

        if (isEmpty(country_value)) {
            showError(country, 'Συμπληρώστε την χώρα σας.');
        } else {
            showSuccess(country);
            valid4 = true;
        }

        let valid5 = false;
        const birth_date_value = birth_date.value.trim();

        if (isEmpty(birth_date_value)) {
            showError(birth_date, 'Επιλέξτε ημερομηνία.');
        } else {
            showSuccess(birth_date);
            valid5 = true;
        }

        let valid6 = false;
        const card_date_value = card_date.value.trim();

        if (isEmpty(card_date_value)) {
            showError(card_date, 'Επιλέξτε ημερομηνία.');
        } else {
            showSuccess(card_date);
            valid6 = true;
        }

        return (valid1 && valid2 && valid3 && valid4 && valid5 && valid6);
    }

}

