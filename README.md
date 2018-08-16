# mrc
![enter image description here](https://travis-ci.org/jayZOU/mrc.svg?branch=master)

miniprogram request cache

## 快速上手
```javascript
//app.js

//引入request缓存插件
import Mrc from './dist/mrc.min';

//实例化一个全局引用
App({
	wxp: new Mrc({
		prefix: '___CACHE___',			//选填，存储字段前缀，默认___CACHE___
		timeout: 600000,				//选填，缓存多长时间，单位ms，默认10分钟
	}),
})
```

```javascript
//page.js
const app = getApp()
let {wxp} = app
Page({
	data: {

	},
	onLoad: function () {
		wxp.request({
			url: 'http://xxxxxx',
			cache: {
				enable: true,			    //选填，是否开启缓存，默认false
				type: 'snapshot',		    //选填，开启缓存类型，定时(timeout)、快照(snapshot)，默认定时
				timeout: 600000,		 	//选填，定时缓存时间，使用优先级，当前配置>全局配置>默认配置
			},
		})
			.then((res) => {
				//快照缓存时会多返回一个正式请求的promise对象，用于获取正式请求的数据
				return res.req;
			})
			.then((res) => {
				console.log(res);

			})
	},
})
```

## API
### 全局配置
| Options|     Type|   Required|   Default|   Description|
| :-------- | --------:| :------: | :------: | :------: |
| prefix|   String |  No|  \_\_\_CACHE___|  选填，存储字段前缀，默认\_\_\_CACHE___|
| timeout|   Number|  No|  600000|  选填，缓存多长时间，单位ms，默认10分钟|

### 局部配置
| Options|     Type|   Required|   Default|   Description|
| :-------- | --------:| :------: | :------: | :------: |
| enable|  Boolean |  No|  false|  选填，是否开启缓存，默认false|
| type|   String|  No|  snapshot|  选填，开启缓存类型，定时(timeout)、快照(snapshot)，默认定时|
| timeout|   Number|  No|  600000|  选填，定时缓存时间，使用优先级，当前配置>全局配置>默认配置|

## Note
1. 缓存类型为快照缓存时，缓存的数据为持久缓存，**timeout**设置无效
2. 缓存类型为快照缓存时，第一个then回调会带上正式请求的promise对象，用于下个then回调获取正式请求的数据
3. 不想使用缓存时（enable=false），一样可以用mrc实例化之后的对象正常请求，支持promise
