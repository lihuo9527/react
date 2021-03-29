import { get, jsonP } from './http-client.js';
export async function fetchData() {
    return await get('test', []);
}

export async function fetchMarket (code) {
    return await jsonP(code, []);
}