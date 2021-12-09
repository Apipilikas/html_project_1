// Ορισμός questions για να λάβω όλα τα Elements της κλάσης question
// Ουσιαστικά λαμβάνουμε όλα τα Elements που περιέχονται σε μία οντότητα ερώτηση
var questions = document.getElementsByClassName('question');

// Ορισμός questionsValidity για να μας βοηθήσει στην επικύρωση της φόρμας.
// Αρχικοποίηση της με false και όποτε μία ερώτηση κρίνεται ότι έχει
// συμπληρωθεί σωστά, αλλάζει σε true. 
const questionsValidity = new Array(12).fill(false);

// Προκαθορισμένα μηνύματα σε περίπτωση που δεν έχει συμπληρωθεί σωστά η φόρμα.
// Πέραν αυτών των μηνυμάτων, γίνονται διάφοροι άλλοι έλεγχοι και εμφανίζονται, όπου
// ο χρήστης δεν έχει συμπληρώσει σωστά τις ερωτήσεις, πιο αναλυτικά μηνύματα.
const defaultQuestionsAlertMessages = ['Επιλέξτε μία από τις παρακάτω κουκίδες.',
    'Συμπληρώστε το πεδίο με έναν αριθμό.',
    'Επιλέξτε μία από τις παρακάτω κουκίδες.',
    'Σύρετε την κουκίδα προς την επιλογή σας.',
    'Επιλέξτε ένα ή περισσότερα κουτάκια.',
    'Επιλέξτε ένα ή περισσότερα κουτάκια.',
    'Επιλέξτε ΝΑΙ ή ΌΧΙ.',
    'Σύρετε την κουκίδα προς την επιλογή σας.',
    'Επιλέξτε ένα ή περισσότερα κουτάκια.',
    'Επιλέξτε τρία κουτάκια.',
    'Επιλέξτε ΝΑΙ ή ΌΧΙ.',
    'Επιλέξτε ένα ή περισσότερα κουτάκια.'];



window.onload = test;

// Constraint Validation για το ερωτηματολόγιο. Η πληρότητα των δεδομένων ελέγχεται σε αρκετές περιπτώσεις
// την στιγμή που ο χρήστης βάζει τα διάφορα στοιχεία του στην φόρμα. Για αυτό και ανάλογα αλλάζουν τα χρώματα
// των ερωτήσεων από πράσινο σε κόκκινο. Όταν γίνεται submit ελέγχουμε ποιες ερωτήσεις έχουν συμπληρωθεί από τον χρήστη,
// ενώ παράλληλα ελέγχουμε σε ορισμένες και την εγκυρότητα των δεδομένων (πχ. text και number inputs).
function test() {
    changeSummaryColor();
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
    //const form = document.getElementById('registration-form');
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
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let isPasswordValid = confirmPassword();
        let isConfirmPasswordValid = confirmSecondPassword();
        let isCUsernameValid = confirmUsername();
        let isCardValid = confirmCardNumber();
        let isCvvValid = confirmCVV();
        let isEmailValid = confirmEmail();
        let isCardEmailValid = confirmCardEmail();
        let isPhoneNumberValid = confirmPhoneNumber();
        let isRestValid = blankConfirmRest();

        console.log("Form Validation started...")
        let valid = true;
        let count = 0;
        for (var j = 0; j < questionsValidity.length; j++) {
            if (questionsValidity[j] == true) {
                // >> Έλεγχος ερώτησης 2 <<
                // Ελέγχω στην ερώτηση 2 εάν τα inputs είναι σωστά. Παρόλο που του δίνεται σχετική διεπαφή
                // με βελάκια για αυξομείωση του αριθμού, μπορεί να εισάγει αριθμούς από το πληκτρολόγιο οι οποίοι
                // να είναι αρνητικοί ή εξωπραγματικοί (δεν μπορεί κάποιος να δουλεύει/σπουδάζει πάνω από 70 χρόνια). 
                if (j == 1) {
                    if (checkNumberInputsRange() == false) {
                        valid = false;
                        count--;
                    }
                }
                count++;
            }
            else {
                valid = false;
                let alertBox = questions[j].querySelector(".question > .alert-box");
                showAlertBox(alertBox, defaultQuestionsAlertMessages[j]);
            }
        }
        //checkNumberInputsRange();
        //console.log(checkElseTextInputs());
        let invalidTextInputs = checkElseTextInputs();
        console.log(invalidTextInputs);
        count -= invalidTextInputs;
        console.log(count);
        if (invalidTextInputs > 0) {
            valid = false;
        }
        let resultBox = document.getElementById("questionnaire-result");
        resultBox.style.display = "initial";


        if (isPasswordValid && isConfirmPasswordValid && isCUsernameValid && isCardValid && isCvvValid && isEmailValid && isCardEmailValid &&
            isPhoneNumberValid && isRestValid && valid) {
            form.submit();
        }

        if (valid == true) {
            console.log("Form has been submitted succesfully");
            resultBox.style.backgroundColor = "rgba(40, 212, 40, 0.63)";
            resultBox.innerHTML = 'Το ερωτηματολόγιο καταχωρήθηκε με επιτυχία!'
        }
        else {
            resultBox.style.backgroundColor = "rgba(247, 30, 30, 0.651)";
            resultBox.innerHTML = 'Δεν έχετε απαντήσει σε ' + (12 - count) + ' ερωτήσεις.';
        }
    });
}

// Συνάρτηση που βοηθάει στην καλύτερη μορφοποίηση του ερωτηματολογίου. Όταν ο χρήστης
// απαντάει σε μία ερώτηση αλλάζει το πλαίσιο της από κόκκινο σε πράσινο με την βοήθεια eventListeners.
// Παρακάτω ακολουθούν οι τέσσερις συναρτήσεις για το καθένα από τα τέσσερα inputs που
// χρησιμοποιούνται στο ερωτηματολόγιο.
function changeSummaryColor() {
    for (var i = 0; i < questions.length; i++) {
        let summary = questions[i].getElementsByTagName('summary')[0];
        let radioInputs = questions[i].querySelectorAll('input[type="radio"]');
        let checkboxInputs = questions[i].querySelectorAll('input[type="checkbox"]');
        let rangeInputs = questions[i].querySelectorAll('input[type="range"]');
        let numberInputs = questions[i].querySelectorAll('input[type="number"]');

        if (radioInputs.length > 0) {
            changeSummaryColorRadio(summary, radioInputs, i);
        }
        else if (checkboxInputs.length > 0) {
            changeSummaryColorCheckbox(summary, checkboxInputs, i);
        }
        else if (rangeInputs.length > 0) {
            changeSummaryColorRange(summary, rangeInputs, i);
        }
        else if (numberInputs.length > 0) {
            changeSummaryColorNumber(summary, numberInputs, i);
        }
    }
}

// Συνάρτηση που προορίζεται για τα inputs με τύπο radio.
// Εκμεταλλευόμαστε την χρήση του eventListener για την πυροδότηση της
// συνάρτησης question2TriggerBoxes που εξηγείται παρακάτω. Το τελευταίο το
// χρειαζόμαστε μόνο για την πρώτη ερώτηση.
function changeSummaryColorRadio(summary, radioInputs, i) {
    for (radioInput of radioInputs) {
        radioInput.onchange = function () {
            questionsValidity[i] = true
            changeSummaryColorToGreen(summary);
            if (i == 0) {
                //console.log(this.value)
                question2TriggerBoxes(this.value);
            }
        }
    }
}

// Συνάρτηση που προορίζεται για τα inputs με τύπο checkbox.
// Αξίζει να σημειωθεί ότι στην ερώτηση 10 του ερωτηματολογίου
// ζητείται από τον χρήστη να επιλέξει ακριβώς τρία κουτάκια. 
// Εκμεταλευόμαστε την χρήση του eventListener για το τελευταίο και
// φροντίζουμε ο χρήστης κάθε φορά να επιλέγει σωστό αριθμό κουτακίων. Παράλληλα
// εμφανίζουμε κατάλληλα μηνύματα και μορφοποιούμε το πλαίσιο της ερώτησης με κίτρινο
// χρώμα όταν ο χρήστης έχει επιλέξει έναν μη αποδεκτό αριθμό κουτακίων.
function changeSummaryColorCheckbox(summary, checkboxInputs, i) {
    for (checkboxInput of checkboxInputs) {
        checkboxInput.onchange = function () {
            let checkboxInputsChecked = questions[i].querySelectorAll('input[type="checkbox"]:checked');
            let len = checkboxInputsChecked.length;
            //console.log(len)
            //console.log(this)
            //console.log(this.checked)
            if (i == 9) {
                let alertBox = questions[9].querySelector(".question > .alert-box");
                if (len == 1) {
                    questionsValidity[i] = false;
                    changeSummaryColorToYellow(summary);
                    showAlertBox(alertBox, 'Επιλέξτε άλλα ' + (3 - len) + ' κουτάκια!');
                }
                else if (len == 2) {
                    questionsValidity[i] = false;
                    changeSummaryColorToYellow(summary);
                    showAlertBox(alertBox, 'Επιλέξτε άλλo ' + (3 - len) + ' κουτάκι!');
                }
                else if (len == 3) {
                    questionsValidity[i] = true;
                    hideAlertBox(alertBox);
                    changeSummaryColorToGreen(summary);
                }
                else if (len > 3) {
                    questionsValidity[i] = false;
                    changeSummaryColorToYellow(summary);
                    showAlertBox(alertBox, 'Επιλέξτε ' + (len - 3) + ' λιγότερα κουτάκια!');
                }
                else {
                    changeSummaryColorToRed(summary);
                    showAlertBox(alertBox, 'Επιλέξτε άλλα ' + (3 - len) + ' κουτάκια!');
                }
            }
            else {
                if (this.checked == true) {
                    questionsValidity[i] = true
                    changeSummaryColorToGreen(summary);
                }
                else {
                    if (len < 1) {
                        questionsValidity[i] = false
                        changeSummaryColorToRed(summary)
                    }
                }
            }
        }
    }
}

// Συνάρτηση που προορίζεται για τα inputs με τύπο range.
function changeSummaryColorRange(summary, rangeInputs, i) {
    rangeInputs[0].onclick = function () {
        questionsValidity[i] = true;
        changeSummaryColorToGreen(summary);
    }
}

// Συνάρτηση που προορίζεται για τα inputs με τύπο number.
function changeSummaryColorNumber(summary, numberInputs, i) {
    for (numberInput of numberInputs) {
        numberInput.onchange = function () {
            //console.log(this)
            if (this.value > 0) {
                questionsValidity[i] = true
                changeSummaryColorToGreen(summary);
            }
        }
    }
}

// Συνάρτηση αντιστοίχησης των τιμών της ερώτησης 1 στα χωρία της ερώτησης 2.
// Η ερώτηση 2 εξαρτάται άμεσα από την ερώτηση 1. Επομένως, ανάλογα με
// το τι έχει πατήσει ο χρήστης στην ερώτηση 1, ενεργοποιούμε το κατάλληλο
// πεδίο στον χρήστη στην ερώτηση 2. Αυτό το καταφέρνουμε διαβάζοντας τις κατάλληλες
function question2TriggerBoxes(answerValue) {
    if (answerValue == "student") {
        enableContainer('study-year-content');
    }
    else if (answerValue == "employed") {
        enableContainer('employee-year-content');
    }
    else if (answerValue == "unemployed") {
        enableContainer('unemployed-year-content');
    }
    else if (answerValue == "retired") {
        enableContainer('retired-year-content');
    }
    else {
        enableContainer(null);
    }
}

// Συνάρτηση ενεργοποίησης κατάλληλων χωρίων στην ερώτηση 2.
// Κάθε φορά που ο χρήστης πατάει διαφορετικό κουμπί στην ερώτηση 1, φροντίζουμε να
// εμφανίζεται και το κατάλληλο container. Χρησιμοποιούμε το for loop για να τα εξαφανίζουμε
// όλα και να εμφανίζουμε μόνο αυτό που θέλουμε (Διαφορετικά χωρίς το for loop, κάθε φορά που ο χρήστης
// άλλαζε την επιλογή του στην ερώτηση 1 απλά θα ενεργοποιούταν και θα εμφανιζόταν το αντίστοιχο χωρίο
// χωρίς να εξαφανίζονται τα άλλα).
function enableContainer(elementID) {
    let numberInputsContainers = questions[1].getElementsByClassName('input-number');
    let container = null;
    if (elementID != null) {
        container = document.getElementById(elementID);
    }
    //console.log(numberInputsContainers)
    //console.log(container)
    for (numberInputsContainer of numberInputsContainers) {
        numberInputsContainer.style.display = "none";
    }
    //console.log("container" + container)
    if (container) {
        container.style.display = "initial";
        container.style.backgroundColor = "transparent";
        changeSummaryColorToRed(questions[1].getElementsByTagName('summary')[0]);
        questionsValidity[1] = false;
    }
    else {
        changeSummaryColorToGreen(questions[1].getElementsByTagName('summary')[0]);
        questionsValidity[1] = true;
    }
}

// Συνάρτηση ελέγχου επιτρεπτού διαστήματος τιμών.
// Στην ερώτηση 2, ο χρήστης καλείται να εισάγει κάποιους αριθμούς ανάλογα με τα έτη φοίτησης ή εργασίας.
// Δίνεται η διεπαφή ώστε να διαλέξει με τον ποντίκι έναν αριθμό. Ωστόσο, μπορεί να εισάγει έναν αριθμό
// και με το πληκτρολόγιο, όπου αυτός ο αριθμός μπορεί να είναι μεγαλύτερος από τους κανόνες που εφαρμόσαμε
// στο αρχείο HTML. Παρακάτω επικυρώνουμε κανόνες ώστε να τηρείται το διάστημα επιτρεπτών τιμών και
// εμφανίζουμε αντίστοιχα μηνύματα.
function checkNumberInputsRange() {
    let numberInputsContainers = questions[1].getElementsByClassName('input-number');
    for (numberInputsContainer of numberInputsContainers) {
        let numberInput = numberInputsContainer.querySelectorAll('input[type="number"')[0];
        //console.log("> checkNumberInputsRange: checking " + numberInput)
        //console.log("> checkNumberInputsRange: the value is" + numberInput.value)
        //console.log(numberInput.value < 1)
        if ((numberInput.value < 1 || numberInput.value > 70) && (numberInput.value != "")) {
            console.log("invalid")
            let alertBox = questions[1].querySelector(".question > .alert-box");
            showAlertBox(alertBox, 'Η τιμή που συμπληρώσατε δεν ήταν έγκυρη.<br>Συμπλήρωστε το πεδίο με μία τιμή μεταξύ του 1 και του 70.');
            return false;
        }
    }
    return true;
}

// Συνάρτηση ελέγχου κειμένων σε επιλογές τύπου "Γράψτε έναν άλλο λόγο".
// Σε αρκετές ερωτήσεις με checkboxes δίνεται η επιλογή ο χρήστης να επιλέξει να εισάγει
// ένα κείμενο με μία επιλογή που δεν αναγράφεται στα παραπάνω. Παρακάτω φροντίζουμε όταν αυτή
// η επιλογή είναι ενεργοποιημένη να κάνουμε τους κατάλληλους ελέγχους στην συνάρτηση textInputValidation.
function checkElseTextInputs() {
    let textInputs = document.querySelectorAll('input[type="text"]');
    let checkboxForTxts = document.querySelectorAll("[id*='else-checkbox']");
    //console.log(textInputs[0].parentNode.parentNode.previousElementSibling)
    //console.log(checkboxForTxts[0])
    let invalidNumber = 0;
    for (var i = 0; i < checkboxForTxts.length; i++) {
        if (checkboxForTxts[i].checked == true) {
            let textInputValue = textInputs[i].value;
            let alertBox = textInputs[i].parentNode.parentNode.previousElementSibling;
            let summary = alertBox.previousElementSibling;
            if (!textInputValidation(textInputValue, alertBox)) {
                changeSummaryColorToRed(summary);
                invalidNumber++;
            }
        }
    }
    return invalidNumber;
}

// Συνάρτηση ελέγχου εγκυρότητας δεδομένων.
// Λαμβάνουμε μία τιμή από την παραπάνω συνάρτηση και ελέγχουμε τα εξής:
// 1) εάν είναι κενή η τιμή (εάν δηλαδή ο χρήστης δεν έχει προσθέσει περιεχόμενο)
// 2) εάν περιέχει αριθμούς
// 3) εάν περιέχει ειδικούς χαρακτήρες
// Για τα παραπάνω φροντίζουμε να εμφανίζουμε κατάλληλα μηνύματα.
function textInputValidation(value, alertBox) {
    let numberRule = /[1-9]/;
    let specialCharactersRule = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (value == '') {
        console.log("> checkElseTextInputs: Empty input");
        showAlertBox(alertBox, 'Το πεδίο είναι κενό.<br>Συμπληρώστε το παρακάτω πεδίο.');
        return false;
    }
    else if (numberRule.test(value)) {
        console.log("> checkElseTextInputs: Input contains number");
        showAlertBox(alertBox, 'Καταχωρήσατε στο πεδίο και αριθμούς.<br>Συμπληρώστε το παρακάτω πεδίο μόνο με γράμματα.');
        return false;
    }
    else if (specialCharactersRule.test(value)) {
        console.log("> checkElseTextInputs: Input contains special characters");
        showAlertBox(alertBox, 'Καταχωρήσατε στο πεδίο και ειδικούς χαρακτήρες.<br>Συμπληρώστε το παρακάτω πεδίο μόνο με γράμματα.');
        return false;
    }
    return true;
}

// Συνάρτηση εμφάνισης του κειμένου ειδοποίησης.
function showAlertBox(alertBox, message) {
    alertBox.style.display = "initial";
    alertBox.innerHTML = message;
}

// Συνάρτηση για κρύψιμο του κουτιού ενεργοποίησης.
function hideAlertBox(alertBox) {
    alertBox.style.display = "none";
}

// Συνάρτηση αλλαγής του χρώματος του πλαισίου της ερώτησης σε κόκκινο.
function changeSummaryColorToRed(summary) {
    summary.style.backgroundColor = "rgba(247, 30, 30, 0.651)";
}

// Συνάρτηση αλλαγής του χρώματος του πλαισίου της ερώτησης σε κίτρινο.
function changeSummaryColorToYellow(summary) {
    summary.style.backgroundColor = "rgba(247, 247, 67, 0.767)";
}

// Συνάρτηση αλλαγής του χρώματος του πλαισίου της ερώτησης σε πράσινο.
function changeSummaryColorToGreen(summary) {
    summary.style.backgroundColor = "rgba(40, 212, 40, 0.63)";
}




//const fields = document.getElementsByClassName('form-field');

// form.addEventListener('submit', function (e) {

//     // prevent the form from submitting
//     e.preventDefault();

//     let isPasswordValid = confirmPassword();
//     let isConfirmPasswordValid = confirmSecondPassword();
//     let isCUsernameValid = confirmUsername();
//     let isCardValid = confirmCardNumber();
//     let isCvvValid = confirmCVV();
//     let isEmailValid = confirmEmail();
//     let isCardEmailValid = confirmCardEmail();
//     let isPhoneNumberValid = confirmPhoneNumber();
//     let isRestValid = blankConfirmRest();

//     if (isConfirmPasswordValid && isCUsernameValid && isCardValid && isCvvValid && isEmailValid && isCardEmailValid &&
//         isPhoneNumberValid && isRestValid) {

//         form.submit();
//     }

// });

