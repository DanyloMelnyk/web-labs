import { apiUrl, postRequest, checkPass } from './common.js';

const signUp = () => {
    const pass = document.getElementById('password');
    const passConfirm = document.getElementById('password-confirm');

    if (checkPass(pass, passConfirm)) {
        const data = new FormData(document.querySelector('form'));
        postRequest(`${apiUrl}user`, () => {
            window.location.href = '/';
        }, (error) => {
            if (error === 400) {
                document.getElementById('username-error').classList.remove('hide');
            }
        }, JSON.stringify(Object.fromEntries(data)));
        return false;
    }
    return false;
};

document.getElementById('form').onsubmit = () => signUp();
