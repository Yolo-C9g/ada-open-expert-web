import { IKeyValueInterface, IMenuRelation } from "@/interface/ICommon"
import StorageHelper from "./storage";
import { projectConfigHelper } from "../config/project";

export const timer = (func: () => void, duration?: number) => {
    let _timer = setTimeout(() => {
       func && func()
       clearTimeout(_timer) 
    }, duration || 2000);
}

export const transformAllChannels = (list: IKeyValueInterface[]) => {
  return list.map((ele: any) => {
    return {
      label: ele.value,
      value: ele.key
    }
  }) || []
}

export const transferNumberVersionFmt = (version: number) => {
  let split1 = 0
  let split2 = 0
  let split3 = 0

  split1 = parseInt((version / 10000) + '')

  const _tempVersion = version % 10000

  split2 = parseInt((_tempVersion/100) + '')
  
  split3 = _tempVersion % 100

  return split1 + "." + split2 + '.' + split3
}

export const transfromChannelData = (list: any) => {
  return list.filter((ele: any) => {
    if (ele.key !== 'ALL_CHANNEL') {
      return {
        label: ele.value,
        value: ele.key
      }
    }
  }) || []
}

export const replaceAliyunImageUrl = (url: string) => {
  return url.replace('https://ada-images.oss-cn-shanghai.aliyuncs.com/', 'https://images.adachina.com/')
}

export const transformAdaEmployeeOptions = (list: any[]) => {
  return list.map((ele: any) => {
    return {
      label: ele.username,
      value: ele.username
    }
  }) || []
}

export const transformOptMenusOptions = (list: IMenuRelation[]) => {
  return list.map((ele: IMenuRelation) => {
    return {
      label: ele.second ?  `${ele.first}/${ele.second}` : `${ele.first}`,
      value: ele.second || ele.first
    }
  }) || []
}
