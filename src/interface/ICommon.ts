import CryptoJS from "crypto-js"

export type IAesEncodeDataTypes = string | CryptoJS.lib.WordArray
export type IAesDecodeDataTypes = string | CryptoJS.lib.CipherParams

export interface IMenuRelation {
    id: string
    first: string
    second?: string
}

export interface ISelectOption {
    label: string
    value: number|string|boolean
}

export interface ISelectors {
    readonly [key: string]: ISelectOption[]
}

export interface IProjectConfig {
    readonly [key: string]: string | number
}

export interface IKeyValueInterface {
    readonly key: string
    readonly value: string|number
}

export interface INomal {
    readonly [key: string]: number|string|boolean
}

export interface IQueryAdaEmployee {
    readonly enabled: number|null
}

export interface IHttpResponse {
    code: number
    data: any
    msg?: string
}