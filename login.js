const inputFields = [
    {
        id: "email",
        label: "البريد الإلكتروني",
        type: "email",
        placeholder: "ادخل عنوان بريدك الإلكتروني",
        hasButton: false
    },
    {
        id: "pass",
        label: "كلمة السر",
        type: "password",
        placeholder: "ادخل كلمة السر",
        hasButton: true,
        icon: "./assets/view.svg"
    },
    {
        id: "pin-num",
        label: "رمز التحقق",
        type: "number",
        placeholder: "رمز التحقق من خلال رسالة نصية",
        hasButton: true,
        icon: "./assets/arrow-down-01.svg"
    }
];

function createInputComponent({ id, label, type, placeholder, hasButton, icon }) {
    return `
        <div class="div-style">
            <label for="${id}" id="user-label">${label}</label>
            <div class="password-container">
                <input id="${id}" type="${type}" placeholder="${placeholder}" />
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
}

document.addEventListener('DOMContentLoaded', renderInputs);
