const inputFields = [
   
    {
        id: "pass",
        label: "ادخل كلمة السر الجديدة",
        type: "password",
        placeholder: "Saudi_Falcon_91",
        hasButton: true,
        icon: "./assets/Suffix.svg"
    },
    {
        id: "pin-num",
        label: "إعادة كلمة السر",
        type: "password",
        placeholder: "إعادة كلمة السر",
        hasButton: true,
        icon: "./assets/arrow-down-01.svg"
    }
];

function createInputComponent({ id, label, type, placeholder, hasButton, icon }) {
    return `
        <div class="pass-style">
            <label for="${id}" id="user-label">${label}</label>
            <div class="password-container">
                <input id="${id}" type="${type}" placeholder="${placeholder}" />
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

    const html = inputFields.map(field => createInputComponent(field)).join('');
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
}

document.addEventListener('DOMContentLoaded', renderInputs);
