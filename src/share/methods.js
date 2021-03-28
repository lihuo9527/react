export const objectTranferArray = (object) => {
    let keys = Object.keys(object);
    let values = Object.values(object);
    let arr = [];
    for (let i = 0; i < keys.length; i++) {
        arr.push(keys[i]);
        arr.push(values[i]);
    }
    return arr;
}