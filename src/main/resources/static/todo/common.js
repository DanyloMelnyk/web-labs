const apiUrl = '/api/v1/';

const main = document.querySelector('main');
const sidebar = document.querySelector('aside');

const checkStatus = (response) => {
    if (response.ok) {
        return response;
    }
    return Promise.reject(response.status);
};

const putRequest = (url, action, body) => {
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body,
    })
        .then(checkStatus)
        .then((response) => response.json())
        .then((data) => {
            action(data);
        })
        .catch(() => {
            // `Error ${msg} when send PUT to ${url}!`
        });
};

const formAsideWallets = (wallets) => {
    const sideWallet = document.createElement('section');
    sideWallet.className = 'card';

    sideWallet.innerHTML = `<div class="head">
            <h2><a class="link" href="/">My wallets</a></h2>
        </div>`;

    const sideWalletList = document.createElement('ul');
    sideWallet.appendChild(sideWalletList);
    sidebar.appendChild(sideWallet);

    wallets.forEach((wallet) => {
        const {name} = wallet;
        const walletUrl = `/wallet/${wallet.id}`;
        const {balance} = wallet;
        const {currency} = wallet;

        const li = document.createElement('li');

        li.innerHTML = `<a class="link" href="${walletUrl}">
                    <div class="row">
                        <p class="field-label">${name}:</p>
                        <p class="field">${balance} ${currency}</p>
                    </div>
                </a>`;

        sideWalletList.appendChild(li);
    });
};

const formAsideUser = (user) => {
    const sideUserProfile = document.createElement('section');
    sideUserProfile.className = 'card';

    sidebar.appendChild(sideUserProfile);

    const {firstName} = user;
    const {lastName} = user;
    const {email} = user;
    const {phone} = user;
    const {role} = user;

    const userUrl = '/user/current';

    sideUserProfile.innerHTML = `<div class="head">
            <h2><a class="link" href="${userUrl}">My profile</a></h2>
            </div>

            <div class="row">
                <p class="field-label">First name:</p>
                <p class="field">${firstName}</p>
            </div>
            <div class="row">
                <p class="field-label">Last name:</p>
                <p class="field">${lastName}</p>
            </div>
            <div class="row">
                <p class="field-label">Email:</p>
                <p class="field">${email}</p>
            </div>
            <div class="row">
                <p class="field-label">Phone:</p>
                <p class="field">${phone}</p>
            </div>
            <div class="row">
                <p class="field-label">Role:</p>
                <p class="field">${role}</p>
            </div>`;
};

const formAside = () => {
    getRequest(`${apiUrl}user/current`, (data) => {
        formAsideUser(data);
    });

    getRequest(`${apiUrl}wallet`, (data) => {
        formAsideWallets(data);
    });
};

const checkPass = (passInput, passConfirmInput) => {
    if (passInput.value !== passConfirmInput.value) {
        passConfirmInput.classList.add('invalid');
        return false;
    }
    passConfirmInput.classList.remove('invalid');
    return true;
};

export {
    apiUrl, main, sidebar,
    checkStatus, checkPass,
    putRequest,
    formAside,
};
