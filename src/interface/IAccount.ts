type IStringExp = string | null | undefined

export interface ILogin {
    readonly username: string
    readonly password: string
}

export interface IMenuTreeItem {
    readonly children: Array<IMenuTreeItem>
    readonly id: number
    readonly component: IStringExp
    readonly createTime: number
    readonly icon: IStringExp
    readonly iframe: boolean
    readonly name: string
    readonly path: string
    readonly pid: number
    readonly sort: number
  }

export interface IAccontInfo {
    readonly avatar?: IStringExp
    readonly enabled: boolean
    readonly merchantId: string
    readonly merchantName: string
    readonly username: string
  }

  export interface ILoginCompanyWechart {
    readonly code: string
  }