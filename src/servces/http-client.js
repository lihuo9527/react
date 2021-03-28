import axios from 'axios';
import { objectTranferArray } from '../share/methods.js';
import environment from '../environments/environment.js';
var baseUrl = environment.baseUrl;
var token = 'xxx';
var httpRequest = axios.create({
    baseURL: baseUrl, //api地址
    timeout: 15000 //超时时间
});
const loginUrl = '/account/login';
let returnUrl = [];
function create(args) {
    if (args.length % 2 !== 0) {
        throw Error(`[HttpRequestParameters] invalid args count: ${args.length}. Must be able to be divided by 2.`);
    }
    let self = {};
    if (args.length > 0 && typeof args[1] === 'object') {
        args = objectTranferArray(args[1]);
    }
    for (let i = 0; i < args.length; i += 2) {
        self[args[i]] = args[i + 1] === undefined || JSON.stringify(args[i + 1]) === "{}" || JSON.stringify(args[i + 1]) === "[]" ? '' : args[i + 1];
    }
    return self;
}

function toUri(object) {
    let list = [];
    for (let key in object) {
        object[key] = typeof object[key] === 'object' && object[key] != null ? JSON.stringify(object[key]) : object[key];
        list.push(`${key}=${encodeURIComponent(object[key])}`);
    }
    return list.join('&');
}


export function jsonP(code) {
    return new Promise((resolve, reject) => {
        var oscript = document.createElement('script');
        oscript.src = 'http://hq.sinajs.cn/list=' + code;
        oscript.type = 'text/javascript';
        oscript.onload = () => {
            resolve(window[`hq_str_${code}`])
        };
        document.head.appendChild(oscript);
        document.head.removeChild(oscript);
    })
}

export function get(url, params) {
    return new Promise((resolve, reject) =>
        httpRequest
            .get(baseUrl + url, {
                params,
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    token: token
                }
            })
            .then(res => {
                //掉线跳转登录页前记录路由，登录后跳转掉线前的路由
                if (res.data.type === 'login.timeout' || res.data.type === 'login.token' || res.data.type === 'login.ip') {
                    if (returnUrl.length === 0) {
                        returnUrl = window.location.href.split('#');
                        window.location.href = loginUrl + '?returnUrl=' + returnUrl[1];
                    } else {
                        window.location.href = loginUrl + '?returnUrl=' + returnUrl[1];
                    }
                }
                if (res.data.code === 0) {
                    reject(res);
                    return;
                }
                resolve(res);
            })
            .catch(error => {
                reject({ data: { msg: '网络开了小差,请稍后重试！' } });
            })
    );
}

export function post(url, args) {
    return new Promise((resolve, reject) =>
        httpRequest
            .post(baseUrl + url, toUri(create(args)), {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    token: token
                }
            })
            .then(res => {
                if (res.data.type === 'login.timeout' || res.data.type === 'login.token' || res.data.type === 'login.ip') {
                    if (returnUrl.length === 0) {
                        returnUrl = window.location.href.split('#');
                        window.location.href = loginUrl + '?returnUrl=' + returnUrl[1];
                    } else {
                        window.location.href = loginUrl + '?returnUrl=' + returnUrl[1];
                    }
                }
                if (res.data.code === 0) {
                    reject(res);
                    return;
                }
                resolve(res);
            })
            .catch(error => {
                reject({ data: { msg: '网络开了小差,请稍后重试！' } });
            })
    );
}
