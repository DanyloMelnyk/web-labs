import {
    apiUrl, main, getRequest, formAside, deleteRequest,
} from './common.js';

const formatUsers = (users) => {
    users.forEach((user) => {
        const userUrl = `/user/${user.id}`;

        const deleteUser = () => {
            deleteRequest(`${apiUrl}user/${user.id}`, () => {
            });
        };

        const section = document.createElement('section');

        section.className = 'card';
        section.innerHTML = `<div class="head">
            <h2><a class="link" href="${userUrl}">${user.username}</a></h2>
            <div class="actions">
                <a id="deleteBtn-${user.id}" class="delete" href="/user"><i class="fas fa-trash"></i></a>
            </div>
        </div>


        <div class="row">
            <p class="field-label">First name:</p>
            <p class="field">${user.firstName}</p>
        </div>
        <div class="row">
            <p class="field-label">Last name:</p>
            <p class="field">${user.lastName}</p>
        </div>
        <div class="row">
            <p class="field-label">Email:</p>
            <p class="field">${user.email}</p>
        </div>
        <div class="row">
            <p class="field-label">Phone:</p>
            <p class="field">${user.phone}</p>
        </div>
        <div class="row">
            <p class="field-label">Role:</p>
            <p class="field">${user.role}</p>
        </div>`;

        main.appendChild(section);
        document.getElementById(`deleteBtn-${user.id}`).onclick = () => deleteUser();
    });
};

getRequest(`${apiUrl}user`, (data) => {
    formatUsers(data);
});

formAside();
