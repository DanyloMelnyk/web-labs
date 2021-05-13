import {
    apiUrl, main, getRequest, formAside, deleteRequest,
} from './common.js';

const formatWallets = (wallets) => {
    wallets.forEach((wallet) => {
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
        section.innerHTML = '<div class="head">\n'
            + `<h2><a class="link" href="${walletUrl}">${name}</a></h2>\n`
            + '<div class="actions">\n'
            + `<a class="edit" href="${walletUrl}/edit"><i class="fas fa-edit"></i></a>\n`
            + `<a id="deleteBtn-${wallet.id}" class="delete" href="/"><i class="fas fa-trash"></i></a>\n`
            + `<a class="send" href="${walletUrl}/send"><i class="fas fa-share"></i></a>\n`
            + '</div>\n'
            + '</div>\n'
            + '<div class="row">\n'
            + '<p class="field-label">Id:</p>\n'
            + `<p class="field">${wallet.id}</p>\n`
            + '</div>\n'
            + '<div class="row">\n'
            + '<p class="field-label">Balance:</p>\n'
            + `<p class="field">${balance}</p>\n`
            + '</div>\n'
            + '<div class="row">\n'
            + '<p class="field-label">Currency:</p>\n'
            + `<p class="field">${currency}</p>\n`
            + '</div>';

        main.appendChild(section);
        document.getElementById(`deleteBtn-${wallet.id}`).onclick = () => deleteWallet();
    });
};

getRequest(`${apiUrl}wallet`, (data) => {
    formatWallets(data);
});

formAside();
