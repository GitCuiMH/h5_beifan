export const dataList = [{
  title: '快捷功能',
  icons: [
    {
      icon: 'add.png',
      name: '在线挂号',
      url: '/infoManage/guahao'
    }, {
      icon: 'cz.png',
      name: '门诊充值',
      url: '/infoManage/chongzhi'
    }, {
      icon: 'pages.png',
      name: '余额查询',
      url: '/infoManage/yue'
    }, {
      icon: 'stars.png',
      name: '我的收藏',
      url: '/catchList'
    }
  ]
}, {
  title: '门诊功能',
  icons: [
    {
      icon: 'jf.png',
      name: '门诊缴费',
      url: '/infoManage/jiaofei'
    }, {
      icon: 'group.png',
      name: '添加就诊人',
      url: '/add'
    }, {
      icon: 'report.png',
      name: '报告查询',
      url: '/infoManage/checkResult'
    }, {
      icon: 'manager.png',
      name: '就诊人管理',
      url: '/infoManage/detail'
    },
    {
      icon: 'record.png',
      name: '挂号记录',
      url: '/infoManage/grecord'
    }, {
      icon: 'jiaofei.png',
      name: '缴费记录',
      url: '/infoManage/fList'
    }, {
      icon: 'chongzhi.png',
      name: '充值记录',
      url: '/infoManage/chongzhirecord'
    }, {
      icon: 'user.png',
      name: '个人中心',
      url: '/self'
    }
  ]
}, {
  title: '医院信息',
  icons: [
    {
      type: 1,
      icon: 'ks.png',
      name: '科室介绍',
      url: '/deptlist'
    }, {
      type: 2,
      icon: 'doc.png',
      name: '医生介绍',
      url: '/deptlist'
    }, {
      mark: 1,
      icon: 'intro.png',
      name: '中心简介',
      url: 'https://wx.wdfybj.com/a/entrance?lm=yyjs'
    }, {
      mark: 1,
      icon: 'daohang.png',
      name: '来院导航',
      url: 'https://surl.amap.com/fys5mL193Lo'
    }
  ]
}]


interface ITest {
  name: string,
  age?: number,
  readonly sex: number
}

export function Test() {
  enum Color { red = 1, green = 3, blue = 123 }
  const colorName: string = Color[3]
  const key = 'blue'
  console.log(colorName, Color.blue, Color[key])
  const aaa: ITest = {
    name: 'test',
    sex: 1
  }
  // aaa.sex = 2
  aaa.age = 13
  console.log(mySum(1, 3))
  const classDemo = new Ss('Tom')
  console.log(classDemo.nickName)
}

const mySum: (x: number, y: number) => number = (x: number, y: number): number => {
  return x + y
}

class Ss {
  public nickName: string = 'ssss'
  private name: string = 'sss'
  constructor(str: string) {
    this.name = str
    this.nickName = this.name
  }
}


