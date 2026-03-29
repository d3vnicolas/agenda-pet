import "../styles/globals.css"

const input = document.getElementById('date');
const generalInput = document.querySelector('.header__date-picker');

generalInput.addEventListener('click', () => {
  input.showPicker();
});

input.addEventListener('change', () => {
  const value = input.value;
  const text = document.getElementById('date-text');

  if (!value) return;

  const [year, month, day] = value.split('-');
  text.textContent = `${day}/${month}/${year}`;
});
