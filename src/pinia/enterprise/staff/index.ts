import { projectConfigHelper } from '@/assets/script/config/project'
import NotifyHelper from '@/assets/script/notify'
import { checkMobile, trimString } from '@/assets/script/tools/functional'
import StorageHelper from '@/assets/script/tools/storage'
import BusinessServer from '@/business'
import { IResultBox } from '@/interface/IComponents'
import { IAddStaffInfo, IEnterpriseStaffItem, IQueryEnterpriseStaff, IUploadEnterpriseStaffExelResult } from '@/interface/IEnterprise'
import { ElMessageBox, FormRules, UploadFile } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'  


export default defineStore('useEnterpriseStaffPinia', () => {
    const _accountInfo = StorageHelper.get(projectConfigHelper.accountInfo as string)

    console.log('_accountInfo', _accountInfo)

    const query = ref<IQueryEnterpriseStaff>({
        merchantId: _accountInfo.info.user.merchantId,
        username: '',
        mobile: '',
        pageSize: projectConfigHelper.pageSize as number,
        pageNum: 1,
    })
    const loading = ref(false)
    const tableHeaderCss = ref(projectConfigHelper.tableHeaderColor)
    const listTotal = ref({
        totalCount: 0
    })
    const currentPage = ref(1)
    const staffList = ref<IEnterpriseStaffItem[]>([])

    const merchantId = _accountInfo ? _accountInfo.info.user.username : ''

    const uploadDialogVisile = ref(false)
    const isActiveSure = ref(false)
    const uploadFile = ref<UploadFile>()

    const uploadResultVisile = ref(false)
    const uploadResult = ref<IResultBox>({
        show: false,
        icon: undefined,
        title: '',
        subTitle: '',
    })


    const addStaffVisible = ref(false)
    const addedStaffInfo = ref<IAddStaffInfo>({
        merchantId: merchantId,
        username: '',
        mobile: ''
    })
    const isAddStaffActiveSure = ref(false)

    const validateMobile = (rule: any, value: any, callback: any) => {
        if (!checkMobile(value) && trimString(value) !== '') {
            callback(new Error('请输入有效的手机号！'))
        } else {
            callback()
        }
    } 

    const addStaffRules = ref<FormRules<typeof addedStaffInfo.value>>({
        mobile: [{ validator: validateMobile, trigger: 'blur' }],
    })

    

    const onSearchAction = () => {
        console.log('onSearchAction')
        if (!loading.value) {
            currentPage.value = 1
            query.value.pageNum = 1

            queryEnterpriseStaffList()
        }
    }

    const onDeleteStaffAction = (info: IEnterpriseStaffItem) => {
        if (loading.value) {
            return
        }

        ElMessageBox.confirm(
            `是否删除<strong style='color: #F56C6C'>【${info.username}】</strong>的员工信息？`,
            '提示',
            {
              dangerouslyUseHTMLString: true,
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning',
            }
          )
            .then(() => {
                loading.value = true

                BusinessServer.deleteEnterpriseStaff(
                    {
                        merchantId: info.merchantId,
                        id: info.id
                    },
                    (res: any) => {
                        if (currentPage.value > 1 && staffList.value.length === 1) {
                            currentPage.value -= 1
                            query.value.pageNum -= 1
                        }
        
                        NotifyHelper.message(res.msg, 'success')
                        queryEnterpriseStaffList()
                    },
                    (cb: any) => {
                        console.log('cb', cb.status)
                        if (cb.status === 'error') {
                            loading.value = false
                        }
                    }
                )
            })
    }

    const onPageNextAction = (page: number) => {
        console.log('onPageNextAction', page)
        if (!loading.value) {
            currentPage.value = page
            query.value.pageNum = page

            queryEnterpriseStaffList()
        }
    }

    const onTrigleUploadAction = () => {
        uploadDialogVisile.value = true
    }

    const onResetDialogStatusAction = (refObj: any, isCloseDlg: boolean = true) => {
        if (isCloseDlg) {
            uploadDialogVisile.value = false
        }
        isActiveSure.value = false
        refObj.value?.clearFiles()
    }

    const onUploadFileChangeAction = (file: UploadFile) => {
        if (!file || !file.name || file.status !== 'ready') {
            NotifyHelper.message('上传文件失败！')
        } else {
            uploadFile.value = file
            isActiveSure.value = true
        }
    }

    const onUploadEnterpriseStaffExelAction = () => {
        const _formData = new FormData()
        _formData.append('file', uploadFile.value?.raw as File)

        BusinessServer.importEnterpriseStaffExel(
            _formData,
            (result: IUploadEnterpriseStaffExelResult) => {
                uploadDialogVisile.value = false
                uploadFile.value = undefined
                isActiveSure.value = false

                uploadResultVisile.value = true
                uploadResult.value.title = '文件导入成功'
                uploadResult.value.icon = 'success'
                uploadResult.value.subTitle = `当前新增员工 <strong style="color: #67C23A">${ result.successCount }</strong> 条，表中重复员工 <strong style="color: #F56C6C">${ result.failCount }</strong> 条`
            },
            () => {
                
            }
        )
    }

    const onTrigleAddStaffAction = () => {
        addStaffVisible.value = true
    }

    const onResetAddStaffStatusAction = () => {
        addStaffVisible.value = false
        isAddStaffActiveSure.value = false
        addedStaffInfo.value.username = ''
        addedStaffInfo.value.mobile = ''
    }

    const onAddStaffInputAction = () => {
        if (trimString(addedStaffInfo.value.username) === '' || !checkMobile(addedStaffInfo.value.mobile)) {
            isAddStaffActiveSure.value = false
        } else {
            isAddStaffActiveSure.value = true
        }
    }

    const onAddStaffAction = () => {
        isAddStaffActiveSure.value = false

        BusinessServer.addNewStaffInfo(
            {
                merchantId: addedStaffInfo.value.merchantId,
                username: addedStaffInfo.value.username,
                mobile: addedStaffInfo.value.mobile
            },
            (res: any) => {
                NotifyHelper.message(res.msg, 'success')

                onResetAddStaffStatusAction()
                onSearchAction()
            },
            (cb: any) => {
                console.log('cb', cb.status)
                if (cb.status === 'error') {
                    isAddStaffActiveSure.value = true
                }
            }
        )
    }

    const queryEnterpriseStaffList = () => {
        if (!loading.value) {
            loading.value = true
        }

        BusinessServer.queryEnterpriseStaffList(
            {
                merchantId: query.value.merchantId,
                username: query.value.username,
                mobile: query.value.mobile,
                pageNum: query.value.pageNum,
                pageSize: query.value.pageSize,
            },
            res => {
                staffList.value = (res.list || []) as IEnterpriseStaffItem[]
                listTotal.value.totalCount = res.total || 0
            },
            () => {
                loading.value = false
            }
        )

    }

    const onResultBoxAction = () => {
        uploadResultVisile.value = false

        onSearchAction()
    }

    const onDownloadStaffTemplateAction = () => {
        var eleLink = document.createElement('a');
        eleLink.download = 'enterprise_staff_template.xlsx';
        eleLink.target = '_blank'
        eleLink.style.display = 'none';
        // 字符内容转变成blob地址
        eleLink.href = '/qyygmng/enterprise_staff_template.xlsx';
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
    }


    return {
        query,
        loading,
        tableHeaderCss,
        listTotal,
        currentPage,
        staffList,

        uploadDialogVisile,
        isActiveSure,
        uploadFile,

        uploadResultVisile,
        uploadResult,

        addStaffVisible,
        addedStaffInfo,
        isAddStaffActiveSure,
        addStaffRules,

        onSearchAction,
        onDeleteStaffAction,
        onPageNextAction,

        onTrigleUploadAction,
        onUploadFileChangeAction,
        onResetDialogStatusAction,
        onUploadEnterpriseStaffExelAction,

        onTrigleAddStaffAction,
        onResetAddStaffStatusAction,
        onAddStaffInputAction,

        onAddStaffAction,

        onResultBoxAction,

        onDownloadStaffTemplateAction,
    }

})