const CryptoJS = require('crypto-js');
const key = CryptoJS.enc.Utf8.parse('1234567890123456');

encrypt(msgString){
    let iv = CryptoJS.lib.WordArray.random(16);
    let encrypted = CryptoJS.AES.encrypt(msgString, key, {
        iv: iv
    });
    let ciphertextStr =iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
    return(ciphertextStr);
   
    }
decrypt(ciphertextStr){
    let ciphertext = CryptoJS.enc.Base64.parse(ciphertextStr);
    console.log(ciphertextStr)
    // split IV and ciphertext
	let iv = ciphertext.clone();
	iv.sigBytes = 16;
	iv.clamp();
	ciphertext.words.splice(0, 4); // delete 4 words = 16 bytes
	ciphertext.sigBytes -= 16;

	// decryption
	let decrypted = CryptoJS.AES.decrypt({ciphertext: ciphertext}, key, {
	iv: iv
	});
	console.log("decrpted msg");
	return(decrypted.toString(CryptoJS.enc.Utf8));
}