const throttle = require('lodash.throttle');

const formRef = document.querySelector('.feedback-form');
const FEEDBACK_FORM_STATE = 'feedback-form-state';

formRef.addEventListener('input', throttle(inputFormFields, 500));
formRef.addEventListener('submit', submitForms);
addEventListener('DOMContentLoaded', updateFormFields);

function inputFormFields(e) {
  const storageData = loadData(FEEDBACK_FORM_STATE, {});
  storageData[e.target.name] = e.target.value;
  saveData(FEEDBACK_FORM_STATE, storageData);
}

function submitForms(e) {
  e.preventDefault();
  validateForm(e);
  const submitdData = loadData(FEEDBACK_FORM_STATE, {});
  if (Object.keys(submitdData).length === 2) {
    e.currentTarget.reset();
    console.log(submitdData);
    localStorage.removeItem(FEEDBACK_FORM_STATE);
  }
}

function updateFormFields() {
  const updateData = loadData(FEEDBACK_FORM_STATE, {});
  formRef.email.value = updateData.email || '';
  formRef.message.value = updateData.message || '';
}

function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

function loadData(key, defaultValue) {
  try {
    const result = JSON.parse(localStorage.getItem(key));
    return result ? result : defaultValue;
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

function validateForm(e) {
  const formData = new FormData(e.currentTarget);
  formData.forEach((value, name) => {
    if (value === '') {
      return alert('Please fill in all the fields!');
    }
  });
}
