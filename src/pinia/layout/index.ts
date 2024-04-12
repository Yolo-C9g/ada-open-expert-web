import { projectConfigHelper } from "@/assets/script/config/project"
import StorageHelper from "@/assets/script/tools/storage"
import { IAccontInfo, IMenuTreeItem } from "@/interface/IAccount"
import router from "@/router"
import routes from "@/router/routes"
import { defineStore } from "pinia"
import { ref } from "vue"

export default defineStore('useLayoutPinia', () => {
    const showPop = ref(false)
    const accountInfo = ref<IAccontInfo>()
    const menuTree = ref<IMenuTreeItem[]>([])
    const menuGroup = ref('首页')
    const currentMenu = ref<string|null>()


    const onPopStatusAction = () => {
        showPop.value = !showPop.value
    }

    const onClosePopAction = () => {
        showPop.value = false
    }

    const onQuitToLoginAction = () => {
        onPopStatusAction()
        
        StorageHelper.clear()
        window.location.reload()
    }

    const onAccountInfoAction = () => {
        const _accountInfo = StorageHelper.get(projectConfigHelper.accountInfo as string)
        if (_accountInfo) {
            accountInfo.value = _accountInfo.info.user
            menuTree.value = [{
                children: [],
                component: "",
                createTime: 1565943703000,
                icon: 'staffinfo',
                id: 0,
                name: '员工信息',
                path: '/enterprise/staff',
                iframe: false,
                pid: 0,
                sort: 0
            }]
        } else {
            StorageHelper.clear()
            window.location.reload()
        }
    }

    const onMenuClickAction = (parentMenu: string|null, menu: IMenuTreeItem) => {
        if (menu.path.indexOf('.com') === -1 && menu.path.indexOf('rbac') === -1) {
            menuGroup.value = parentMenu ? parentMenu : menu.name 
            currentMenu.value = parentMenu ? menu.name : null
            router.push({path: menu.path})
        } else {
            window.open(menu.path, '_blank')
        }
    }

    const onInitBreadcrumbAction = () => {
        const _path = window.location.pathname

        const activeMenu = routes.find(ele => ele.id === _path)
        if (activeMenu) {
            menuGroup.value = activeMenu.first
            currentMenu.value = activeMenu?.second
        }
    }

    return {
        showPop,
        accountInfo,
        menuTree,
        menuGroup,
        currentMenu,
        onPopStatusAction,
        onClosePopAction,
        onQuitToLoginAction,
        onAccountInfoAction,
        onMenuClickAction,
        onInitBreadcrumbAction
    }
})