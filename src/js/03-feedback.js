const throttle = require('lodash.throttle');

const formRef = document.querySelector('.feedback-form');

const FEEDBACK_FORM_STATE = 'feedback-form-state';
const formData = {};

formRef.addEventListener('input', throttle(inputFormFields, 500));
formRef.addEventListener('submit', submitForms);

updateFormFields();

function inputFormFields(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(FEEDBACK_FORM_STATE, JSON.stringify(formData));
}

function submitForms(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(FEEDBACK_FORM_STATE);
}

function updateFormFields() {
  try {
    const savedData = JSON.parse(localStorage.getItem(FEEDBACK_FORM_STATE));
    if (savedData) {
      formRef.email.value = savedData.email;
      formRef.message.value = savedData.message;
    }
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}
