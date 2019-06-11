---
title: JSON 是什么
tags: [OTHER]
type: SHORT_ANSWER
date: 2018-3-16 18:10:20
---

JSON(JavaScript Object Notation)是一种轻量级的数据交换格式，它是 JavaScript 的一个子集。数据格式简单，易于读写，占用宽带小。如{ "name": "xinghunm", "age": 18 }。

JSON 有两种表示结构: 对象和数组

- 对象

  对象以左大括号`{`开始，以右大括号`}`结束，括号间由 key-value 的键值对组成，键值对间由逗号','分割，最后一个键值对可以省略逗号，键值对的 key 为字符串，值可以是字符串、数值、对象、布尔值、数组以及 null。

  ```
    {
      "name": "xinghunm",
      "age": 18
    }
  ```

- 数组

  数组以左中括号`[`开始，以右中括号`]`结束，中间由逗号分割的多个键值对列表组成。

  ```
    [
      {
        "name": "xinghunm",
        "age": 18
      },
      {
        "name": "snow",
        "age": 18
      }
    ]
  ```

JSON 对象提供了字符串、对象相互转换的接口:

- 字符串转 json 对象

```
  const obj = JSON.parse(str)
```

- 对象转 JSON 字符串

```
  const jsonStr = JSON.Stringify(obj)
```
