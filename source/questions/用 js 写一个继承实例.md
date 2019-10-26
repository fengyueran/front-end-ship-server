---
title: 用 js 写一个继承实例
tags: [JavaScript]
type: SHORT_ANSWER
date: 2018-5-08 18:10:20
---

```
function Parent(name, age) {
  this.name = name;
  this.age = age;
  function getName() {
    console.log(this.name);
  }
}

function Child(name, age) {
  Parent.call(this, name, age)
  this.weight = 120;
}

const snow = new Child('snow', '20');
console.log(snow.name)
```
