import {
    apiUrl, formAside, postRequest,
} from './common.js';

const send = () => {
    const data = new FormData(document.querySelector('form'));
    postRequest(`${apiUrl}wallet`,
        (wallet) => {
            window.location.href = `/wallet/${wallet.id}`;
        },
        () => {
        },
        JSON.stringify(Object.fromEntries(data)));

    return false;
};

document.getElementById('form').onsubmit = () => send();

formAside();
