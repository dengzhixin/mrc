import {setCacheSync, getCacheSync} from './cache';
import wxPromise from './wxPromise';

export default class Mrc {
	constructor(opt = {}) {
		this.opt = {
			prefix: opt.prefix || '___CACHE___',
			timeout: opt.timeout || 600000
		}

		this.req = wxPromise(wx.request);
	}

	request(obj = {}) {
		const that = this;
		obj.cache = obj.cache || {};
		obj.cache = {
			enable: obj.cache.enable || false,
			type: obj.cache.type || 'timeout',
			timeout: obj.cache.timeout || this.opt.timeout,
		}
		if(obj.cache.enable){
			//使用缓存
			if(obj.cache.type == 'snapshot'){
				//使用快照缓存
				//快照缓存没有过期时间，每次使用先获取缓存，然后请求再写入同步缓存
				const cache = getCacheSync(obj.url, false);
				if(cache){
					//存在缓存
					return new Promise((resolve, reject) => {
						const snapshotCache = that.cacheRes(cache.data, obj.cache.type);
						snapshotCache.req = that.sendReq(obj);
						resolve(snapshotCache);
					})
				}else{
					//不存在返还，先请求再同步写入缓存
					return that.sendReq(obj)
				}

			}else{
				//使用定时缓存
				//定时缓存有缓存时间，每次先判断缓存是否过期，过期重新发起请求并重新写入缓存，不过期就使用缓存
				const cache = getCacheSync(obj.url);
				if(cache){
					//存在缓存，返回缓存数据
					return new Promise((resolve, reject) => {
						const timeoutCache = that.cacheRes(cache.data, obj.cache.type);
						resolve(timeoutCache);
					})
				}else{
					//不存在返还，先请求再同步写入缓存
					return that.sendReq(obj)
				}
			}

		}else {
			//不使用缓存，直接请求
			return this.sendReq(obj, obj.cache.enable);
		}
	}

	sendReq(obj, enable = true) {
		const that = this;
		return new Promise((resolve, reject) => {
			that.req(obj)
			.then((res) => {
				if(enable && res.statusCode == 200){
					//写入缓存
					setCacheSync({
						key: obj.url,
						value: res.data
					}, obj.cache.timeout)
				}
				res.type = ''
				resolve(res)
			})
			.catch((err) => {
				reject(err);
			})
		})
	}

	cacheRes(data, type) {
		return {
			data,
			errMsg: 'request:ok',
			header: {},
			statusCode: '',
			type
		}
	}
}