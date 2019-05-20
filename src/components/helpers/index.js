export const getRandomId = (length=20) => {
    const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({ length: length }, (v, k) => k).reduce(accum => {
        const position = Math.floor(Math.random() * str.length - 1);
        return accum + str.substring(position, position + 1);
    }, '__');
};