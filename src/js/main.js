import '../styles/globals.css';

const hello = () => 'world!';

document.addEventListener('DOMContentLoaded', () => {
  document.body.querySelector('h1').innerHTML += ` ${hello()}`;
});