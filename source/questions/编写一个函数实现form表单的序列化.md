---
title: 编写一个函数实现form表单的序列化
tags: [JavaScript]
type: CODE
date: 2018-5-06 18:10:20
---

即将一个表单中的键值序列化为可提交的字符串。

表单结构大致如下:

```
<form id="target">
    <input name="name" value="xhm" />
    <select name="age">
      <option value="17" selected>17</option>
      <option value="25" selected>25</option>
    </select>
    <input type="password" name="password" value="123456" />
    <input type="hidden" name="salery" value="28888" />
    <input type="checkbox" name="hobby" value="football" checked />Football
    <input type="checkbox" name="hobby" value="basketball" />Basketball
    <input type="radio" name="sex" value="Male" checked />Male
    <input type="radio" name="sex" value="Female" />Female
    <textarea name="description">I am a boy</textarea>
</form>
```

<form id="target">
<input name="name" value="xhm" />
<select name="age">
    <option value="17" selected>17</option>
    <option value="25" selected>25</option>
</select>
<input type="password" name="password" value="123456" />
<input type="hidden" name="salery" value="28888" />
<input type="checkbox" name="hobby" value="football" checked />Football
<input type="checkbox" name="hobby" value="basketball" />Basketball
<input type="radio" name="sex" value="Male" checked />Male
<input type="radio" name="sex" value="Female" />Female
<textarea name="description">I am a boy</textarea>
</form>

---问题

序列化函数如下:

```
var serialize = (form) => {
  const elements = form.elements;
  const parts = [];
  for (let i = 0; i < elements.length; i++) {
    const field = elements[i];
    const { type, name, value } = field;
    if (/select/.test(type)) {
      const options = field.options;
      for (let i = 0; i < options.length; i++) {
        const opt = options[i];
        if (opt.selected) {
          const optValue = opt.value || opt.text;
          const param = `${name}=${encodeURIComponent(optValue)}`;
          parts.push(param);
        }
      }
    } else if (/checkbox|radio/.test(type)) {
      if (field.checked) {
        const param = `${name}=${encodeURIComponent(value)}`;
        parts.push(param);
      }
    } else if (/text|password|textarea|hidden/.test(type)) {
      const param = `${name}=${encodeURIComponent(value)}`;
      parts.push(param);
    }
  }
  return parts.join("&");
};
```
