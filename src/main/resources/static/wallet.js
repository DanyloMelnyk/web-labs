import {
    apiUrl, deleteRequest, formAside, getRequest, main,
} from './common.js';

let walletId;

const pageUrl = window.location.pathname.split('/');
for (let i = pageUrl.length - 1; i > 0; i -= 1) {
    if (pageUrl[i].length > 0) {
        walletId = pageUrl[i];
        break;
    }
}

const formatWallet = (wallet) => {
    const { name } = wallet;
    const walletUrl = `/wallet/${wallet.id}`;
    const { balance } = wallet;
    const { currency } = wallet;

    const deleteWallet = () => {
        deleteRequest(`${apiUrl}wallet/${wallet.id}`, () => {
        });
    };

    const section = document.createElement('section');

    section.className = 'card';

    section.innerHTML = `<div class="head">
            <h2>${name}</h2>
            <div class="actions">
                <a class="edit" href="${walletUrl}/edit"><i class="fas fa-edit"></i></a>
                <a id="deleteBtn" class="delete" href="/"><i class="fas fa-trash"></i></a>
                <a class="send" href="${walletUrl}/send"><i class="fas fa-share"></i></a>
            </div>
        </div>
        <div class="row">
            <p class="field-label">Wallet id:</p>
            <p class="field">${walletId}</p>
        </div>
        <div class="row">
            <p class="field-label">Balance:</p>
            <p class="field">${balance}</p>
        </div>
        <div class="row">
            <p class="field-label">Currency:</p>
            <p class="field">${currency}</p>
        </div>`;

    main.appendChild(section);
    document.getElementById('deleteBtn').onclick = () => deleteWallet();
};

getRequest(`${apiUrl}wallet/${walletId}`, (data) => {
    formatWallet(data);
});

formAside();
