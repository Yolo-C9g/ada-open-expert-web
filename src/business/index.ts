import NotifyHelper from "@/assets/script/notify"
import { IAccontInfo, ILogin } from "@/interface/IAccount"
import { IAddStaffInfo, IDeleteEnterpriseStaff, IEnterpriseStaffItem, IImportEnterpriseStaffExel, IQueryEnterpriseStaff, IUploadEnterpriseStaffExelResult } from "@/interface/IEnterprise"
import BackendServer from "@/server"
import { useRequest } from "alova"
import { IEnterpriseStaffListResponse } from '../interface/IEnterprise';
import { IHttpResponse } from "@/interface/ICommon"


export default class BusinessServer {
    constructor() {}

    static login (params: ILogin, sucessFuc: (args: IAccontInfo) => void, completeFunc?: () => void) {
        const { onSuccess, onError, onComplete } = useRequest(() => BackendServer.loginServerApi(params))
        onSuccess((res: any) => {
            const { data } = res.data
            sucessFuc(data)
        })
        onError(event => {
            NotifyHelper.message(event.error.message || '登录失败了哦！')
        })
        onComplete(() => {
            completeFunc && completeFunc()
        })
    }

    static addNewStaffInfo (params: IAddStaffInfo, sucessFuc: (args: IHttpResponse) => void, completeFunc?: (cb: any) => void) {
        const { onSuccess, onError, onComplete } = useRequest(() => BackendServer.addEnterpriseStaffInfoApi(params))
        onSuccess((res: any) => {
            sucessFuc(res.data)
        })
        onError(event => {
            NotifyHelper.message(event.error.message || '新增员工信息失败了哦！')
        })
        onComplete((oc: any) => {
            completeFunc && completeFunc(oc)
        })
    }

    static queryEnterpriseStaffList (params: IQueryEnterpriseStaff, sucessFuc: (args: IEnterpriseStaffListResponse) => void, completeFunc?: () => void) {
        const { onSuccess, onError, onComplete } = useRequest(() => BackendServer.queryEnterpriseStaffApi(params))
        onSuccess((res: any) => {
            const { data } = res.data
            sucessFuc(data)
        })
        onError(event => {
            NotifyHelper.message(event.error.message || '获取企业员工信息失败了哦！')
        })
        onComplete(() => {
            completeFunc && completeFunc()
        })
    }

    static deleteEnterpriseStaff (params: IDeleteEnterpriseStaff, sucessFuc: (args: IHttpResponse) => void, completeFunc?: (oc: any) => void) {
        const { onSuccess, onError, onComplete } = useRequest(() => BackendServer.deleteEnterpriseStaffApi(params))
        onSuccess((res: any) => {
            sucessFuc(res.data)
        })
        onError(event => {
            NotifyHelper.message(event.error.message || '删除企业员工信息失败了哦！')
        })
        onComplete((oc: any) => {
            completeFunc && completeFunc(oc)
        })
    }

    static importEnterpriseStaffExel (params: FormData, sucessFuc: (args: IUploadEnterpriseStaffExelResult) => void, completeFunc?: (oc: any) => void) {
        const { onSuccess, onError, onComplete } = useRequest(() => BackendServer.importEnterpriseStaffExelApi(params))
        onSuccess((res: any) => {
            const { data } = res.data
            sucessFuc(data)
        })
        onError(event => {
            NotifyHelper.message(event.error.message || '上传企业员工信息失败了哦！')
        })
        onComplete((oc: any) => {
            completeFunc && completeFunc(oc)
        })
    }

}