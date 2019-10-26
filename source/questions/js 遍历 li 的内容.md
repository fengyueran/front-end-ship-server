---
title: js 遍历 li 的内容
tags: [JavaScript]
type: CODE
date: 2018-3-06 18:10:20
---

遍历 ul 的子元素 li，并将 li 的内容拼接为字符串。
dom 结构如下:

```
<ul id="ul">
  <li>1</li>
  <li>2</li>
</ul>
```

<ul id="ul">
  <li>1</li>
  <li>2</li>
</ul>

---

遍历方法如下:

```
  const concatLiContent = (ul) => {
    const lis = ul.children;
    let str='';
    for(let i = 0; i < lis.length; i++) {
      const li = lis[i];
      str+=li.innerText;
    }
    return str;
  }
  或
  const concatLiContent = (ul) => {
    const lis = ul.children;
    const realArr = [].slice.call(lis);
    let str='';
    realArr.forEach((li) => {
      str+=li.innerText;
    })
    return str;
  }
  const ul = document.getElementById('ul');
  concatLiContent(ul);

```
