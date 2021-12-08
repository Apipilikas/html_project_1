// Ορισμός questions για να λάβω όλα τα Elements της κλάσης question
// Ουσιαστικά λαμβάνουμε όλα τα Elements που περιέχονται σε μία οντότητα ερώτηση
var questions = document.getElementsByClassName('question');

// Ορισμός questionsValidity για να μας βοηθήσει στην επικύρωση της φόρμας.
// Αρχικοποίηση της με false και όποτε μία ερώτηση κρίνεται ότι έχει
// συμπληρωθεί σωστά, αλλάζει σε true. 
const questionsValidity = new Array(12).fill(false);

// Προκαθορισμένα μηνύματα σε περίπτωση που δεν έχει συμπληρωθεί σωστά η φόρμα.
// Πέραν αυτών των μηνυμάτων, γίνονται διάφοροι άλλοι έλεγχοι και εμφανίζονται όπου
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
    // for (var i = 0; i < questions.length; i++) {
    //     changeSummaryColorToGreen(i);
    // }

    const form = document.getElementById('registration-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log("aa")
        let valid = true;
        for (var j = 0; j < questionsValidity.length; j++) {
            // 
            if (questionsValidity[j] == true) {
                // >> Έλεγχος ερώτησης 2 <<
                // Ελέγχω στην ερώτηση 2 εάν τα inputs είναι σωστά. Παρόλο που του δίνεται σχετική διεπαφή
                // με βελάκια για αυξομείωση του αριθμού, μπορεί να εισάγει αριθμούς από το πληκτρολόγιο οι οποίοι
                // να είναι αρνητικοί ή εξωπραγματικοί (δεν μπορεί κάποιος να δουλεύει/σπουδάζει πάνω από 70 χρόνια). 
                if (j == 1) {
                    if (checkNumberInputsRange() == false) {
                        valid = false;
                    }
                }
            }
            else {
                valid = false;
                let alertBox = questions[j].querySelector(".question > .alert-box")
                alertBox.style.display = 'initial'
                alertBox.innerHTML = defaultQuestionsAlertMessages[j]
            }
        }
        //checkNumberInputsRange();

        if (valid == true) {
            console.log("submitted succesfully")
        }
        else {

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
            summary.style.backgroundColor = "rgba(40, 212, 40, 0.63)"
            if (i == 0) {
                console.log(this.value)
                question2TriggerBoxes(this.value)
            }
        }
    }
}

// Προορίζεται για τα inputs με τύπο checkbox.
function changeSummaryColorCheckbox(summary, checkboxInputs, i) {
    for (checkboxInput of checkboxInputs) {
        checkboxInput.onchange = function () {
            let checkboxInputsChecked = questions[i].querySelectorAll('input[type="checkbox"]:checked')
            let len = checkboxInputsChecked.length
            console.log(len)
            console.log(this)
            console.log(this.checked)
            if (i == 9) {
                let alertBox = questions[9].querySelector(".question > .alert-box")
                if (len >= 1 && len <= 2) {
                    questionsValidity[i] = false
                    summary.style.backgroundColor = "rgba(247, 247, 67, 0.767)"
                    alertBox.style.display = 'initial'
                    alertBox.innerHTML = 'Επιλέξτε άλλο/άλλα ' + (3 - len) + ' κουτάκια!';
                }
                else if (len == 3) {
                    questionsValidity[i] = true
                    alertBox.style.display = 'none'
                    summary.style.backgroundColor = "rgba(40, 212, 40, 0.63)"
                }
                else {
                    summary.style.backgroundColor = "rgba(247, 30, 30, 0.651)"
                }
            }
            else {
                if (this.checked == true) {
                    questionsValidity[i] = true
                    summary.style.backgroundColor = "rgba(40, 212, 40, 0.63)"
                }
                else {
                    if (len < 1) {
                        questionsValidity[i] = false
                        summary.style.backgroundColor = "rgba(247, 30, 30, 0.651)"
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
        summary.style.backgroundColor = "rgba(40, 212, 40, 0.63)"
    }
}

// Προορίζεται για τα inputs με τύπο number.
function changeSummaryColorNumber(summary, numberInputs, i) {
    for (numberInput of numberInputs) {
        numberInput.onchange = function () {
            console.log(this)
            if (this.value > 0) {
                questionsValidity[i] = true
                summary.style.backgroundColor = "rgba(40, 212, 40, 0.63)"
            }
        }
    }
}


// function changeSummaryColorToGreen(i) {
//     let summary = questions[i].getElementsByTagName('summary')[0]
//     let radioInputs = questions[i].querySelectorAll('input[type="radio"]')
//     let checkboxInputs = questions[i].querySelectorAll('input[type="checkbox"]')
//     let rangeInputs = questions[i].querySelectorAll('input[type="range"]')
//     for (radioInput of radioInputs) {
//         radioInput.onchange = function () {
//             questionsValidity[i] = true
//             summary.style.backgroundColor = "rgba(40, 212, 40, 0.63)"
//             if (i == 0) {
//                 console.log(this.value)
//                 question2TriggerBoxes(this.value)
//             }
//         }
//     }

//     for (checkboxInput of checkboxInputs) {
//         checkboxInput.onchange = function () {
//             let checkboxInputsChecked = questions[i].querySelectorAll('input[type="checkbox"]:checked')
//             let len = checkboxInputsChecked.length
//             console.log(len)
//             console.log(this)
//             console.log(this.checked)
//             if (i == 9) {
//                 let alertBox = questions[i].querySelector(".question > .alert-box")
//                 if (len >= 1 && len <= 2) {
//                     questionsValidity[i] = false
//                     summary.style.backgroundColor = "rgba(247, 247, 67, 0.767)"
//                     alertBox.style.display = 'initial'
//                     alertBox.innerHTML = 'Επιλέξτε άλλο/άλλα ' + (3 - len) + ' κουτάκια!';
//                 }
//                 else if (len == 3) {
//                     questionsValidity[i] = true
//                     alertBox.style.display = 'none'
//                     summary.style.backgroundColor = "rgba(40, 212, 40, 0.63)"
//                 }
//                 else {
//                     summary.style.backgroundColor = "rgba(247, 30, 30, 0.651)"
//                 }
//             }
//             else {
//                 if (this.checked == true) {
//                     questionsValidity[i] = true
//                     summary.style.backgroundColor = "rgba(40, 212, 40, 0.63)"
//                 }
//                 else {
//                     if (len < 1) {
//                         questionsValidity[i] = false
//                         summary.style.backgroundColor = "rgba(247, 30, 30, 0.651)"
//                     }
//                 }
//             }
//         }
//     }
//     if (rangeInputs.length > 0) {
//         rangeInputs[0].onclick = function () {
//             questionsValidity[i] = true
//             summary.style.backgroundColor = "rgba(40, 212, 40, 0.63)"
//         }
//     }

//     if (i == 1) {
//         let numberInputs = questions[i].querySelectorAll('input[type="number"]')
//         for (numberInput of numberInputs) {
//             numberInput.onchange = function () {
//                 console.log(this)
//                 if (this.value > 0) {
//                     questionsValidity[i] = true
//                     summary.style.backgroundColor = "rgba(40, 212, 40, 0.63)"
//                 }
//             }
//         }
//     }

// }

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

function enableContainer(elementID) {
    let numberInputsContainers = questions[1].getElementsByClassName('input-number')
    let container = document.getElementById(elementID)
    console.log(numberInputsContainers)
    console.log(container)
    for (numberInputsContainer of numberInputsContainers) {
        numberInputsContainer.style.display = "none"
    }
    container.style.display = "initial"
    container.style.backgroundColor = "transparent"
}

function checkNumberInputsRange() {
    let numberInputsContainers = questions[1].getElementsByClassName('input-number');
    for (numberInputsContainer of numberInputsContainers) {
        let numberInput = numberInputsContainer.querySelectorAll('input[type="number"')[0];
        console.log(numberInput)
        console.log(numberInput.value)
        console.log(numberInput.value < 1)
        if ((numberInput.value < 1 || numberInput.value > 70) && (numberInput.value != "")) {
            console.log("invalid")
            let alertBox = questions[1].querySelector(".question > .alert-box");
            alertBox.style.display = "initial";
            alertBox.innerHTML = 'Η τιμή που συμπληρώσατε δεν ήταν έγκυρη.<br>Συμπλήρωστε το πεδίο με μία τιμή μεταξύ του 1 και του 70.';
            return false;
        }
    }
    return true;
}