---
title: js 将一浮点数小数点左边的数字每三位加一个逗号
tags: [JavaScript]
type: CODE
date: 2018-5-06 18:10:20
---

比如 4456871 转换为 4,456,871; 12345678.25 转换为 12,345,678.25

---

- 利用 parseInt 的 toLocaleString 方法

  ```
  const formatNum = (num) => {
    const formatedNum = num
      .toString()
      .replace(/(\d+)(.*)/g, (match, s1, s2) => `${parseInt(s1, 10).toLocaleString()}${s2}`);
    return formatedNum;
  };
  ```

- 完全用正则替换
  ```
  //当一个字符串中某个数字后跟着 n 对三个数字(\d{3})就匹配这个数字
  const formateNum = (num) => {
    const numStr = num.toString();
    //替换小数点左边的数字
    return numStr.replace(/\d+/, (match) => {
      //替换目标数字为`${matchNum},`
      return match.replace(/(\d)(?=((\d{3})+$))/g, (s1) => `${s1},`);
    })
  }
  或
  const formateNum = (num) => {
    const numStr = num.toString();
    //替换非单词边界，当这个边界后面跟着n对三个数字且后边没有数字时
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  ```
