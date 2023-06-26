[https 握手过程](../../questions/89.%E4%BB%8B%E7%BB%8D%20HTTPS%20%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B.md)

[https 中间人攻击](../../questions/116.%E4%BB%8B%E7%BB%8D%E4%B8%8B%20HTTPS%20%E4%B8%AD%E9%97%B4%E4%BA%BA%E6%94%BB%E5%87%BB.md)

### https 握手过程

1.Client 发起一个 HTTPS（比如https://juejin.im/user/5a9a9cdcf265da238b7d771c）的请求，根据RFC2818的规定，Client知道需要连接Server的443（默认）端口。

2.Server 把事先配置好的公钥证书（public key certificate）返回给客户端。

3.Client 验证公钥证书

1）客户端 Client 读取证书中的相关的明文信息，采用相同的散列函数计算得到信息摘要，然后，利用对应 CA 的公钥解密签名数据，对比证书的信息摘要，如果一致，则可以确认证书的合法性，即服务器的公开密钥是值得信赖的。

2）客户端还会验证证书相关的域名信息、有效时间等信息; 客户端会内置信任 CA 的证书信息(包含服务器公钥)，如果 CA 不被信任，则找不到对应 CA 的证书，证书也会被判定非法。

4.Client 使用伪随机数生成器生成加密所使用的对称密钥，然后用证书的公钥加密这个对称密钥，发给 Server。

5.Server 使用自己的私钥（private key）解密这个消息，得到对称密钥。至此，Client 和 Server 双方都持有了相同的对称密钥。

6.Server 使用对称密钥加密“明文内容 A”，发送给 Client。

7.Client 使用对称密钥解密响应的密文，得到“明文内容 A”。

8.Client 再次发起 HTTPS 的请求，使用对称密钥加密请求的“明文内容 B”，然后 Server 使用对称密钥解密密文，得到“明文内容 B”。
