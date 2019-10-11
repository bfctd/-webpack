interface ITypescript {
    readonly name: string

    [propName: string]: any

    [propName: number]: any
}

const abj: ITypescript = {
    name: "111",
    c: '',
    d: 1,
    e: 1
}
console.log(abj)

const f: number[] = [1, 2, 3]

console.log(f)


interface Interface {
    [index:number]:number
}

class A {
    public name
    public constructor(name){
        this.name= name
    }
}

var a =  new A(1)
console.log(a.name)
console.log(A.name)
