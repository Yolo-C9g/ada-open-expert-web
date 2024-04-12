import { Component } from "vue"
import { ISelectOption } from "./ICommon"
import { EpPropMergeType } from "element-plus/es/utils/index.mjs"

export interface IBuryButton {
    size?: 'large'| 'default'| 'small'
    type?: 'primary'| 'success'| 'warning'| 'danger'| 'info'
    plain?: boolean
    text?: boolean
    bg?: boolean
    link?: boolean
    round?: boolean
    circle?: boolean
    loading?: boolean
    disabled?: boolean
    icon?: string|Component
    color?: string
} 

export interface IPage {
    menus?: Array<string>
    content?: string
}

export interface IDatePickShortcutsItem {
    text:string
    value: () => Date
}

export interface IDateRangePicker {
    label: string
    dateFmt?: string
    shortcuts?: boolean
    shortcutsOptions?: IDatePickShortcutsItem[]
    callback: Function
}

export interface ICmpSelectOption {
    label: string
    value: number|string|boolean
}

export interface ISelector {
    order?: number
    label: string
    style?: object
    filterable?: boolean
    disabled?: boolean
    options: ICmpSelectOption[]
    default?: any
    callback: Function
}

export interface ITableLayout {
    loading: boolean
    data: Array<any>
    // style?:object
}

export interface IPaginationer {
    show: boolean
    total: number
    current: number
    onPageNext: (page: number) => void
}

export interface IDialogBox {
    show: boolean
    showFooter?: boolean
    title?: string
    showClose?: boolean
    cancelText?: string
    cancelType?: string
    sureText?: string
    isActiveSure?: boolean
    onSureEvent?: () => void
}

export interface IResultBox {
    show: boolean
    icon: EpPropMergeType<StringConstructor, "success" | "warning" | "info" | "error", unknown> | undefined
    title: string
    subTitle: string
    confirmText?: string
}