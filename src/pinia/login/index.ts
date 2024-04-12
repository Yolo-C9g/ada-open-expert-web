import { defineStore } from "pinia"
import { ref } from "vue"
import { trimString } from "@/assets/script/tools/functional"
import { ILogin } from "@/interface/IAccount"
import AesHelper from "@/assets/script/tools/cryptojs"
import { projectConfigHelper } from "@/assets/script/config/project"
import BusinessServer from "@/business"
import NotifyHelper from "@/assets/script/notify"
import StorageHelper from "@/assets/script/tools/storage"
import router from "@/router"


export default defineStore('useLoginPinia', () => {
    const banners = ['sys_bkg.svg']
    const username = ref('')
    const password = ref('')
    const loading = ref(false)
    const loginStyle = ref(false)

    const onImageUrlAction = (name: string) => {
        return new URL(`../../assets/image/${name}`, import.meta.url).href
    }

    const onLoginAction = () => {
        if (loading.value || trimString(username.value) === '' || trimString(password.value) === '') {
            return
        }

        loading.value = true

        const _params: ILogin = {
            username: username.value,
            password: AesHelper.encode(password.value, projectConfigHelper.aesKey as string)
        }

        BusinessServer.login(
            _params,
            res => {
                NotifyHelper.message('欢迎使用就诊需求管理平台', 'success')

                StorageHelper.set(projectConfigHelper.accountInfo as string, { info: res })
                router.replace({name: 'enterprise'})
            },
            () => {
                loading.value = false
            }
        )
    }


    return {
        loading,
        username,
        password,
        banners,
        loginStyle,
        onImageUrlAction,
        onLoginAction,
    }
})