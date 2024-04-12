import { ISelectors } from "@/interface/ICommon";


export const selectors: ISelectors = {
    dealStatus: [
        {
          value: 0,
          label: '未处理'
        },
        {
            value: 1,
            label: '已处理'
        }
    ],
    marketPlatfrom: [
        {
            value: "I01",
            label: "iOS AppStore"
        }, {
            value: "A01",
            label: '应用宝'
        }, {
            value: "A02",
            label: '360手机助手'
        }, {
            value: "A03",
            label: 'OPPO软件商店'
        }, {
            value: "A04",
            label: '百度手机助手'
        }, {
            value: "A05",
            label: '华为应用市场'
        }, {
            value: "A06",
            label: '小米应用商店'
        }, {
            value: "A07",
            label: 'vivo应用商店'
        }, {
            value: "A00",
            label: '爱达下载'
        }
    ],
    publishStatus: [
        {
            value: 0,
            label: '未发布'
        },
        {
            value: 1,
            label: '已发布'
        }
    ],
    payChannelOptions: [{
        label: '微信',
        value: 'WX'
      },{
        label: '支付宝',
        value: 'ALIPAY'
      },{
        label: '苹果',
        value: 'IOS_APP'
      }
    ],
    paymentStatusOptions: [{
        label: '免费',
        value: 0
      }, {
        label: '付费',
        value: 1
      }
    ],
    purchaseStatusOptions: [{
        label: '无效',
        value: 0
      }, {
        label: '有效',
        value: 1
      }
    ],
    productFlowOptions: [{
        label: '研发',
        value: 0
    }, {
        label: '测试',
        value: 1
    }, {
        label: '验收',
        value: 2
    }, {
        label: '上线准备',
        value: 3
    }, {
        label: '上线完成',
        value: 4
    }],
    hotGoodsOptions: [{
        label: '否',
        value: false
      }, {
        label: '是',
        value: true
      }
    ],
    medicalNeedsStatus: [
        {
            value: 0,
            label: '待处理'
        },
        {
            value: 1,
            label: '跟进中'
        },
        {
            value: 2,
            label: '已完成'
        }
    ]
} 