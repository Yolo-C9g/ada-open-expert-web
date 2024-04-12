import { ILogin } from "@/interface/IAccount";
import AlovaClient from "./http";
import urisConstant from "./uri";
import { IAddStaffInfo, IDeleteEnterpriseStaff, IImportEnterpriseStaffExel, IQueryEnterpriseStaff } from "@/interface/IEnterprise";

export default class BackendServer {
    constructor() {}

    static alovaClient: AlovaClient = AlovaClient.getAlovaClientInstance()

    static loginServerApi = (params: ILogin) => this.alovaClient.post(urisConstant.LOGIN, params)

    static addEnterpriseStaffInfoApi = (params: IAddStaffInfo) => this.alovaClient.post(urisConstant.ADDSTAFF, params)

    static queryEnterpriseStaffApi = (params: IQueryEnterpriseStaff) => this.alovaClient.post(urisConstant.STAFFS, params)

    static deleteEnterpriseStaffApi = (params: IDeleteEnterpriseStaff) => this.alovaClient.post(urisConstant.STAFF_DELETE, params)

    static importEnterpriseStaffExelApi = (params: FormData) => this.alovaClient.post(urisConstant.STAFF_IMPORT, params)

}