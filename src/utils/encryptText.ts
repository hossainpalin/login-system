import CryptoJS from "crypto-js";

export function encryptTest(text: string, key: string): string {
  const encrypted = CryptoJS.AES.encrypt(text, key).toString();
  return encrypted;
}

export function decryptText(encryptedText: string, key: string): string {
  const decrypted = CryptoJS.AES.decrypt(encryptedText, key).toString(
    CryptoJS.enc.Utf8,
  );
  return decrypted;
}
