import { FarmData, initPasswordToggle } from './components/FarmData.js';
import {FalconData} from './components/FalconData.js'

const storedFarmData = localStorage.getItem('FarmData');
if(storedFarmData){
    let farmStoredData = JSON.parse(storedFarmData);
    console.log(farmStoredData)
    // const farmName = farmStoredData['Farm-Name']
    const farmName = farmStoredData['Email']
    const farmTitle = document.getElementById('farm-name')
    if(farmTitle){
        farmTitle.textContent = farmName
    }else {
        console.log('error showing the farm name please check it')
    }
}else {
    console.log("No user data found in localStorage.")
}

let logout = document.getElementById('logout-btn');
logout.addEventListener('click', () => {
    localStorage.removeItem('FarmData');
    window.location.replace("http://127.0.0.1:5500/login.html");
})
let saveBtn = document.getElementById('save-btn');
saveBtn.addEventListener('click', () => {
    const currentFarmData = JSON.parse(localStorage.getItem('FarmData')) || {};
    currentFarmData['Email'] = document.getElementById('group-input-email').value;
    currentFarmData['Phone-Number'] = document.getElementById('group-input-phone').value;
    currentFarmData['Country'] = document.getElementById('group-input-country').value;
    currentFarmData['Commercial-register-Number'] = document.getElementById('group-input-PIN').value;
    currentFarmData['Farm-Website'] = document.getElementById('group-input-Website').value;
    currentFarmData['Farm-Social-Media'] = document.getElementById('group-input-face').value;
    currentFarmData['Farm-Location'] = document.getElementById('group-input-location').value;
    currentFarmData['IBAN-Number'] = document.getElementById('group-input-IBAN').value;

    localStorage.setItem('currentFarmData', JSON.stringify(currentFarmData))
    console.log(currentFarmData)
})

function renderProfileSection(){
    const divData = [
    {id:'farm', title: 'معلومات المزرعة'},
    {id:'falcon', title: 'صقور المزرعة'},
    {id:'products', title: 'المعروضات'}
]
// create container
let divContainer = document.getElementById('side-bar-container');
if(divContainer){
    divContainer.innerHTML = divData.map(item => 
        `
            <div class='nav-btn' data-id="${item.id}" style='cursor: pointer;'>
                <div id="nav-btn">
                    <div id="nav-content" style='cursor: pointer;'>
                       <p>${item.title}</p>
                       <button class="chevron-btn">
                           <img src="./assets/Chevron.svg"/>
                       </button>
                    </div>
                </div>
                <hr class="hr-line">
            </div>
        `
    ).join('')
}
    const target = document.getElementById('dynamic-data');
    
    function changePass(){
            let changePassBtn = document.getElementById('change-pass-btn');
        if(changePassBtn){
            changePassBtn.addEventListener('click', () => {
                let currentPass = document.getElementById('group-input-pass').value;
                let newPass = document.getElementById('group-input-newpass').value;
                let confirmedPass = document.getElementById('group-input-conpass').value;
                if (!currentPass || !newPass || !confirmedPass) {
                    alert("يرجى ملء جميع حقول كلمة السر");
                    return;
                }
                if(newPass !== confirmedPass){
                    alert('يجب ان تكون كلمة السر الجديدة متشابها');
                    return
                }
                let cureentData = JSON.parse(localStorage.getItem('FarmData'))
                cureentData['password'] = newPass;
                localStorage.setItem('FarmData', JSON.stringify(cureentData))
                alert("تم تغيير كلمة السر بنجاح!");
                console.log('password: ', cureentData)
            })
        }
        }

    // 1. Get the raw data from LocalStorage
    const storedFarmData = JSON.parse(localStorage.getItem('FarmData'));
    if (storedFarmData) {
        // chnage password logic
        changePass();
    } else {
        target.innerHTML = `<p>لم يتم العثور على بيانات. يرجى تسجيل الدخول.</p>`;
    }
    // switch buttons
    function switchTap(tabId) {
        let divContainer = document.getElementById('dynamic-data');
        const storedData = JSON.parse(localStorage.getItem('FarmData'));
        if(tabId === 'farm'){
            target.innerHTML = FarmData(storedFarmData);
            initPasswordToggle();
            changePass();
        } else if(tabId === 'falcon'){
            target.innerHTML = FalconData();
        } else {
            target.innerHTML = `<h3>${tabId} coming soon...</h3>`;
        }
    }
    document.querySelectorAll('.nav-btn').forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            const tabId = wrapper.getAttribute('data-id');
            switchTap(tabId);
            
        })
    }
    )
}
    
renderProfileSection();