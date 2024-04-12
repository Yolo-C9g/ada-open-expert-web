import { IGoodsInterface } from "@/interface/IPlatform"

const defaultGoods: IGoodsInterface[] = [{
    type: "TIME",
    hot: false,
    goodsCode: "PGDCGM_stg",
    name: "单次评估",
    price: '8.00',
    originalPrice: '8.00',
    unit: '1',
    unitCount: '1',
    times: '1',
    productId: "DC001",
    desc: "爱达健康单次评估",
    isSelected: false
  },
  {
    type: "TIME",
    hot: false,
    goodsCode: "PG_10",
    name: "10次评估",
    price: '68.00',
    originalPrice: '68.00',
    unit: '1',
    unitCount: '1',
    times: '10',
    productId: "PG_10",
    desc: "爱达健康10次评估",
    isSelected: false
  },
  {
    type: "EVERY_YEAR",
    hot: true,
    goodsCode: "PGNF1N",
    name: "年费评估",
    price: '68.00',
    originalPrice: '68.00',
    unit: '3',
    unitCount: '1',
    times: '-1',
    productId: "PGNF1N_stg2",
    desc: "爱达健康1年会员",
    isSelected: false
  }
]

export default defaultGoods