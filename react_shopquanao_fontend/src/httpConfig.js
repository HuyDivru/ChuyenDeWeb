import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/";
const BASE_URLr = "http://localhost:8080/";

export function httpPost_t(url, param) {
    return axios.post(BASE_URLr + url, param, {
        headers: { 'Content-Type': 'application/json' }
    });
}

export function httpPost(url, param) {
    return axios.post(BASE_URL + url, param, {
        headers: { 'Content-Type': 'application/json' }
    });
}

export function httpGet(url) {
    return axios.get(BASE_URLr + url, {
        headers: { 'Content-Type': 'application/json' }
    });
}

export function httpGetwithToken(url, param) {
    param['userId'] = localStorage.getItem("user_id");
    return axios.get(BASE_URL + url, param, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });
}

export function httpPostwithToken(url, param) {
    param['userId'] = localStorage.getItem("user_id");
    return axios.post(BASE_URL + url, param, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });
}

export function httpPut(url, param) {
    return axios.put(BASE_URLr + url, param,{
        headers: { 'Content-Type': 'application/json' },
    });
}


export function httpDelete(url, param) {
    return axios.delete(BASE_URLr + url, {
        headers: { 'Content-Type': 'application/json' },
        data: param
    });
}


export function httpDeleteWithToken(url, param, token) {
    return axios.delete(BASE_URL + url, param, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

