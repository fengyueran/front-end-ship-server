[React setState](../../questions/143.React%20setState.md)
[React 中 setState 什么时候是同步的](../../questions/74.React%20%E4%B8%AD%20setState%20%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E6%98%AF%E5%90%8C%E6%AD%A5%E7%9A%84%EF%BC%8C%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E6%98%AF%E5%BC%82%E6%AD%A5%E7%9A%84.md)

```js
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0,
    };
  }

  componentDidMount() {
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 第 1 次 log//0

    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 第 2 次 log//0

    setTimeout(() => {
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 第 3 次 log//2

      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 第 4 次 log//3
    }, 0);
  }

  render() {
    return null;
  }
}
```
