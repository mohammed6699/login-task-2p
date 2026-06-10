
let codeInput = 
    [{
        id: "code-input",
        label: "كود التحقق",
        type: "number",
        placeholder: "ادخل كود التحقق",
        name: "check-code",
        pattern:  /^\d{8}$/
    }]

    function handleFocus(e){
        let input = e.target;
        input.style.backgroundColor="#E5E7EB"
        input.style.borderBottom="2px solid black"
        input.style.borderBottomLeftRadius="0"
        input.style.borderBottomRightRadius="0"
    }

   
function validateSubmit(){ 
        let submitButton = document.getElementById('submit-btn');
        let isValid = codeInput.every(field => {
            const input = document.getElementById(field.id);
            if(!input) return false;
            return field.pattern 
            ? field.pattern.test(input.value)
            : input.value.length > 0;
        })
        submitButton.disabled = !isValid;
        submitButton.style.backgroundColor = isValid ? '#cccfd6' : '#E5E7EB';
    }
    function handleBlur(e){
        let input = e.target;
        let inputField = codeInput.find((f) => f.id === input.id);
        let isValid = inputField.pattern
        ? inputField.pattern.test(input.value)
        : input.value.length > 0;
        input.style.border = isValid ? "1px solid black" : "1px solid red";
    }
function createInputComponent( {id, label, type, placeholder, name} ) {
    return `
        <div class="pass-style">
            <label for="${id}" id="user-label">${label}</label>
            <div class="password-container">
                <input id="${id}" type="${type}" placeholder="${placeholder}" name="${name}"/>
            </div>
        </div>
    `;
}
function renderInputs() {
    const container = document.getElementById('inputs-container');
    if (!container) return;
    const html = codeInput.map(field => createInputComponent(field)).join('');
    container.innerHTML = html;
    codeInput.forEach(filed => {
        let input = document.getElementById(filed.id);
        input.addEventListener('focus', handleFocus);
        input.addEventListener('blur', handleBlur);
        input.addEventListener('input', validateSubmit)
    }) 
    validateSubmit()
}

document.addEventListener('DOMContentLoaded', renderInputs);