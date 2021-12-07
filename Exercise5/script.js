/* -- FIRST --
const form = document.getElementById('form');
const password1 = document.getElementById('password_txt');
const password2 = document.getElementById('password2_txt');
const age_date = document.getElementById('birth_txt');


form.addEventListener('submit', (e) => {
    let messages_password = [];
    let messages_age = [];

    if(password1.value.lenght < 7){
        messages_password.push('Ο κωδικός πρέπει να έχει τουλάχιστον 7 ψηφία.');
    }

    if(password1.value !== password2.value){
        messages_password.push('Οι κωδικοί πρέπει να είναι ίδιοι.');
    }

    var parts = age_date.value.split("/");
    var year = parseInt(parts[2], 10);
    if (year<2003){
        messages_age.push('Πρέπει να είστε άνω των 18 ετών.');
    }

    if(messages_age.length > 0 || messages_password.length > 0){
        e.preventDefault();
    }

    if(messages_password.length > 0){
        password_error.innerText = messages_password.join(', ');
    }

    
    if(messages_age.length > 0){
        age_error.innerText = messages_age.join(', ');
    }
});
*/

/* -- SECOND --
form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateForm();
});

// Defining a function to validate form 
function validateForm() {

    // Retrieving the values of form elements 
    var password1 = document.getElementById('password_txt').value;
    var password2 = document.getElementById('password2_txt').value;
    var age_date = document.getElementById('birth_txt').value;

    //Validate password
    if (password1 === password2){
        printError(password_error, 'Οι δύο κωδικοί πρέπει να είναι ίδιοι.')
    }

    //Validate age
    var parts = age_date.split("/");
    var year = parseInt(parts[2], 10);
    if (year<2003){
        printError(age_error, 'Πρέπει να είστε άνω των 18 ετών.');
    }
}

// Defining a function to display error message
function printError(error_id, error_message) {
    document.getElementById(String(element_id)).innerHTML = error_message;
}
*/


