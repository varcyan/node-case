

#### 浏览器兼容性问题 

尽管有 ECMAScript 作为 JavaScript 的语法和语言特性标准，但是关于 JavaScript 其他方 面的规范还是不明确，同时不同浏览器又加入了各自特有的对象、函数。这也就是为什么这 么多年来同样的 JavaScript 代码会在不同的浏览器中呈现出不同的效果，甚至在一个浏览器 中可以执行，而在另一个浏览器中却不可以。 要注意的是，浏览器的兼容性问题并不只是由 JavaScript 的兼容性造成的，而是 DOM、 BOM、CSS 解析等不同的行为导致的。



#### commonjs

CommonJS 试图定义一套普通应 用程序使用的API，从而填补 JavaScript 标准库过于简单的不足。CommonJS 的终极目标是 制定一个像 C++ 标准库一样的规范，使得基于 CommonJS API 的应用程序可以在不同的环 境下运行，就像用 C++ 编写的应用程序可以使用不同的编译器和运行时函数库一样。为了 保持中立，CommonJS 不参与标准库实现，其实现交给像 Node.js 之类的项目来完成。图1-5 是 CommonJS 的各种实现。

CommonJS 规范包括了模块（modules）、包（packages）、系统（system）、二进制（binary）、 控制台（console）、编码（encodings）、文件系统（filesystems）、套接字（sockets）、单元测 试（unit testing）等部分。



**使用命令行执行语句，如输出内容**：`node -e console.log('node -e 后输入需要执行的语句')`



####  REPL 模式

运行无参数的 node 将会启动一个 JavaScript 的交互式 shell

```shell
$ node
> console.log('Hello World');
Hello World
undefined
> consol.log('Hello World');
ReferenceError: consol is not defined
 at repl:1:1
 at REPLServer.eval (repl.js:80:21)
 at repl.js:190:20
 at REPLServer.eval (repl.js:87:5)
 at Interface.<anonymous> (repl.js:182:12)
 at Interface.emit (events.js:67:17)
 at Interface._onLine (readline.js:162:10)
 at Interface._line (readline.js:426:8)
 at Interface._ttyWrite (readline.js:603:14)
 at ReadStream.<anonymous> (readline.js:82:12) 
```

进入 REPL 模式以后，会出现一个“>”提示符提示你输入命令，输入后按回车，Node.js 将会解析并执行命令。

如果你执行了一个函数，那么 REPL 还会在下面显示这个函数的返回 值，上面例子中的 undefined 就是 console.log 的返回值。

如果你输入了一个错误的 指令，REPL 则会立即显示错误并输出调用栈。

**退出 Node.js 的 REPL 模式** 在任何时候，连续按两次 Ctrl + C 即可。



#### supervisor实时监听

安装

```shell
$ npm install -g supervisor
```

启动

```shell
$ supervisor app.js
```



####  同步式 I/O 和异步式 I/O 

什么是阻塞（block）呢？线程在执行中如果遇到磁盘读写或网络通信（统称为 I/O 操作）， 通常要耗费较长的时间，这时操作系统会剥夺这个线程的 CPU 控制权，使其暂停执行，同 时将资源让给其他的工作线程，这种线程调度方式称为 阻塞。当 I/O 操作完毕时，操作系统 将这个线程的阻塞状态解除，恢复其对CPU的控制权，令其继续执行。这种 I/O 模式就是通 常的同步式 I/O（Synchronous I/O）或阻塞式 I/O （Blocking I/O）。

 相应地，异步式 I/O （Asynchronous I/O）或非阻塞式 I/O （Non-blocking I/O）则针对 所有 I/O 操作不采用阻塞的策略。当线程遇到 I/O 操作时，不会以阻塞的方式等待 I/O 操作 的完成或数据的返回，而只是将 I/O 请求发送给操作系统，继续执行下一条语句。当操作 系统完成 I/O 操作时，以事件的形式通知执行 I/O 操作的线程，线程会在特定时候处理这个 事件。为了处理异步 I/O，线程必须有事件循环，不断地检查有没有未处理的事件，依次予 以处理。 

阻塞模式下，一个线程只能处理一项任务，要想提高吞吐量必须通过多线程。而非阻塞 模式下，一个线程永远在执行计算操作，这个线程所使用的 CPU 核心利用率永远是 100%， I/O 以事件的方式通知。在阻塞模式下，多线程往往能提高系统吞吐量，因为一个线程阻塞 时还有其他线程在工作，多线程可以让 CPU 资源不被阻塞中的线程浪费。而在非阻塞模式 下，线程不会被 I/O 阻塞，永远在利用 CPU。多线程带来的好处仅仅是在多核 CPU 的情况 下利用更多的核，而Node.js的单线程也能带来同样的好处。这就是为什么 Node.js 使用了单 线程、非阻塞的事件编程模式。

![image-20200401165723796](/node.js.assets/image-20200401165723796.png)



![image-20200401165810990](/node.js.assets/image-20200401165810990.png)



单线程事件驱动的异步式 I/O 比传统的多线程阻塞式 I/O 究竟好在哪里呢？简而言之， 异步式 I/O 就是少了多线程的开销。对操作系统来说，创建一个线程的代价是十分昂贵的， 需要给它分配内存、列入调度，同时在线程切换的时候还要执行内存换页，CPU 的缓存被 清空，切换回来的时候还要重新从内存中读取信息，破坏了数据的局部性。① 当然，异步式编程的缺点在于不符合人们一般的程序设计思维，容易让控制流变得晦涩 难懂，给编码和调试都带来不小的困难。习惯传统编程模式的开发者在刚刚接触到大规模的异 步式应用时往往会无所适从，但慢慢习惯以后会好很多。尽管如此，异步式编程还是较为困难， 不过可喜的是现在已经有了不少专门解决异步式编程问题的库（如async）



| : 同步式 I/O（阻塞式）              | :异步式 I/O（非阻塞式）    |
| ----------------------------------- | -------------------------- |
| 利用多线程提供吞吐量                | 单线程即可实现高吞吐量     |
| 通过事件片分割和线程调度利用多核CPU | 通过功能划分利用多核CPU    |
| 需要由操作系统调度多线程使用多核    | CPU 可以将单进程绑定到单核 |
| CPU 难以充分利用                    | CPU 资源 可以充分利用      |
| CPU 资源 内存轨迹大，数据局部性弱   | 内存轨迹小，数据局部       |
| 符合线性的编程思维                  | 不符合传统编程思维         |

 

#### 模块和包

模块是 Node.js 应用程序的基本组成部分，文件和模块是一一对应的。换言之，一个 Node.js 文件就是一个模块，这个文件可能是 JavaScript 代码、JSON 或者编译过的 C/C++ 扩展。 在前面章节的例子中，我们曾经用到了 var http = require('http')，其中 http 是 Node.js 的一个核心模块，其内部是用 C++ 实现的，外部用 JavaScript 封装。我们通过 require 函数获取了这个模块，然后才能使用其中的对象。



**注意** exports 直接赋值代替对 module.exports 赋值。 exports 实际上只是一个和 module.exports 指向同一个对象的变量， 它本身会在模块执行结束后释放，但 module 不会，因此只能通过指定 module.exports 来改变访问接口。