var questions = document.getElementsByClassName('question');
const questionsValidity = new Array(12).fill(false);
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
                                       'Επιλέξτε ένα ή περισσότερα κουτάκια.']
const form = document.getElementById('registration-form');
window.onload = test;

function test() {
    for (var i = 0; i < questions.length; i++) {
        changeSummaryColorToGreen(i);
    }
    
    const form = document.getElementById('registration-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log("aa")
        let valid = true;
        for (var j = 0; j < questionsValidity.length; j++) {
            if (questionsValidity[j] == false) {
                valid = false;
                let alertBox = questions[j].querySelector(".question > .alert-box")
                alertBox.style.display = 'initial'
                alertBox.innerHTML = defaultQuestionsAlertMessages[j]
            }
        }

        if (valid == true) {
            console.log("submitted succesfully")
        }
        else {

        }
    });
}

function changeSummaryColorToGreen(i) {
    let summary = questions[i].getElementsByTagName('summary')[0]
    let radioInputs = questions[i].querySelectorAll('input[type="radio"]')
    let checkboxInputs = questions[i].querySelectorAll('input[type="checkbox"]')
    let rangeInputs = questions[i].querySelectorAll('input[type="range"]')
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

    for (checkboxInput of checkboxInputs) {
        checkboxInput.onchange = function () {
            let checkboxInputsChecked = questions[i].querySelectorAll('input[type="checkbox"]:checked')
            let len = checkboxInputsChecked.length
            console.log(len)
            console.log(this)
            console.log(this.checked)
            if (i == 9) {
                let alertBox = questions[i].querySelector(".question > .alert-box")
                if (len >= 1 && len <= 2) {
                    questionsValidity[i] = false
                    summary.style.backgroundColor = "rgba(247, 247, 67, 0.767)"
                    alertBox.style.display = 'initial'
                    alertBox.innerHTML = 'Πρέπει να βάλετε τρία πεδία!'
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
    if (rangeInputs.length > 0) {
        rangeInputs[0].onclick = function () {
            questionsValidity[i] = true
            summary.style.backgroundColor = "rgba(40, 212, 40, 0.63)"
        }
    }

    if (i == 1) {
        let numberInputs = questions[i].querySelectorAll('input[type="number"]')
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

}

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

function enableContainer(elementID){
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

function checkValidationOfForm(e) {
    // e.preventDefault();
    // console.log("aa")
    // let valid = true;
    // for (var j = 0; j < questionsValidity.length; j++) {
    //     if (questionsValidity[j] == false) {
    //         valid = false;
    //         let alertBox = questions[j].querySelector(".question > .alert-box")
    //         alertBox.style.display = 'initial'
    //         alertBox.innerHTML = defaultQuestionsAlertMessages[j]
    //     }
    // }

    // if (valid == true) {
    //     console.log("submitted succesfully")
    // }
    // else {

    // }
}