import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import VueHook from 'alova/vue'
import NotifyHelper from '../assets/script/notify';
import StorageHelper from '../assets/script/tools/storage';
import { projectConfigHelper } from '@/assets/script/config/project';
import serverConfig from '../assets/script/config/server';
import { timer } from '@/assets/script/tools/helpers';
import router from '@/router';
import urisConstant from './uri';


export default class AlovaClient {

    static alovaClient: AlovaClient;
    private alovaInstance;


    constructor() {
        this.alovaInstance = this._internal()
    }

    _internal() {
        return createAlova({
           // VueHook用于创建ref状态，包括请求状态loading、响应数据data、请求错误对象error等
           statesHook: VueHook,
        
           // 请求适配器，推荐使用fetch请求适配器
           requestAdapter: GlobalFetch(),

           // 全局请求拦截器
           beforeRequest(method) {
                const _accountInfo = StorageHelper.get(projectConfigHelper.accountInfo as string)
                if (_accountInfo) {
                    method.config.headers['username'] = _accountInfo.info.user.username
                    method.config.headers['Authorization'] = _accountInfo.info.token
                }

                // 假设我们需要添加token到请求头
                method.config.headers.platform = projectConfigHelper.platform;
                if (method.url !== urisConstant.STAFF_IMPORT) {
                    method.config.headers['Content-type'] = 'application/json;charset=UTF-8'
                }
            },
       
           // 全局的响应拦截器
           responded: {
               // 请求成功的拦截器
               // 当使用GlobalFetch请求适配器时，第一个参数接收Response对象
               // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
               onSuccess: async (response, method) => {
                   const json = await response.json()
                   
                   console.log('response json', json)
                   if (json.code !== serverConfig.responseCode.success) {
                        if (json.code === serverConfig.responseCode.tokenOutOfTime) {
                            StorageHelper.clear()
                            timer(
                                () => {
                                    router.replace('/login')
                                }
                            )
                            throw new Error('登录失效了哦，即将跳转至登录页！')
                        } else {
                            throw new Error(json.msg)
                        }
                   }

                   return json
                   // 解析的响应数据将传给method实例的transformData钩子函数，这些函数将在后续讲解
               },
           
               // 请求失败的拦截器
               // 请求错误时将会进入该拦截器。
               // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
               onError: (err, method) => {
                    NotifyHelper.message(err.msg || err.message || serverConfig.errorMessage.response_faile_type)
               }
           } 
        })
    }

    static getAlovaClientInstance() {
        if (this.alovaClient == undefined) {
            return new AlovaClient()
        }
        return this.alovaClient
    }


    post(uri: string, params?: object) {
        return this.alovaInstance.Post(uri, params)
    }

    get(uri:string, params?: object) {
        return this.alovaInstance.Get(uri, {params: params})
    }

    remove(uri:string, params?:string) {
        return this.alovaInstance.Delete(uri, params)
    }
}