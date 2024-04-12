export interface IQueryEnterpriseStaff {
    merchantId: string
    username?: string
    mobile?: string
    pageSize: number
    pageNum: number
}

export interface IEnterpriseStaffItem {
    id: number
    username: string
    mobile: string
    createBy: string
    createTime: string
    isDelete: number
    merchantId: string
    merchantName?: string
    status?: number
    updateBy: string
}

export interface IAddStaffInfo {
    merchantId: string
    username: string
    mobile: string
}

export interface IEnterpriseStaffListResponse {
    list: Array<IEnterpriseStaffItem>
    pages: number
    total: number
}

export interface IDeleteEnterpriseStaff {
    merchantId: string
    id: number
}

export interface IImportEnterpriseStaffExel {
    merchantId?: string
    file: FormData
}

export interface IUploadEnterpriseStaffExelResult {
    failCount: number
    successCount: number
}