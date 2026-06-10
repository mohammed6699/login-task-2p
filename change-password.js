import {handleFocus, handleBlur, validateSubmit} from './assets/shared-functions.js';

const passFields = [
    {
        id: "pass",
        label: "ادخل كلمة السر الجديدة",
        type: "password",
        placeholder: "Saudi_Falcon_91",
        hasButton: true,
        icon: "./assets/Suffix.svg",
        name: 'password',
        pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        matching: null
    },
    {
        id: "pin-num",
        label: "إعادة كلمة السر",
        type: "password",
        placeholder: "إعادة كلمة السر",
        hasButton: true,
        icon: "./assets/arrow-down-01.svg",
        name: 'pin-code',
        pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        matching: "pass"
    }
];

function createInputComponent({ id, label, type, placeholder, hasButton, icon, name }) {
    return `
        <div class="pass-style">
            <label for="${id}" id="user-label">${label}</label>
            <div class="password-container">
                <input id="${id}" type="${type}" placeholder="${placeholder}" name="${name}"/>
                ${hasButton ? `
                    <button type="button" class="toggle-password" id="btn-pass">
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

    const html = passFields.map(field => createInputComponent(field)).join('');
    container.innerHTML = html;
    const toggleButtons = container.querySelectorAll('#btn-pass');
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
    passFields.forEach(field => {
        let input = document.getElementById(field.id);
        input.addEventListener('focus', handleFocus);
        input.addEventListener('blur', (e) => {handleBlur(e, passFields)});
        input.addEventListener('input', () => {validateSubmit(passFields, 'submit-btn')})
    })
    validateSubmit(passFields, 'submit-btn')
}

document.addEventListener('DOMContentLoaded', renderInputs);
