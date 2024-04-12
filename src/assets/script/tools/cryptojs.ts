import CryptoJS from "crypto-js"
import { IAesEncodeDataTypes, IAesDecodeDataTypes } from "@/interface/ICommon";

export default class AesHelper {
  constructor () {}

    /**
     * 加密
     * @param data 
     * @param secretKey 
     * @returns 
     */
    static encode (data: IAesEncodeDataTypes, secretKey: string) {
        return CryptoJS.AES.encrypt(
            data, 
            CryptoJS.enc.Utf8.parse(secretKey), 
            {
              mode: CryptoJS.mode.ECB,
              padding: CryptoJS.pad.Pkcs7
            }
          ).toString();
    }

    /**
     * 解密
     * @param data
     * @param aesKey 
     * @returns 
     */
    static decode (data: IAesDecodeDataTypes, aesKey: string) {
        return CryptoJS.AES.decrypt(
            data, 
            CryptoJS.enc.Utf8.parse(aesKey), 
            {
              mode: CryptoJS.mode.ECB,
              padding: CryptoJS.pad.Pkcs7
            }
          ).toString(CryptoJS.enc.Utf8);
    }
}