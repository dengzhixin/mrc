//app.js
import Mrc from './dist/mrc.min';
// import Mrc from './components/mrc/mrc';

App({
	wxp: new Mrc({
		prefix: '___CACHE___',			//选填，存储字段前缀，默认___CACHE___
		timeout: 600000,				//选填，缓存多长时间，单位ms，默认10分钟
	}),
	onLaunch: function () {

		this.wxp.request({
			url: 'http://fe.wxpay.oa.com/mock_server/mock/18/carnival/shakehb',
			method: 'POST',
			cache: {
				enable: true,			//选填，是否开启缓存，默认false
				type: 'timeout',		//选填，开启缓存类型，定时(timeout)、快照(snapshot)，默认定时
				timeout: 600000,			//选填，定时缓存时间，使用优先级，当前配置>全局配置>默认配置
			},
			data: {
				shake_param: 'xxxx'
			},
		})
			.then((res) => {
			debugger;
				console.log(res);
				return res.req;
			})
			.then((res) => {
			debugger;
				console.log(res);

			})
	},
})