[观察者模式](../../questions/119.%E5%9B%BE%E8%A7%A39%E7%A7%8D%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F.md#五、观察者模式)

### 观察者模式

```ts
class Observer {
  update = (data: any) => {
    console.log('update', data);
  };
}

class Subject {
  private observers: Observer[] = [];

  addObserver = (observer: Observer) => {
    this.observers.push(observer);
  };

  deleteObserver = (observer: Observer) => {
    const index = this.observers.findIndex((ob) => ob === observer);
    if (index >= 0) {
      this.observers.splice(index, 1);
    }
  };

  notifyObservers = () => {
    this.observers.forEach((ob) => {
      ob.update(this);
    });
  };
}

class SalesPublisher extends Subject {
  private price: number;
  constructor() {
    super();
    this.price = 12000;
  }

  getPrice = () => this.price;

  changePrice = (price: number) => {
    this.price = price;
    this.notifyObservers();
  };
}

class BuyerObserver extends Observer {
  constructor(private name: string) {
    super();
    this.name = name;
  }
  update = (saler: SalesPublisher) => {
    const price = saler.getPrice();
    console.log(`${this.name} update, price:${price}`);
  };
}

const saler = new SalesPublisher();

const buyer1 = new BuyerObserver('lily');
saler.addObserver(buyer1);

const buyer2 = new BuyerObserver('lucy');
saler.addObserver(buyer2);

saler.changePrice(10000);

saler.deleteObserver(buyer2);
saler.changePrice(20000);
/*
输出：
lily update, price:10000
lucy update, price:10000
lily update, price:20000
*/
```

### 发布订阅者模式

```ts
type Handler = (...args: any) => void;

class EventEmitter {
  private topicMap: {
    [key: string]: Handler[];
  } = {};

  on = (topic: string, handler: Handler) => {
    const handlers: Handler[] = this.topicMap[topic] || [];
    handlers!.push(handler);
    this.topicMap[topic] = handlers;
  };

  off = (topic: string, handler?: Handler) => {
    if (!handler) {
      delete this.topicMap[topic];
      return;
    }

    const handlers = this.topicMap[topic] && [];
    const index = handlers.findIndex((h) => h === handler);
    if (index < 0) return;

    handlers.splice(index, 1);
    this.topicMap[topic] = handlers;
  };

  emit = (topic: string, ...args: any) => {
    const handlers = this.topicMap[topic];
    if (!handlers) return;

    handlers.forEach((handler) => {
      try {
        handler(...args);
      } catch (error) {
        console.error(error);
      }
    });
  };
}

const emitter = new EventEmitter();

emitter.on('ts', (data: string) => {
  console.log('ts change:', data);
});

emitter.on('js', (data: string) => {
  console.log('js change:', data);
});

emitter.emit('js', 'javacript');
emitter.emit('ts', 'typescript');

/*
输出：
js change: javacript
ts change: typescript
*/
```

通过 emitter 发布消息：

```ts
class SalesPublisher {
  private price: number;
  emitter: EventEmitter;
  constructor() {
    this.price = 12000;
    this.emitter = new EventEmitter();
  }

  changePrice = (price: number) => {
    this.price = price;
    this.emitter.emit('priceChange', price);
  };
}

const saler = new SalesPublisher();

saler.emitter.on('priceChange', (priceChange: number) => {
  console.log('priceChange:', priceChange);
});

saler.changePrice(10000);
/*
输出：
priceChange: 10000
*/
```

### 总结

- 观察者模式：

  角色很明确，没有事件调度中心作为中间者，目标对象 Subject 和观察者 Observer 都要实现约定的成员方法。
  双方联系更紧密，目标对象的主动性很强，自己收集和维护观察者，并在状态变化时主动通知观察者更新。

- 发布订阅者模式：

  发布订阅模式中，发布者不直接触及到订阅者、而是由统一的第三方来完成实际的通信的操作，互不关心对方是谁。
  松散耦合，灵活度高，常用作事件总线

看的出来，发布订阅者模式更加高级，因为它更加松散，没有耦合，那是不是现实中发布订阅者模式用的更多呢？实际上不是的。因为在实际开发中，我们的模块解耦诉求并不是要求它们完全解耦，如果两个模块之间本身存在关联，且这种关联是稳定的、必要的，那这时就应该用观察者模式即可。
