# Vanilla JS "React-Like" Component Architecture

This document explains how to manage dynamic content within the `#dynamic-data` container in `profile.html` using patterns that simulate **React's JSX and Component system**.

---

## 1. The Functional Component Pattern
Instead of multiple HTML files, use JavaScript functions to "render" different UI sections into a shell.

### Defining Components
A component is a function that returns a string of HTML. You can pass "Props" (data) into these functions.

```javascript
/**
 * FarmInfo Component
 */
export const FarmInfoComponent = (props) => {
    return `
        <div class="card">
            <h3>معلومات المزرعة</h3>
            <div class="form-group">
                <label>الاسم الحالي:</label>
                <input type="text" id="input-name" value="${props.name || ''}" class="styled-input">
            </div>
            <button id="update-btn" class="primary-btn">تحديث البيانات</button>
        </div>
    `;
};
```

### The Renderer
```javascript
function renderFarmInfo() {
    const target = document.getElementById('dynamic-data');
    
    // 1. Inject the HTML (The "Render" phase)
    target.innerHTML = FarmInfoComponent({
        name: storedData['Farm-Name']
    });

    // 2. Attach Event Listeners (The "Effect" phase)
    const updateBtn = document.getElementById('update-btn');
    if (updateBtn) {
        updateBtn.addEventListener('click', () => {
            console.log("Saving...");
        });
    }
}
```

---

## 2. Using Raw HTML Files (The "Fetch" Pattern)
If you prefer writing your UI in actual `.html` files (to get full CSS support and HTML autocomplete in your editor), you can use the `fetch` API to "import" them.

### Step 1: Create an HTML "Partial"
Create a file like `components/farm-info.html` (only the inner tags).

```html
<!-- components/farm-info.html -->
<div class="farm-info-container">
    <h1 class="header-text">إعدادات المزرعة</h1>
    <p class="desc">قم بتعديل بياناتك هنا</p>
    <div class="input-group">
        <input type="text" id="edit-name" placeholder="اسم المزرعة">
    </div>
</div>
```

### Step 2: Create a Dynamic Loader in `profile.js`
```javascript
async function loadSection(fileName) {
    const target = document.getElementById('dynamic-data');
    
    try {
        // 1. Fetch the raw HTML file content
        const response = await fetch(`./components/${fileName}.html`);
        const htmlContent = await response.text();
        
        // 2. Inject it into the main container
        target.innerHTML = htmlContent;
        
        // 3. Attach logic/listeners after injection
        if (fileName === 'farm-info') {
            document.getElementById('edit-name').addEventListener('input', (e) => {
                console.log(e.target.value);
            });
        }
        
    } catch (error) {
        console.error("Error loading the HTML file:", error);
    }
}

// Usage: When a sidebar button is clicked
loadSection('farm-info'); 
```

---

## 3. The "Native Template" Pattern
Alternatively, you can keep all your components inside the main `profile.html` using the `<template>` tag. These tags are hidden by the browser until you "activate" them.

### Step 1: Define Templates in `profile.html`
```html
<template id="farm-info-template">
    <div class="farm-card">
        <h2>أهلاً بك في مزرعتك</h2>
        <input type="text" placeholder="اسم المزرعة">
    </div>
</template>
```

### Step 2: Activate them in `profile.js`
```javascript
function renderFromTemplate(templateId) {
    const target = document.getElementById('dynamic-data');
    const template = document.getElementById(templateId);
    
    // Clear current content
    target.innerHTML = '';
    
    // Clone and append the template content
    const clone = template.content.cloneNode(true);
    target.appendChild(clone);
}
```

---

## 4. Why use this approach?

1.  **Consistent UI**: The Header and Sidebar never reload.
2.  **Clean Separation**: You can author HTML in `.html` files for better editor support.
3.  **Scalability**: Adding a new section is as easy as adding a new HTML file and calling `loadSection()`.
4.  **No Refresh**: Transitions between sections are instant.

---

### Comparison Summary

| Feature | Template Literal (JS) | Fetch HTML File | Native Template Tag |
| :--- | :--- | :--- | :--- |
| **Editor Support** | ❌ (Strings only) | ✅ (Full HTML/CSS) | ✅ (Full HTML/CSS) |
| **Logic/Props** | ✅ Easy to pass props | ❌ Requires manual injection | ❌ Requires manual injection |
| **Performance** | ✅ Fastest | ⚠️ Needs network request | ✅ Fast |
| **Use Case** | Small, data-heavy bits | Large, complex pages | Small, static UI parts |

---

## 5. Practical Example: Displaying Stored Farm Data

Here is how you implement the `FarmData` component to show data previously saved during the signup process.

### File: `components/FarmData.js`
This file acts as your "React Component".

```javascript
export const FarmData = (data) => {
    return `
        <div id="farm-info-display">
            <h2>بيانات المزرعة المسجلة</h2>
            <div class="info-group">
                <label>اسم المزرعة:</label>
                <p>${data['Farm-Name'] || 'غير مسجل'}</p>
            </div>
            <div class="info-group">
                <label>رقم الجوال:</label>
                <p>${data['Phone-Number'] || 'غير مسجل'}</p>
            </div>
            <!-- Add other fields here -->
        </div>
    `;
};
```

### File: `profile.js` (The Controller)
This is where you bridge the `localStorage` data with your Component.

```javascript
import { FarmData } from './components/FarmData.js';

function renderProfileSection() {
    const target = document.getElementById('dynamic-data');
    
    // 1. Get the raw data from LocalStorage
    const storedFarmData = JSON.parse(localStorage.getItem('FarmData'));

    if (storedFarmData) {
        // 2. Pass the data into the component and inject the result
        target.innerHTML = FarmData(storedFarmData);
    } else {
        target.innerHTML = `<p>لم يتم العثور على بيانات. يرجى تسجيل الدخول.</p>`;
    }
}

// Initial Call or Sidebar Trigger
renderProfileSection();
```
