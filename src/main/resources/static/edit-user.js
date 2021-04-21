import {
    apiUrl, checkPass, formAside, getRequest, putRequest,
} from './common.js';

let userId;

const pageUrl = window.location.pathname.split('/');
for (let i = pageUrl.length - 1; i > 0; i -= 1) {
    if (pageUrl[i] === 'edit') {
        userId = pageUrl[i - 1];
        break;
    }
}

const setDefaultFormVal = (user) => {
    document.getElementById('first-name').value = user.firstName;
    document.getElementById('last-name').value = user.lastName;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone;
    document.getElementById('role').value = user.role;
};

const saveUser = () => {
    const pass = document.getElementById('password');
    const passConfirm = document.getElementById('password-confirm');

    if (checkPass(pass, passConfirm)) {
        const data = new FormData(document.querySelector('form'));
        putRequest(`${apiUrl}user/${userId}`,
            () => {
                window.location.href = `/user/${userId}`;
            },
            JSON.stringify(Object.fromEntries(data)));
        return false;
    }
    return false;
};

getRequest(`${apiUrl}user/${userId}`, (user) => setDefaultFormVal(user));
document.getElementById('form').onsubmit = () => saveUser();

formAside();
