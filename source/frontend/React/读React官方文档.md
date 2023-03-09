## 读[React 官方文档](https://zh-hans.reactjs.org/docs/)

#### JSX 表示对象

JSX 实际就是语法糖，Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。

以下两种示例代码完全等效：

```js
const element = <h1 className="greeting">Hello, world!</h1>;
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, world!'
);
```

#### JSX 防止注入攻击

你可以安全地在 JSX 当中插入用户输入内容：

```js
const title = response.potentiallyMaliciousInput;
// 直接使用是安全的：
const element = <h1>{title}</h1>;
```

React DOM 在渲染所有输入内容之前，默认会进行[转义](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-in-html)。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 [XSS（cross-site-scripting, 跨站脚本）攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。

### 避免兜底

任何组件都可能因渲染而暂停，甚至是已经展示给用户的组件。为了使屏幕内容始终一致，如果一个已经显示的组件暂停，React 必须隐藏它的树，直到最近的 `<Suspense> `边界。然而，从用户的角度来看，这可能会使人很困惑。

参考这个标签切换的示例：

```js
import React, { Suspense } from 'react';
import Tabs from './Tabs';
import Glimmer from './Glimmer';

const Comments = React.lazy(() => import('./Comments'));
const Photos = React.lazy(() => import('./Photos'));

function MyComponent() {
  const [tab, setTab] = React.useState('photos');

  function handleTabSelect(tab) {
    setTab(tab);
  }

  return (
    <div>
      <Tabs onTabSelect={handleTabSelect} />
      <Suspense fallback={<Glimmer />}>
        {tab === 'photos' ? <Photos /> : <Comments />}
      </Suspense>
    </div>
  );
}
```

在这个示例中，如果标签从 'photos' 切换为 'comments'，但 Comments 会暂停，用户会看到屏幕闪烁。这符合常理，因为用户不想看到 'photos'，而 Comments 组件还没有准备好渲染其内容，而 React 为了保证用户体验的一致性，只能显示上面的 Glimmer，别无选择。

然而，有时这种用户体验并不可取。特别是在准备新 UI 时，展示 “旧” 的 UI 会体验更好。你可以尝试使用新的 [startTransition](https://zh-hans.reactjs.org/docs/react-api.html#starttransition) API 来让 React 实现这一点：

```js
function handleTabSelect(tab) {
  startTransition(() => {
    setTab(tab);
  });
}
```

此处代码会告知 React，将标签切换为 'comments' 不会标记为紧急更新，而是标记为需要一些准备时间的 [transition](https://zh-hans.reactjs.org/docs/react-api.html#transitions)。然后 React 会保留旧的 UI 并进行交互，当它准备好时，会切换为` <Comments />`，具体请参阅 [Transitions](https://zh-hans.reactjs.org/docs/react-api.html#transitions) 以了解更多相关信息。

#### 组件组合

如果你只是想避免层层传递一些属性，[组件组合（component composition）](https://zh-hans.reactjs.org/docs/composition-vs-inheritance.html)有时候是一个比 context 更好的解决方案。

比如，考虑这样一个 Page 组件，它层层向下传递 user 和 avatarSize 属性，从而让深度嵌套的 Link 和 Avatar 组件可以读取到这些属性：

```jsx
<Page user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<PageLayout user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<NavigationBar user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link>
```

如果在最后只有 Avatar 组件真的需要 user 和 avatarSize，那么层层传递这两个 props 就显得非常冗余。而且一旦 Avatar 组件需要更多从来自顶层组件的 props，你还得在中间层级一个一个加上去，这将会变得非常麻烦。

一种 无需 context 的解决方案是将 Avatar 组件自身传递下去，因为中间组件无需知道 user 或者 avatarSize 等 props：

```jsx
function Page(props) {
const user = props.user;
const userLink = (

<Link href={user.permalink}>
<Avatar user={user} size={props.avatarSize} />
</Link>
);
return <PageLayout userLink={userLink} />;
}

// 现在，我们有这样的组件：
<Page user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<PageLayout userLink={...} />
// ... 渲染出 ...
<NavigationBar userLink={...} />
// ... 渲染出 ...
{props.userLink}
```

这种变化下，只有最顶部的 Page 组件需要知道 Link 和 Avatar 组件是如何使用 user 和 avatarSize 的。

#### 转发 refs 到 DOM 组件

```js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

#### 约定：包装显示名称以便轻松调试

HOC 创建的容器组件会与任何其他组件一样，会显示在 React Developer Tools 中。为了方便调试，请选择一个显示名称，以表明它是 HOC 的产物。

最常见的方式是用 HOC 包住被包装组件的显示名称。比如高阶组件名为 withSubscription，并且被包装组件的显示名称为 CommentList，显示名称应该为
WithSubscription(CommentList)：

```jsx
function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component {
    /* ... */
  }
  WithSubscription.displayName = `WithSubscription(${getDisplayName(
    WrappedComponent
  )})`;
  return WithSubscription;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
```
