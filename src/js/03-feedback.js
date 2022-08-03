const throttle = require('lodash.throttle');

const formRef = document.querySelector('.feedback-form');

const FEEDBACK_FORM_STATE = 'feedback-form-state';
let savedStorageData;
formRef.addEventListener('input', throttle(inputFormFields, 500));
formRef.addEventListener('submit', submitForms);
document.addEventListener('DOMContentLoaded', updateFormFields);

function inputFormFields(e) {
  savedStorageData[e.target.name] = e.target.value;
  localStorage.setItem(FEEDBACK_FORM_STATE, JSON.stringify(savedStorageData));
}

function submitForms(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(FEEDBACK_FORM_STATE);
  console.log(savedStorageData);
}

function updateFormFields() {
  try {
    const savedData = localStorage.getItem(FEEDBACK_FORM_STATE);
    savedStorageData = savedData ? JSON.parse(savedData) : {};
    if (savedStorageData) {
      formRef.email.value = savedStorageData.email || '';
      formRef.message.value = savedStorageData.message || '';
    }
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}
