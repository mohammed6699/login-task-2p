const inputFields = [
    {
        id: "email",
        label: "البريد الإلكتروني",
        type: "email",
        placeholder: "ادخل عنوان بريدك الإلكتروني",
        hasButton: false,
        name: 'Email'
    },
    {
        id: "pass",
        label: "كلمة السر",
        type: "password",
        placeholder: "ادخل كلمة السر",
        hasButton: true,
        icon: "./assets/view.svg",
        name: 'password'
    },
    {
        id: "pin-num",
        label: "رمز التحقق",
        type: "number",
        placeholder: "رمز التحقق من خلال رسالة نصية",
        hasButton: true,
        icon: "./assets/arrow-down-01.svg",
        name: 'pin-code'
    }
];

function createInputComponent({ id, label, type, placeholder, hasButton, icon, name }) {
    return `
        <div class="div-style">
            <label for="${id}" id="user-label">${label}</label>
            <div class="password-container">
                <input id="${id}" type="${type}" placeholder="${placeholder}" name="${name}"/>
                ${hasButton ? `
                    <button type="button" class="toggle-password">
                        <img src="${icon}"/>
                    </button>
                ` : ''}
            </div>
        </div>
    `;
}
function renderInputs() {
    const container = document.getElementById('inputs-container');
    if (!container) return;

    const html = inputFields.map(field => createInputComponent(field)).join('');
    container.innerHTML = html;
    const toggleButtons = container.querySelectorAll('.toggle-password');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
            } else if (input.type === 'text') {
                input.type = 'password';
            }
        });
    });
    let checkEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    let checkPass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

    let emailInput = document.getElementById(`${inputFields[0].id}`);
    let passInput = document.getElementById(`${inputFields[1].id}`);
    let codeInput = document.getElementById(`${inputFields[2].id}`);

    let submitButton = document.getElementById('submit-btn');

    emailInput.onfocus=function(){
        emailInput.style.backgroundColor="white"
        emailInput.style.borderBottom="2px solid black"
        emailInput.style.borderBottomLeftRadius="0"
        emailInput.style.borderBottomRightRadius="0"
    }
    emailInput.addEventListener('blur', function(){
        if(!checkEmail.test(emailInput.value)){
            emailInput.style.border="1px solid red"
        }else{
            emailInput.style.border="1px solid black"
        }
    })

    passInput.onfocus=function(){
        passInput.style.backgroundColor="white"
        passInput.style.borderBottom="2px solid black"
        passInput.style.borderBottomLeftRadius="0"
        passInput.style.borderBottomRightRadius="0"
    }
    passInput.addEventListener('blur', function(){
        if(!checkPass.test(passInput.value)){
            passInput.style.border="1px solid red"
        }else{
            passInput.style.border="1px solid black"
        }
    })

    // submit button
    function validateSubmit(){ 
        let isEmailValid = checkEmail.test(emailInput.value);
        let isPassValid = checkPass.test(passInput.value);
        let isCodeValid = codeInput.value.length > 0;

        if(isEmailValid && isPassValid && isCodeValid){
            submitButton.disabled = false;
            submitButton.style.backgroundColor = '#B87B02';
            submitButton.style.color = 'white';
        }else{
            submitButton.disabled = true;
            submitButton.style.backgroundColor = '#9B5F01';
            submitButton.style.color = 'white';
        }
    }
    [emailInput, passInput, codeInput].forEach(ele => 
        ele.addEventListener('input', validateSubmit)
    )
}

document.addEventListener('DOMContentLoaded', renderInputs);

function naigateToCheckCode(){
    event.preventDefault()
    window.location.assign("http://127.0.0.1:5500/change-password.html")
}
