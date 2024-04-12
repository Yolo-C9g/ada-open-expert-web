import { ElMessage, ElNotification } from "element-plus";

type MessageType = 'success' | 'error' | 'warning' | 'info'

export default class NotifyHelper {

    static message (msg: string, type?: MessageType) {
        switch(type) {
            case 'success':
                ElMessage.success(msg);
                break;
            case 'error':
                ElMessage.error(msg);
                break;
            case 'warning':
                ElMessage.warning(msg);
                break;
            case 'info':
                ElMessage.info(msg);
                break;  
            default:
                ElMessage.error(msg);
                break;
        }
    }

    static notify (msg: string, title?:'提示', kind?: MessageType) {
        switch(kind) {
            case 'success':
              ElNotification({
                title: title,
                message: msg,
                type: 'success'
              })
              break;
            case 'error':
              ElNotification({
                title: title,
                message: msg,
                type: 'error'
              })
              break;
            case 'warning':
              ElNotification({
                title: title,
                message: msg,
                type: 'warning'
              })
              break;
            case 'info':
              ElNotification({
                title: title,
                message: msg,
                type: 'info'
              })
              break;  
            default:
              ElNotification({
                title: title,
                message: msg,
                type: 'info'
              })
          }
    }
}