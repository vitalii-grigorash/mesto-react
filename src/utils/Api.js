import {apiOptions} from './utils';

export class Api {
    constructor(data) {
        this._baseUrl = data.baseUrl;
        this._headers = data.headers;
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(this._returnErrorResponse)
    }

    _returnErrorResponse(res) {
        if (res.ok) {
          return res.json();
        }
        Promise.reject(new Error(`Ошибка: ${res.status}`));
    }

    getUserInfo () {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(this._returnErrorResponse)
    }

    setUserInfo (formData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: formData.name,
                about: formData.job
            })
        })
        .then(this._returnErrorResponse)
    }    

    setAvatar (formData) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: formData.link
            })
        })
        .then(this._returnErrorResponse)
    }

    addCard (formData) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: formData.name,
                link: formData.link,
            })
        })
        .then(this._returnErrorResponse)
    }

    removeCard (cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._returnErrorResponse)
    }

    addLike (cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers
        })  
        .then(this._returnErrorResponse) 
    }

    removeLike (cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._returnErrorResponse)
    }
}

export const api = new Api(apiOptions);