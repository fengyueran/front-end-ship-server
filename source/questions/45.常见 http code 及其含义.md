---
title: 常见 http code 及其含义
tags: [HTTP]
type: SHORT_ANSWER
date: 2018-7-06 18:10:20
---

- 信息响应(1xx)

  表示服务器收到请求，需要请求者继续执行操作

  - 100 Continue: 客户端应继续其请求。

- 成功(2xx)

  表示服务器成功接收请求并处理返回

  - 200 Ok: 请求正常处理完毕。一般用于 GET 与 POST 请求
  - 202 Accepted: 服务器已经接受到消息，但尚未处理
  - 204 No Content: 服务器成功处理了请求但未返回任何内容
  - 206 Partial Content: 服务器成功处理了部分 get 请求

- 重定向(3xx)

  表示需要客户端进一步操作才能完成请求

  - 301 Moved Permanently: 永久重定向，请求的资源已永久移动到新 URI
  - 302 Found: 临时重定向，资源临时移动到新的位置
  - 304 Not Modified: 表示资源在由请求头中的 If-Modified-Since 或 If-None-Match 参数指定的这一版本之后没有被修改，客户端仍能够拿到该资源的缓存无需再次传送。
  - 307 Temporary Redirect: 临时重定向，不允许更改请求方法

- 客户端错误(4xx)

  表示客户端可能发生了错误

  - 400 Bad Request: 由于明显的客户端错误(格式错误，太大的大小等)，服务器无法理解
  - 401 Unauthorized: 要求身份验证
  - 403 Forbidden: 服务器理解请求但拒绝执行
  - 404 Not Found: 服务器没有找到资源

- 服务器错误(5xx)

  表示服务器无法完成请求

  - 500 Internal Server Error: 服务器遇到未知问题，无法处理请求
  - 503 Service Unavailable: 由于过载或临时的服务器维护导致的服务器暂时无法处理请求
