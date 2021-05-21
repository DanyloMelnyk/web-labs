import { apiUrl } from './config';

const checkStatus = (response) => {
    if (response.ok) {
        return response;
    }
    return Promise.reject(response.status);
};

const request = (url, action, onError, method = 'GET', body = null, token = null) => {
    const headers = {};
    const init = {
        method,
    };

    if (body) {
        headers['Content-Type'] = 'application/json;charset=utf-8';
        init.body = JSON.stringify(body);
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    init.headers = headers;

    fetch(apiUrl + url, init)
        .then(checkStatus)
        .then((response) => response.json())
        .then(
            (data) => {
                action(data);
            },
            (msg) => {
                onError(msg);
            },
        );
};

const transaction = (url, action, onError, body, token = null) => {
    const method = 'post';
    const headers = {};
    const init = {
        method,
    };

    if (body) {
        headers['Content-Type'] = 'application/json;charset=utf-8';
        init.body = JSON.stringify(body);
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    init.headers = headers;

    fetch(apiUrl + url, init)
        .then((response) => {
            if (response.ok) {
                return response;
            }
            if (response.status === 404) {
                onError(response.text());
            }
            return Promise.reject(response.status);
        })
        .then((response) => response.json())
        .then(
            (data) => {
                action(data);
            },
            () => null,
        );
};

const postRequest = (url, action, onError, body, token = null) => {
    request(url, action, onError, 'POST', body, token);
};

const getRequest = (url, action, onError, token) => {
    request(url, action, onError, 'GET', null, token);
};

const deleteRequest = (url, action, onError, token) => {
    request(url, action, (error) => {
        if (error.message.startsWith('Unexpected end of JSON input')) {
            action();
        } else {
            onError(error);
        }
    }, 'DELETE', null, token);
};

const putRequest = (url, action, onError, body, token) => {
    request(url, action, onError, 'PUT', body, token);
};

export {
    getRequest, postRequest, putRequest, deleteRequest,
    transaction,
};
