var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function padPlaintext(plaintext, targetLength) {
    const padLength = targetLength - plaintext.length;
    if (padLength > 0) {
        const padding = new Uint8Array(padLength).fill(0);
        return new Uint8Array([...plaintext, ...padding]);
    }
    else {
        return plaintext.slice(0, targetLength);
    }
}
export function initializeRecrypt() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("initializeRecrypt function is called.");
        try {
            const Recrypt = yield import("@ironcorelabs/recrypt-wasm-binding");
            console.log("Recrypt module imported successfully.");
            const Api256 = new Recrypt.Api256();
            console.log("Api256 instance created.");
            const { privateKey: initiatorPrivateKey } = getKeys(Api256, 'initiator');
            const { signingPrivateKey } = getSigningKeys(Api256);
            // Get the user input from query parameters
            const urlParams = new URLSearchParams(window.location.search);
            const userInput = urlParams.get('userInput') || '';
            console.log("userInput:", userInput);
            const encoder = new TextEncoder();
            let plaintext = encoder.encode(userInput);
            plaintext = padPlaintext(plaintext, 384);
            console.log("Plaintext:", plaintext);
            if (initiatorPrivateKey && signingPrivateKey) {
                try {
                    const publicKey = Api256.computePublicKey(base64ToArrayBuffer(initiatorPrivateKey));
                    console.log("Public Key for Encryption:", publicKey);
                    const encryptedValue = Api256.encrypt(plaintext, publicKey, base64ToArrayBuffer(signingPrivateKey));
                    console.log("Data encrypted successfully.", encryptedValue);
                    const { privateKey: receiverPrivateKey } = getKeys(Api256, 'receiver');
                    if (receiverPrivateKey) {
                        const initiatorToReceiverTransformKey = Api256.generateTransformKey(base64ToArrayBuffer(initiatorPrivateKey), Api256.computePublicKey(base64ToArrayBuffer(receiverPrivateKey)), base64ToArrayBuffer(signingPrivateKey));
                        const transformedEncryptedValue = Api256.transform(encryptedValue, initiatorToReceiverTransformKey, base64ToArrayBuffer(signingPrivateKey));
                        console.log("Data transformed.");
                        const decryptedValue = Api256.decrypt(transformedEncryptedValue, base64ToArrayBuffer(receiverPrivateKey));
                        const isDecryptionSuccessful = new TextDecoder().decode(decryptedValue) === new TextDecoder().decode(plaintext);
                        console.log("****Decryption successful***:", isDecryptionSuccessful);
                    }
                }
                catch (error) {
                    console.error("Encryption error:", error);
                }
            }
        }
        catch (error) {
            console.error("Error during Recrypt initialization:", error);
        }
        console.log("initializeRecrypt function execution completed.");
    });
}
// Include other functions like padPlaintext, getKeys, getSigningKeys, etc.
function getKeys(Api256, clientType) {
    const publicKeyXKey = `${clientType}PublicKey-x`;
    const publicKeyYKey = `${clientType}PublicKey-y`;
    const privateKeyKey = `${clientType}PrivateKey`;
    let publicKeyX = localStorage.getItem(publicKeyXKey);
    let publicKeyY = localStorage.getItem(publicKeyYKey);
    let privateKey = localStorage.getItem(privateKeyKey);
    if (publicKeyX === null || publicKeyY === null || privateKey === null) {
        const keys = Api256.generateKeyPair();
        console.log(`${capitalize(clientType)} key pair generated.`);
        publicKeyX = arrayBufferToBase64(keys.publicKey.x);
        publicKeyY = arrayBufferToBase64(keys.publicKey.y);
        savePublicKey(keys.publicKey, clientType);
        privateKey = arrayBufferToBase64(keys.privateKey);
        saveToLocalStorage(privateKeyKey, privateKey);
    }
    else {
        console.log(`${capitalize(clientType)} keys loaded from Local Storage.`);
    }
    const publicKey = {
        x: base64ToArrayBuffer(publicKeyX),
        y: base64ToArrayBuffer(publicKeyY)
    };
    return { publicKey, privateKey };
}
function getSigningKeys(Api256) {
    let signingPublicKey = localStorage.getItem('signingPublicKey');
    let signingPrivateKey = localStorage.getItem('signingPrivateKey');
    if (!signingPublicKey || !signingPrivateKey) {
        const signingKeys = Api256.generateEd25519KeyPair();
        console.log("Signing key pair generated.");
        signingPublicKey = arrayBufferToBase64(signingKeys.publicKey);
        signingPrivateKey = arrayBufferToBase64(signingKeys.privateKey);
        saveToLocalStorage('signingPublicKey', signingPublicKey);
        saveToLocalStorage('signingPrivateKey', signingPrivateKey);
    }
    else {
        console.log("Signing keys loaded from Local Storage.");
    }
    return { signingPublicKey, signingPrivateKey };
}
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, data);
        console.log(`Data saved to Local Storage with key: ${key}`);
    }
    catch (error) {
        console.error('Error saving to Local Storage:', error);
    }
}
function savePublicKey(publicKey, clientType) {
    const publicKeyXKey = `${clientType}PublicKey-x`;
    const publicKeyYKey = `${clientType}PublicKey-y`;
    saveToLocalStorage(publicKeyXKey, arrayBufferToBase64(publicKey.x));
    saveToLocalStorage(publicKeyYKey, arrayBufferToBase64(publicKey.y));
    console.log(`${capitalize(clientType)} public key saved to Local Storage.`);
}
function arrayBufferToBase64(buffer) {
    const binary = String.fromCharCode(...buffer);
    return btoa(binary);
}
function base64ToArrayBuffer(base64) {
    const binary = atob(base64);
    return new Uint8Array([...binary].map(char => char.charCodeAt(0)));
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
console.log("About to call initializeRecrypt function.");
initializeRecrypt();
console.log("initializeRecrypt function has been called.");
//# sourceMappingURL=index.js.map