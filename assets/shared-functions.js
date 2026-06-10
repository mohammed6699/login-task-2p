   export function handleFocus(e){
        let input = e.target;
        input.style.backgroundColor="white"
        input.style.borderBottom="2px solid black"
        input.style.borderBottomLeftRadius="0"
        input.style.borderBottomRightRadius="0"
    }

    // export function handleBlur(e){
    //     let input = e.target;
    //     let inputField = inputFields.find((f) => f.id === input.id);
    //     let isValid = inputField.pattern
    //     ? inputField.pattern.test(input.value)
    //     : input.value.length > 0;
    //     input.style.border = isValid ? "1px solid black" : "1px solid red";
    // }
    export function handleBlur(e, config) {
    const input = e.target;
    const inputField = config.find((f) => f.id === input.id);
    
    const isValid = inputField.pattern
        ? inputField.pattern.test(input.value)
        : input.value.length > 0;
        
    input.style.border = isValid ? "1px solid black" : "1px solid red";
}

    // export function validateSubmit(){ 
    //     let submitButton = document.getElementById('submit-btn');
    //     let isValid = inputFields.every(field => {
    //         const input = document.getElementById(field.id);
    //         if(!input) return false;
    //         return field.pattern 
    //         ? field.pattern.test(input.value)
    //         : input.value.length > 0;
    //     })
    //     submitButton.disabled = !isValid;
    //     submitButton.style.backgroundColor = isValid ? '#B87B02' : '#9B5F01';
    // }
    export function validateSubmit(config, buttonId) { 
    const submitButton = document.getElementById(buttonId);
    if (!submitButton) return;

    const isValid = config.every(field => {
        const input = document.getElementById(field.id);
        if(!input) return false;
        return field.pattern 
            ? field.pattern.test(input.value)
            : input.value.length > 0;
    });
    
    submitButton.disabled = !isValid;
    submitButton.style.backgroundColor = isValid ? '#B87B02' : '#9B5F01';
}