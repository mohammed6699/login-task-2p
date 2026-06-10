import {handleFocus, handleBlur, validateSubmit} from './assets/shared-functions.js';
const inputFields = [
    {
        id: "email",
        label: "البريد الإلكتروني",
        type: "email",
        placeholder: "ادخل عنوان بريدك الإلكتروني",
        hasButton: false,
        name: 'Email',
        pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    },
    {
        id: "pass",
        label: "كلمة السر",
        type: "password",
        placeholder: "ادخل كلمة السر",
        hasButton: true,
        icon: "./assets/view.svg",
        name: 'password',
        pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    },
    {
        id: "pin-num",
        label: "رمز التحقق",
        type: "number",
        placeholder: "رمز التحقق من خلال رسالة نصية",
        hasButton: true,
        icon: "./assets/arrow-down-01.svg",
        name: 'pin-code',
        pattern: null
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
    let passBtn = document.getElementById('forget-pass-btn')
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
        validateSubmit(inputFields, 'submit-btn');
    });
     inputFields.forEach(field => {
            let input = document.getElementById(field.id);
            input.addEventListener('focus', handleFocus);
            input.addEventListener('blur', (e) => {handleBlur(e, inputFields)});
            input.addEventListener('input', () => {validateSubmit(inputFields, 'submit-btn')})
        })
        passBtn.addEventListener('click', (event) => {
            event.preventDefault()
            window.location.assign("http://127.0.0.1:5500/change-password.html")
        })
    function setUpEvents(){
       
    }
}
document.addEventListener('DOMContentLoaded', renderInputs);