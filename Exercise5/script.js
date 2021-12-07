var questions = document.getElementsByClassName('question')

function test(){
    for (var i = 0; i < questions.length; i++) {
        changeSummaryColorToGreen(i);
    }
}

function changeSummaryColorToGreen(i){
    let summary = questions[i].getElementsByTagName('summary')[0]
    let radioInputs = questions[i].getElementsByClassName('input-radio')
    for (radioInput of radioInputs) {
        radioInput.onchange = function () {
            if (radioInput.checked = true) {
                summary.style.backgroundColor = "rgba(40, 212, 40, 0.63)"
            }
        }
    }
}