/**
 * FarmData Component
 * Displays data in a two-column grid.
 * Special handling for the Commercial Register file.
 */
export const FarmData = (data) => {
    return `
        <div id="farm-data-wrapper">
            <h2 class="section-title">بيانات المزرعة</h2>
            
            <form id="farm-display-form" dir="rtl">
                <div class="row-group">
                    <!-- Row 1 -->
                    <div class="form-group">
                        <div class="input-group">
                            <label class="group-label" for="group-input-email">اسم المزرعة</label>
                            <input id="group-input-email" type="text" value="${data['Email'] || ''}" name="${data['Email']}">
                        </div>
                        <div class="input-group-left">
                            <label class="group-label" for="group-input-phone">رقم الجوال</label>
                            <input id="group-input-phone" type="text" value="${data['Phone-Number'] || ''}" name="${data['Phone-Number']}">
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="input-group">
                            <label class="group-label" for="group-input-country">البلد</label>
                            <input id="group-input-country" type="text" value="${data['Country'] || ''}" name="${data['Country']}">
                        </div>
                        <div class="input-group-left">
                            <label class="group-label" for="group-input-PIN">الرقم الموحد / السجل التجاري</label>
                            <input id="group-input-PIN" type="text" value="${data['Commercial-register-Number'] || ''}" name="${data['Commercial-register-Number']}">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <div class="input-group">
                            <label class="group-label" for="group-input-Website">الموقع الإلكتروني</label>
                            <input id="group-input-Website" type="text" value="${data['Farm-Website'] || ''}" name="${data['Farm-Website']}">
                        </div>
                        <div class="input-group-left">
                            <label class="group-label" for="group-input-face">روابط التواصل الاجتماعي</label>
                            <input id="group-input-face" type="text" value="${data['Farm-Social-Media'] || ''}" name="${data['Farm-Social-Media']}">
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="input-group">
                            <label class="group-label" for="group-input-location">موقع المزرعة</label>
                            <input id="group-input-location" type="text" value="${data['Farm-Location'] || ''}" name="${data['Farm-Location']}">
                        </div>
                        <div class="input-group-left">
                            <label class="group-label" for="group-input-IBAN">رقم الـ IBAN</label>
                            <input id="group-input-IBAN" type="text" value="${data['IBAN-Number'] || ''}" name="${data['IBAN-Number']}">
                        </div>
                    </div>
                </div>
                <div class="input-group-full">
                    <label class="group-label" for="group-input-full">صورة السجل التجاري</label>
                    <p class="file-text">الحد الأقصى لحجم الملف المسموح به هو 2 ميجابايت، وتشمل الصيغ المدعومة .jpg و .png و .pdf.</p>
                    <input id="group-input-full" type="text" value="${data['IBAN-Number'] || ''}" name="${data['IBAN-Number']}">
                </div>
                <h1 id="change-pass">تغيير كلمة السر</h1>
                <div class="input-group">
                    <label class="group-label" for="group-input-pass">كلمة السر الحالية</label>
                    <div class="password-container">
                        <input id="group-input-pass" type="password" placeholder="أدخل كلمة السر الحالية">
                        <button type="button" class="toggle-password">
                            <img src="./assets/view.svg"/>
                        </button>
                    </div>
                </div>
                <div class="form-group">
                        <div class="input-group">
                            <label class="group-label" for="group-input-newpass">كلمة السر الجديدة</label>
                            <div class="password-container">
                                <input id="group-input-newpass" type="password" name="new-password" placeholder="أدخل كلمة السر الجديدة">
                                <button type="button" class="toggle-password">
                                    <img src="./assets/view.svg"/>
                                </button>
                            </div>
                        </div>
                        <div class="input-group-left">
                            <label class="group-label" for="group-input">تأكيد كلمة السر الجديدة</label>
                            <div class="password-container">
                                <input id="group-input-conpass" type="password" name="confirm-new-password" placeholder="تأكيد كلمة السر الجديدة">
                                <button type="button" class="toggle-password">
                                        <img src="./assets/view.svg"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id="change-pass-container">
                            <button id="change-pass-btn" type="button">
                            <p class="btn-text">تغيير كلمة السر</p>
                            </button>
                    </div>
            </form>
        </div>
    `;
};
export const initPasswordToggle = () => {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
            } else {
                input.type = 'password';
            }
        });
    });
};
