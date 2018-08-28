# Javascript发展历程

https://www.cnblogs.com/ghost-xyx/p/4035615.html

ES1:与**Netscape**的**JavaScript1.1**相同

ES2:主要是编辑加工的结果，没有作任何新增、修改或删节处理。

ES3: 修改内容包括字符串处理、错误定义和数值输出。这一版还新增了对正则表达式、新控制语句、**try-catch**异常处理的支持，并围绕标准的国际化做出了一些小的修改。第3版也标志着**ECMAScript**成为了一门真正的编程语言.

ES4:过于复杂，废弃了。

ES5: ES4废弃，**ECMAScript 3.1**最终成为**ECMA-262第5版**。第5版力求澄清第3版中已知的歧义并添加了新的功能，包括原生**JSON对象**、**继承的方法**和**高级属性定义**，以及严格模式。 

详细的手册：http://lzw.me/pages/ecmascript

一个完整的**JavaScript**实现应由三个部分组成：

*1.核心（ECMAScript）*

*2.文档对象模型（DOM）*

*3.浏览器对象模型（BOM）*

# ES5

js继承有几种方式

回调

学习推荐：http://bonsaiden.github.io/JavaScript-Garden/zh/

# ES6

http://jspang.com/post/es6.html

新增了一些有用的特性：

- let/const

- 字符串特性
  - 字符串模板
  - 字符串查找
    - includes/startsWith/endsWith

- 数字操作

- 数组新方法
  - Array.of
- 箭头函数
- 对象
- 新增的数据结构 Set Map
- Promise对象的使用 
  - 特别有用，将回调转成链式调用，可读性增强了不少。
- class类
- 模块化操作



# 其他



编码过程中的一些心得体会。

1.我们经常在js里生成html元素，如果属性字符串含有双引号(")，< >等，会导致html解析不完整，不能正常显示。这种情况下我们需要对属性字符串进行转义。

|字符	|十进制	|转义字符|
|--|--|--|
|"	| &#34;|	&quot;|
|&	|&#38;	|&amp;|
|<	|&#60;	|&lt;|
|>	|&#62;	|&gt;|
|撇号(`)	| &#39;| &apos;(IE不支持) | 

