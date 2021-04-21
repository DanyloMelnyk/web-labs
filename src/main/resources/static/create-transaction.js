import {
    apiUrl, formAside, getRequest, postRequest,
} from './common.js';

let walletId;

const pageUrl = window.location.pathname.split('/');
for (let i = pageUrl.length - 1; i > 0; i -= 1) {
    if (pageUrl[i].length > 0) {
        walletId = pageUrl[i - 1];
        break;
    }
}

const setDefaultFormVal = (wallet) => {
    document.getElementById('sum').max = wallet.balance;
    document.getElementById('sum').value = wallet.balance;
    document.getElementById('username').value = wallet.user_name;
};

const send = () => {
    const data = new FormData(document.querySelector('form'));
    postRequest(`${apiUrl}wallet/${walletId}/send`,
        () => {
            window.location.href = `/wallet/${walletId}`;
        },
        (error) => {
            if (error === 404) {
                document.getElementById('wallet-error').classList.remove('hide');
            }
        },
        JSON.stringify(Object.fromEntries(data)));

    return false;
};

getRequest(`${apiUrl}wallet/${walletId}`, (wallet) => setDefaultFormVal(wallet));

document.getElementById('form').onsubmit = () => send();

formAside();
