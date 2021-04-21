import {
    apiUrl, deleteRequest, formAside, getRequest, main,
} from './common.js';

let userId;

const pageUrl = window.location.pathname.split('/');
for (let i = pageUrl.length - 1; i > 0; i -= 1) {
    if (pageUrl[i].length > 0) {
        userId = pageUrl[i];
        break;
    }
}

const formUserpage = (user) => {
    const { username } = user;
    const { firstName } = user;
    const { lastName } = user;
    const { email } = user;
    const { phone } = user;
    const { role } = user;

    const userUrl = `/user/${user.id}`;

    const section = document.createElement('section');

    const deleteUser = () => {
        deleteRequest(`${apiUrl}user/${user.id}`, () => {
        });
    };

    section.className = 'card';
    section.innerHTML = `
        <div class="head">
            <h2>${username}</h2>
            <div class="actions">
                <a class="edit" href="${userUrl}/edit"><i class="fas fa-edit"></i></a>
                <a id="deleteBtn" href="/login" class="delete"><i class="fas fa-trash"></i></a>
            </div>
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

    main.appendChild(section);
    document.getElementById('deleteBtn').onclick = () => deleteUser();
};

getRequest(`${apiUrl}user/${userId}`, (data) => {
    formUserpage(data);
});

formAside();
