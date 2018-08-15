# mrc
miniprogram request cache

## ????
```javascript
//app.js

//??request????
import Mrc from './dist/mrc.min';

//?????????
App({
	wxp: new Mrc({
		prefix: '___CACHE___',			//????????????___CACHE___
		timeout: 600000,				//????????????ms???10??
	}),
})
```

```javascript
//page.js
const app = getApp()

Page({
	data: {

	},
	onLoad: function () {
		this.wxp.request({
			url: 'http://xxxxxx',
			cache: {
				enable: true,			    //????????????false
				type: 'snapshot',		    //????????????(timeout)???(snapshot)?????
				timeout: 600000,		 	//????????????????????>????>????
			},
		})
			.then((res) => {
				//????????????????promise??????????????
				return res.req;
			})
			.then((res) => {
				console.log(res);

			})
	},
})
```

## API
### ????
| Options|     Type|   Required|   Default|   Description|
| :-------- | --------:| :------: | :------: | :------: |
| prefix|   String |  No|  \_\_\_CACHE___|  ????????????\_\_\_CACHE___|
| timeout|   Number|  No|  600000|  ????????????ms???10??|

### ????
| Options|     Type|   Required|   Default|   Description|
| :-------- | --------:| :------: | :------: | :------: |
| enable|  Boolean |  No|  false|  ????????????false|
| type|   String|  No|  snapshot|  ????????????(timeout)???(snapshot)?????|
| timeout|   Number|  No|  600000|  ????????????????????>????>????|

## Note
1. ??????????????????????**timeout**????
2. ??????????????then??????????promise???????then???????????
3. ????????enable=false???????mrc???????????????promise