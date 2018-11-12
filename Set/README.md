## Set

> 定义: 类似于数组,但是成员都是唯一的,没有重复的值

> Set 是一个构造函数,用来生成Set数据解构

```
const s = new Set()

[2, 3, 4, 5, 4, 3, 2].forEeach(x => s.add(x))

for (let x of s) {
    console.log(i)
}
// 2 3 5 4
```
> Set解构不会添加重复的值
> Set函数可以接受一个数组作为参数,用来初始化

```
// 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

// 例三
const set = new Set(document.querySelectorAll('div'));
set.size // 56

// 类似于
const set = new Set();
document
 .querySelectorAll('div')
 .forEach(div => set.add(div));
set.size // 56
```
> 上面代码中，例一和例二都是Set函数接受数组作为参数，例三是接受类似数组的对象作为参数。 

---

### Set实例的属性和方法

#### 属性

 1. Set.prototype.constructor：构造函数，默认就是Set函数。
 2. Set.prototype.size：返回Set实例的成员总数。

#### 操作方法

1. add(value) 添加某个值,返回Set
2. delete(value) 删除某个值,返回一个布尔值,表示删除是否成功
3. has(value) 返回一个布尔值,表示该值是否为Set的成员
4. clear() 清除所有成员,没有返回值

```
s.add(1).add(2).add(2);
// 注意2被加入了两次

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false
```

#### 遍历操作

1. keys() 返回键名的遍历器
2. values() 返回键值的遍历器
3. entries() 返回键值对的遍历器
4. forEach() 使用回调函数遍历每个成员

#### 遍历的应用

- 并集,交集,差集

```
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```