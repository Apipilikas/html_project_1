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

const form = document.getElementById('registration-form');
window.onload = test;

function test() {
    changeSummaryColor();

    const form = document.getElementById('registration-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
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
                alertBox.style.display = 'initial';
                alertBox.innerHTML = defaultQuestionsAlertMessages[j];
            }
        }
        //checkNumberInputsRange();
        console.log(checkElseTextInputs());
        let invalidTextInputs = checkElseTextInputs();
        console.log(invalidTextInputs);
        count -= invalidTextInputs;
        console.log(count);
        if (invalidTextInputs > 0) {
            valid = false;
        }
        let resultBox = document.getElementById("questionnaire-result");
        resultBox.style.display = "initial";
        if (valid == true) {
            console.log("Form has been submitted succesfully");
            resultBox.style.backgroundColor = "rgba(40, 212, 40, 0.63)";
            resultBox.innerHTML = 'Το ερωτηματολόγιο καταχωρήθηκε με επιτυχία!'
        }
        else {
            resultBox.style.backgroundColor = "rgba(247, 30, 30, 0.651)";
            resultBox.innerHTML = 'Δεν έχετε απαντήσει σε ' + (12 - count) + ' ερωτήσεις';
        }
    });
}

// Μέθοδος που βοηθάει στην καλύτερη μορφοποίηση του ερωτηματολογίου. Όταν ο χρήστης
// απαντάει σε μία ερώτηση αλλάζει το πλαίσιο της από κόκκινο σε πράσινο.
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

// Προορίζεται για τα inputs με τύπο radio.
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
                question2TriggerBoxes(this.value)
            }
        }
    }
}

// Προορίζεται για τα inputs με τύπο checkbox.
// Αξίζει να σημειωθεί ότι στην ερώτηση 10 του ερωτηματολογίου
// ζητείται από τον χρήστη να επιλέξει ακριβώς τρία κουτάκια. 
// Εκμεταλευόμαστε την χρήση του eventListener για το τελευταίο και
// φροντίζουμε ο χρήστης κάθε φορά να επιλέγει σωστό αριθμό κουτακίων. Παράλληλα
// εμφανίζουμε κατάλληλα μηνύματα και μορφοποιούμε το πλαίσιο της ερώτησης με κίτρινο
// χρώμα όταν ο χρήστης έχει επιλέξει έναν μη αποδεκτό αριθμό κουτακίων.
function changeSummaryColorCheckbox(summary, checkboxInputs, i) {
    for (checkboxInput of checkboxInputs) {
        checkboxInput.onchange = function () {
            let checkboxInputsChecked = questions[i].querySelectorAll('input[type="checkbox"]:checked')
            let len = checkboxInputsChecked.length
            //console.log(len)
            //console.log(this)
            //console.log(this.checked)
            if (i == 9) {
                let alertBox = questions[9].querySelector(".question > .alert-box")
                if (len >= 1 && len <= 2) {
                    questionsValidity[i] = false
                    changeSummaryColorToYellow(summary);
                    alertBox.style.display = 'initial'
                    alertBox.innerHTML = 'Επιλέξτε άλλο/άλλα ' + (3 - len) + ' κουτάκια!';
                }
                else if (len == 3) {
                    questionsValidity[i] = true
                    alertBox.style.display = 'none'
                    changeSummaryColorToGreen(summary);
                }
                else {
                    changeSummaryColorToRed(summary)
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

// Προορίζεται για τα inputs με τύπο range.
function changeSummaryColorRange(summary, rangeInputs, i) {
    rangeInputs[0].onclick = function () {
        questionsValidity[i] = true
        changeSummaryColorToGreen(summary);
    }
}

// Προορίζεται για τα inputs με τύπο number.
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
    console.log(answerValue == "student")
    if (answerValue == "student") {
        enableContainer('study-year-content')
    }
    else if (answerValue == "employed") {
        enableContainer('employee-year-content')
    }
    else if (answerValue == "unemployed") {
        enableContainer('unemployed-year-content')
    }
    else if (answerValue == "retired") {
        enableContainer('retired-year-content')
    }
    else {
        enableContainer(null)
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
    let container = document.getElementById(elementID);
    //console.log(numberInputsContainers)
    //console.log(container)
    for (numberInputsContainer of numberInputsContainers) {
        numberInputsContainer.style.display = "none";
    }
    container.style.display = "initial";
    container.style.backgroundColor = "transparent";
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
        //console.log(numberInput)
        //console.log(numberInput.value)
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