总结：
1.bind()函数只能针对已经存在的元素进行事件的设置；但是live(),on(),delegate()均支持未来新添加元素的事件设置。
2.live()函数和delegate()函数两者类似，但是live()函数在执行速度，灵活性和CSS选择器支持方面较delegate()差些。
3.bind()支持Jquery所有版本；live()支持jquery1.8-；delegate()支持jquery1.4.2+；on()支持jquery1.7+；
bind()和delegate()在JQuery3.0以后过期了，推荐使用on().　