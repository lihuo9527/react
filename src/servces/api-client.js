import { get, jsonP } from './http-client.js';
export async function test() {
    return await get('test', []);
}

export async function fetchMarket (code) {
    return await jsonP(code, []);
}