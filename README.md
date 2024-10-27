## 自定义动态图标参考

参考2018年Terence Eden开源的动态日历图标：[edent/Dynamic-SVG-Calendar-Icon: Here it is, an SVG calendar which always display&apos;s tod    ay&apos;s date.](https://github.com/edent/Dynamic-SVG-Calendar-Icon)（wolai的动态日历图标是2020.09.04才出的，见[wolai 2020.9更新](https://www.wolai.com/3mjQy4XaboBwXRRqiYKvvf#pG96N9sBpeTTGvEw23KQZr)）

Terence Eden的

![](https://fastly.jsdelivr.net/gh/Achuan-2/PicBed/assets/PixPin_2024-10-27_14-27-14-2024-10-27.png)

wolai的

![](https://fastly.jsdelivr.net/gh/Achuan-2/PicBed/assets/PixPin_2024-10-27_14-27-24-2024-10-27.png)

## 参数

* `type`：图标类型，默认为1

  1. `type=1`：显示年月日星期
  2. `type=2`​ **：** 显示年月日
  3. `type=3`​ **：** 仅显示年月
  4. `type=4`​ **：** 仅显示年
  5. `type=5`​ **：** 当前周数
  6. `type=6`：仅返回星期
  7. `type=7`：倒数日
  8. `type=8`：汉字字母数字图标
* `locale`：中英文切换，默认为cn，仅在type=1、2、3、5、6、7时有效

  * `locale=cn`：显示中文
  * `locale=en`：显示英文
* `color`：设置配色，一共八种配色

  ![](https://fastly.jsdelivr.net/gh/Achuan-2/PicBed/assets/20241027142748-2024-10-27.png)

  * `color=red`
  * `color=blue`
  * `color=yellow`
  * `color=green`
  * `color=purple`
  * `color=pink`
  * `color=orange`
  * `color=grey`
* `date`: 设置日期，默认为当前日期，日期设置格式为`yyyy-mm-dd`，仅在type=1-6时有效
* `content`：设置文字图标的内容，默认为空，仅在type=8时有效

## 示例

### type=1：显示年月日星期

默认显示今天的日期。

可通过`date=2024-10-26`指定显示的日期

![](https://fastly.jsdelivr.net/gh/Achuan-2/PicBed/assets/20241027142805-2024-10-27.png)

```markdown
![](http://localhost:45678/?color=red&locale=cn&date=2024-10-27)
![](http://localhost:45678/?color=red&locale=en&date=2024-10-27)
```

### type=2：显示年月日

![](https://fastly.jsdelivr.net/gh/Achuan-2/PicBed/assets/20241027142810-2024-10-27.png)


```markdown
![](http://localhost:45678/?type=2&color=red&locale=&date=2024-10-27)
![](http://localhost:45678/?type=2&color=red&locale=en&date=2024-10-27)
```

### **type=3**：仅显示年月

![](https://fastly.jsdelivr.net/gh/Achuan-2/PicBed/assets/20241027142822-2024-10-27.png)


```markdown
![](http://localhost:45678/?type=3&color=red&locale=cn&date=2024-10-27)
![](http://localhost:45678/?type=3&color=red&locale=en&date=2024-10-27)

```

### **type=4**：仅显示年

![](https://fastly.jsdelivr.net/gh/Achuan-2/PicBed/assets/20241027142832-2024-10-27.png)

```markdown
![](http://localhost:45678/?type=4&color=red&locale=cn&date=2024-10-27)
```

### type=5：当前周数

![](https://fastly.jsdelivr.net/gh/Achuan-2/PicBed/assets/20241027142842-2024-10-27.png)

```markdown
![](http://localhost:45678/?type=5&color=red&locale=cn&date=2024-10-27)

![](http://localhost:45678/?type=5&color=red&locale=en&date=2024-10-27)
```

### type=6：仅返回星期

不输入color的话，默认星期一到星期五为红色，星期六和星期日为蓝色

![](https://fastly.jsdelivr.net/gh/Achuan-2/PicBed/assets/20241027142857-2024-10-27.png)


```markdown
![](http://localhost:45678/?type=6&locale=en&date=2024-10-21 "星期一")

![](http://localhost:45678/?type=6&locale=en&date=2024-10-22 "星期二")

![](http://localhost:45678/?type=6&locale=en&date=2024-10-23 "星期三")

![](http://localhost:45678/?type=6&locale=en&date=2024-10-24 "星期四")

![](http://localhost:45678/?type=6&locale=en&date=2024-10-25 "星期五")

![](http://localhost:45678/?type=6&locale=en&date=2024-10-26 "星期六")

![](http://localhost:45678/?type=6&locale=en&date=2024-10-27 "星期日")
```

指定color

![](https://fastly.jsdelivr.net/gh/Achuan-2/PicBed/assets/20241027142906-2024-10-27.png)


```markdown
![](http://localhost:45678/?type=6&locale=en&date=2024-10-21&color=red "星期一")

![](http://localhost:45678/?type=6&locale=cn&date=2024-10-22&color=blue "星期二")

![](http://localhost:45678/?type=6&locale=cn&date=2024-10-23&color=green "星期三")

![](http://localhost:45678/?type=6&locale=cn&date=2024-10-24&color=yellow "星期四")

![](http://localhost:45678/?type=6&locale=cn&date=2024-10-25&color=purple "星期五")

![](http://localhost:45678/?type=6&locale=cn&date=2024-10-26&color=pink "星期六")

![](http://localhost:45678/?type=6&locale=cn&date=2024-10-27&color=grey "星期日")
```

### type=7：倒数日

该图标会显示当前日期与指定日期之间的天数。

支持 `locale=en` 修改为英文：

* `已过` 用 `Past` 表示。
* `还有` 用 `Left` 表示。

![](https://fastly.jsdelivr.net/gh/Achuan-2/PicBed/assets/20241027142922-2024-10-27.png)


```markdown
![](http://localhost:45678/?color=red&date=2024-10-22&type=7&locale=cn)
![](http://localhost:45678/?color=red&date=2024-10-22&type=7&locale=en)
```

![](https://fastly.jsdelivr.net/gh/Achuan-2/PicBed/assets/20241027142940-2024-10-27.png)

```markdown
![](http://localhost:45678/?color=red&type=7&locale=cn)
![](http://localhost:45678/?color=red&type=7&locale=en)
```

![](https://fastly.jsdelivr.net/gh/Achuan-2/PicBed/assets/PixPin_2024-10-27_14-30-03-2024-10-27.png)


```markdown
![](http://localhost:45678/?color=red&date=3035-10-26&type=7&locale=cn)
![](http://localhost:45678/?color=red&date=3035-10-26&type=7&locale=en)
```


### type=8：文字图标

该图标可以显示文字。

![](https://fastly.jsdelivr.net/gh/Achuan-2/PicBed/assets/20241027143019-2024-10-27.png)


```markdown
![](http://localhost:45678/?type=8&content=知乎&color=blue)
![](http://localhost:45678/?type=8&content=GREAT&color=red)
```