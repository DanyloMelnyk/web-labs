import {
    apiUrl, formAside, getRequest, putRequest,
} from './common.js';

let walletId;

const pageUrl = window.location.pathname.split('/');
for (let i = pageUrl.length - 1; i > 0; i -= 1) {
    if (pageUrl[i] === 'edit') {
        walletId = pageUrl[i - 1];
        break;
    }
}
const setDefaultFormVal = (wallet) => {
    document.getElementById('wallet-name').value = wallet.name;
    document.getElementById('balance').value = wallet.balance;
    document.getElementById('currency').value = wallet.currency;
};

const saveWallet = () => {
    const data = new FormData(document.querySelector('form'));
    putRequest(`${apiUrl}wallet/${walletId}`,
        () => {
            window.location.href = `/wallet/${walletId}`;
        },
        JSON.stringify(Object.fromEntries(data)));
    return false;
};

getRequest(`${apiUrl}wallet/${walletId}`, (wallet) => setDefaultFormVal(wallet));

document.getElementById('form').onsubmit = () => saveWallet();

formAside();
