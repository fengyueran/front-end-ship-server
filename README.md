# front-end-ship-server

front-end-ship-server

### vps 更换

- 修改 ip

  1. 脚本 deploy.sh 的 ip 需要更换。
  2. front-end-ship config-overrides.js、 deploy.sh ip 需要修改

- nginx 配置需要修改

  ```
    // /etc/nginx/nginx.conf
    server_name www.mxinghun.com 207.246.67.83
  $ nginx -s stop
  $ service nginx start

  ```

- 启动 server.js

  ```
  $ cd /root/server/front-end-ship-server
  $ pm2 start server.js
  ```

- 修改 dns

  ```
  https://console.dnspod.cn/dns/xinghunm.com/record
  ```
