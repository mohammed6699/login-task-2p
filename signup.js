import {handleFocus, handleBlur, validateSubmit} from './assets/shared-functions.js';

const inputFields = [
    {
        id: "farm-name",
        label: "اسم المزرعة",
        type: "text",
        placeholder: "ادخل عنوان بريدك الإلكتروني",
        hasButton: false,
        name: 'Farm-Name',
        pattern: /^[A-Za-z0-9_-]{3,15}$/,
        matching: null,
        isRequired: true
    },
    {
        id: "phone-num",
        label: "رقم الجوال",
        type: 'Number',
        placeholder: '00 000 0000',
        hasButton: true,
        name: 'Phone-Number',
        pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        matching: null,
        isRequired: true
    },
    {
        id:"Commercial-num",
        label: 'الرقم الموحد/رقم السجل التجاري',
        placeholder: '1234567890',
        hasButton: false,
        name: 'Commercial-register-Number',
        pattern: /^\d{10}$/,
        matching: null,
        isRequired: true
    },
    {
        id: 'uban-num',
        label: 'رقم ال IBAN الخاص بالمزرعة',
        placeholder: '1234567890',
        hasButton: false,
        name: 'IBAN-Number',
        pattern: /^\d{8}$/,
        matching: null,
        isRequired: true
    },
    {
        id: 'country',
        label: 'البلد',
        placeholder: 'اختر من القائمة',
        hasButton: true,
        name: 'Country',
        icon: "./assets/arrow-down-01.svg",
        pattern: /^[A-Za-z]{5,}/,
        matching: null,
        isRequired: true
    },
    {
        id: 'pass',
        label: 'كلمة السر',
        placeholder: 'ادخل كلمة السر',
        hasButton: true,
        name: 'Password',
        icon: './assets/view.svg',
        pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        matching: null,
        isRequired: true
    },
    {
        id: 'conf-pass',
        label: 'إعادة كلمة السر',
        placeholder: 'ادخل كلمة السر مرة ثانية',
        hasButton: true,
        name: 'New-Password',
        icon: './assets/view.svg',
        pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        matching: "pass",
        isRequired: true
    },
    {
        id: 'farm-loc',
        label: 'موقع المزرعة',
        placeholder: 'maps.google.com/0123456789',
        hasButton: false,
        name: 'Farm-Location',
        icon: null,
        pattern: null,
        matching: null,
        isRequired: true
    },
    {
        id: 'web',
        label: 'الموقع الإلكتروني',
        placeholder: 'www.website.com',
        hasButton: false,
        name: 'Farm-Website',
        icon: null,
        pattern: null,
        matching: null,
        isRequired: true
    },
    {
        id: 'social-media',
        label: 'روابط التواصل الاجتماعي',
        placeholder: 'facebook.com/FalconFarm',
        hasButton: false,
        name: 'Farm-Social-Media',
        icon: null,
        pattern: null,
        matching: null,
        isRequired: true
    }
]
function createInputComponent({ id, label, type, placeholder, hasButton, icon, name, isRequired }) {
    return `
        <div class="div-style">
            <label for="${id}" id="user-label">${label}</label>
            <div class="password-container">
                <input id="${id}" type="${type}" placeholder="${placeholder}" name="${name}" required="${isRequired}"/>
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

    // const html = inputFields.map(field => createInputComponent(field))
    const html = inputFields.map(filed => {
        if (filed.id === 'phone-num') {
            return `
                <div class="div-style">
                    <label for="${filed.id}" id="user-label">${filed.label}</label>
                    <div class="input-group" dir="rtl">
                        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: #F3F4F6; border: none; border-left: 1px solid #E2E8F0; border-radius: 0 4px 4px 0; height: 40px; padding: 0 12px;">
                            +966
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">+966</a></li>
                            <li><a class="dropdown-item" href="#">+971</a></li>
                            <li><a class="dropdown-item" href="#">+965</a></li>
                        </ul>
                        <input type="number" id="${filed.id}" class="form-control" placeholder="${filed.placeholder}" name="${filed.name}" required="${filed.isRequired}" style="background-color: #F3F4F6; border: none; border-radius: 4px 0 0 4px; height: 40px;">
                    </div>
                </div>
            `;
        }
        let component = createInputComponent(filed);
        if(filed.id === 'Commercial-num'){
            component += `
                <div id="com-data">
                    <h1>صورة عن السجل التجاري</h1>
                    <p>الحد الأقصى لحجم الملف المسموح به هو 2 ميجابايت، وتشمل الصيغ المدعومة .jpg و .png و .pdf.</p>
                    <div id="upload-content">
                        <div id="upload-btn">
                            <button type="button" id="custom-upload-btn" class="browse-btn">تصفح الملفات</button>
                        </div>
                        <div class="file-data">
                                <div id="initial-upload">
                                    <input type="file" id="add-file" />
                                </div>
                                <div id="success-upload">
                                <div>
                                    <img src="./assets/Feedback Icon.svg" id="success-icon" alt="success"/>
                                    <span id="file-name-text" style="font-size: 14px;"></span>
                                </div>
                                <div>
                               <button type="button" id="remove-file-btn">X</button>
                            </div>
                        </div>
                        </div> 
                    </div>
                    
                </div>
            `;
        }
        return component
    }).join('');
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
            input.addEventListener('input', () => {validateSubmit(inputFields, 'submit-btn')});
        })
        // upload files
       let customeBtn = document.getElementById('custom-upload-btn');
       let addInput = document.getElementById('add-file');
       let addDiv = document.getElementById('initial-upload');
       let successDiv = document.getElementById('success-upload');
       let fileTextName = document.getElementById('file-name-text');
       let removeBtn = document.getElementById('remove-file-btn');
       let uploadCOntent = document.getElementById('upload-btn');
       let divData = document.querySelector('.file-data');
       // when file selcted
       if(customeBtn && addInput){
        customeBtn.addEventListener('click', () => addInput.click());
        // select file
        
        addInput.addEventListener('change', function(){
            if(this.files && this.files.length > 0){
                const fileName = this.files[0].name.trim();
                fileTextName.textContent = fileName;
                addDiv.style.display = 'none';
                uploadCOntent.style.display='none'
                successDiv.style.display = 'flex'
                divData.style.display = 'flex';
                successDiv.style.display='flex';
                successDiv.style.justifyContent='space-between';
                successDiv.style.width = '100%'
            }
        })
        // remove btn x
        removeBtn.addEventListener('click', () => {
            addInput.value = '';
            addDiv.style.display = 'block';
            successDiv.style.display = 'none';
            uploadCOntent.style.display = 'flex'
            divData.style.display = 'none';
        })
       }

    // Modal Close Logic
    const errorModalOverlay = document.getElementById('error-modal-overlay');
    const closeBtn = document.getElementById('x-btn');

    function closeModal() {
        if (errorModalOverlay) {
            errorModalOverlay.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (errorModalOverlay) {
        errorModalOverlay.addEventListener('click', (e) => {
            if (e.target === errorModalOverlay) {
                closeModal();
            }
        });
    }

    // Form Submission Logic
    const signupForm = document.getElementById('user-data');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const isValid = inputFields.every(field => {
                const input = document.getElementById(field.id);
                if (!input) return false;
                
                let isPatternValid = field.pattern 
                    ? field.pattern.test(input.value)
                    : input.value.length > 0;
                
                let matching = true;
                if (field.matching) {
                    const targetInput = document.getElementById(field.matching);
                    if (targetInput) {
                        matching = (input.value === targetInput.value);
                    }
                }
                
                return isPatternValid && matching;
            });

            if (isValid) {
                // If valid, redirect to success page
                window.location.replace("http://127.0.0.1:5500/register-success.html");
            } else {
                // If invalid, show the error modal
                if (errorModalOverlay) {
                    errorModalOverlay.style.display = 'flex';
                    document.body.classList.add('no-scroll');
                }
            }
        });
    }

}
document.addEventListener('DOMContentLoaded', renderInputs);