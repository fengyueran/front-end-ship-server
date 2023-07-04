[curry](../../questions/113.%E8%AF%B7%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%20add%20%E5%87%BD%E6%95%B0%EF%BC%8C%E6%BB%A1%E8%B6%B3%E4%BB%A5%E4%B8%8B%E5%8A%9F%E8%83%BD.md)

https://zh.javascript.info/currying-partials
https://juejin.cn/post/6844903882208837645

根据定义，柯里化应该将 sum(a, b, c) 转换为 sum(a)(b)(c)。

但是，如前所述，JavaScript 中大多数的柯里化实现都是高级版的：它们使得函数可以被多参数变体调用。

```js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, [...args, ...args2]);
      };
    }
  };
}

function add(x, y, z) {
  return x + y + z;
}

var add1 = curry(add);

console.log(add1(1)(2)(3));
```
