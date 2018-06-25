# Jquery使用心得#

1. 数组方法

```
var dataJson = [{
  role_id : 1,
  name : 'tars-admin',
  desc : 'tars-admin-desc',
  server_groups: ['TarsIM','DemoApp'],
  right_groups: [123]
}];
//数组遍历
$.each(dataJson, function(i, item) {
	//....
}）；
//判断元素在数组中是否存在
var index = $.inArray(value, groups);
if(index > -1) {
    alert('element exist');
}

```



2. 事件绑定

```
bind()函数只能针对已经存在的元素进行事件的设置；但是live(),on(),delegate()均支持未来新添加元素的事件设置。
live()函数和delegate()函数两者类似，但是live()函数在执行速度，灵活性和CSS选择器支持方面较delegate()差些。
bind()支持Jquery所有版本；live()支持jquery1.8-；delegate()支持jquery1.4.2+；on()支持jquery1.7+；
bind()和delegate()在JQuery3.0以后过期了，推荐使用on().　
```



3. form 表单

两种方式

```
<form id="form_id”>  
 <input type="text" id="name"/>  
 <input type="reset" value="这个是Form清除" />  
</form>
```

```
<head>
<script type="text/javascript">
function formReset()
{
	$('#myForm')[0].reset(); 
	//为什么还要[0]?参考https://blog.csdn.net/u013066244/article/details/52862320
}
</script>
</head>

<body>
<p>在下面的文本框中输入一些文本，然后点击重置按钮就可以重置表单。</p>

<form id="myForm">
姓名：<input type="text" size="20" value="111"><br />
年龄：<input type="text" size="20"><br />
<br />
<input type="button" onclick="formReset()" value="重置">
</form>
</body>

</html>
```