import * as CryptoJS from "crypto-js";

export default class CryptoUtils {
  private keyfront: string;
  private keyback: string;
  constructor() {
    this.keyfront = process.env.NEXT_PUBLIC_KEY_CRYPTO_FRONT!;
    this.keyback = process.env.NEXT_PUBLIC_KEY_CRYPTO_BACK!;
  }

  async encryptFront(data: any) {
    if (!data) {
      return null;
    }
    const ciphertext = CryptoJS.AES.encrypt(data, this.keyfront);
    return ciphertext.toString();
  }

  async decryptFront(data: any) {
    if (!data) {
      return null;
    }
    const ciphertext = CryptoJS.AES.decrypt(data, this.keyfront);
    return await ciphertext.toString(CryptoJS.enc.Utf8);
  }
  
  async encryptBack(data: any) {
    if (!data) {
      return null;
    }
    const ciphertext = CryptoJS.AES.encrypt(data, this.keyback);
    return ciphertext.toString();
  }

  async decryptBack(data: any) {
    if (!data) {
      return null;
    }
    const ciphertext = CryptoJS.AES.decrypt(data, this.keyback);
    return await ciphertext.toString(CryptoJS.enc.Utf8);
  }
}
