## let

let -- 声明变量，只在代码块内有效 （新增了块级作用域）

- 适用于for循环

```
for (let i = 0; i < 10; i++) {
    ......
}
console.log(i) // ReferenceError: i is not defined
```


```
for (let i = 0; i < 3; i++) {
    let i = 'abc'
    console.log(i)
}
```

> for循环有一个特别之处，设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域


---

- 不存在变量提升

> 变量提升：变量可以在声明致歉使用，值为undefined

> 使用let声明变量，不存在变量提升，声明之前使用会抛出一个错误

--- 

- 暂时性死区(TDZ)

> 只要块级作用域内存在let命名，所声明的变量就“绑定”这个区域，不再受外部的影响


```
var tmp = 123

if (true) {
    tmp = 'abc' // ReferenceError
    let tmp
}
```

> 隐蔽得”死区“↓


```
function bar (x=y, y=x) {
    return [x, y]
}
bar() // 报错
```

- 不允许重复声明

---

## 块级作用域

### 为什么需要块级作用域

- 内层变量可能会覆盖外层变量


```
var tmp = new Date()

function f() {
    console.log(tmp)
    if (false) {
        var tmp = 'hello world'
    }
}

f() // undefined
```
> 上面代码的原意是，if代码块的外部使用外层的tmp变量，内部使用内层的tmp变量。但是，函数f执行后，输出结果为undefined，原因在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量


- 用来计数得循环变量泄露为全局变量

```
var s = 'hello'

for (var i = 0; i < s.length; i++) {
    console.log(s[i])
}

console.log(i) // 5
```

> 上面代码中，变量i只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。

### ES6的块级作用域

- 外层代码块不受内层代码块的影响

- ES6允许块级作用域的任意嵌套,外层作用域无法读取内层作用域的变量，内层作用域可以定义外层作用域的同名变量

```
{{{{{ let insane = 'Hello World' }}}}}
```

```
{{{{
  {let insane = 'Hello World'}
  console.log(insane); // 报错
}}}};
```

```
{{{{
  let insane = 'Hello World';
  {let insane = 'Hello World'}
}}}};
```

- 取缔立即执行函数表达式（IIFE）
```
// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}
```
