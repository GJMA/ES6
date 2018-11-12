## 变量的解构赋值

> 解构：ES6允许按照一定模式，从数组喝对象中提取值，对变量进行赋值

1.数组的解构

---


### 基本用法

```
let [a, b, c] = [1, 2, 3]
```
> 本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值. eg: ↓

```
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
```

> 如果解构不成功，变量的值就等于***undefined***

- 不完全解构 -- 等号左边的模式，只匹配一部分的等号右边的数组

```
let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
```

- Set结构，也可以使用数组的解构赋值

```
let [x, y, z] = new Set(['a', 'b', 'c'])
x // "a"
```
---

### 默认值

- 解构赋值允许指定默认值

```
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```
> 注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。

```
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
```
> 上面代码中，如果一个数组成员是null，默认值就不会生效，因为null不严格等于undefined。

- 惰性求值

```
function f() {
  console.log('aaa');
}

let [x = f()] = [1];
```

> 上面代码中，因为x能取到值，所以函数f根本不会执行。上面的代码其实等价于下面的代码。

```
let x;
if ([1][0] === undefined) {
  x = f();
} else {
  x = [1][0];
}
```

- 默认值可以引用解构赋值的其他变量，但该变量必须已经声明

```
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined
```

---

2.对象的解构赋值

> 而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

```
let {bar, foo} = {foo: "aaa", bar: 'bbb'}
foo // "aaa"
bar // "bbb"

let {baz} = {foo: "aaa", bar: 'bbb'}
baz // undefined
```

> 如果变量名与属性名不一致，必须写成下面这样
```
let {foo: baz} = {foo: "aaa", bar: "bbb"}
baz // "aaa"
```

3.字符串得解构赋值

4.数值和布尔值得解构赋值

5.函数参数得解构赋值

6.圆括号问题

---

### 用途

- 交换变量的值
```
let x = 1
let y = 2 

[x, y] = [y, x]
```

- 从函数值返回多个值
> 函数只能返回一个值，如果需要返回多个值，只能将它们放在数组或对象里返回
```
// 返回一个数组
function example () {
    return [1, 2, 3]
}
let [a, b, c] = example()

// 返回一个对象
function example () {
    return {
        foo: 1,
        bar: 2
    }
}

let {foo, bar} = example()
```

- 函数参数的定义

> 解构赋值可以方便地将一组参数与变量名对应起来

```
// 参数是一组有次序的值
function f([x, y, z]) {
    ...
}
f([1, 2, 3])

// 参数是一组无次序的值
function f({x, y, z}) {
    ...
}
f({x: 2, y: 4, z: 1})
```

-提取JSON数据
```
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```
- 遍历Map结构

- 输入模块的指定方法