export const lvList = [
  {
    id: 1,
    lvname: '城市合伙人'
  },
  {
    id: 2,
    lvname: '黄金合伙人'
  }, {
    id: 3,
    lvname: '至尊合伙人'
  }, {
    id: 4,
    lvname: '钻石合伙人'
  }, {
    id: 5,
    lvname: '候选股东'
  }, {
    id: 6,
    lvname: '股东'
  }
]

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


