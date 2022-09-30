export const toBase64 = newProPic => new Promise((res, rej) => {
    
    const reader = new FileReader();
    reader.readAsDataURL(newProPic);
    reader.onload = () => res(reader.result);
    reader.onerror = error => rej(error);

})
