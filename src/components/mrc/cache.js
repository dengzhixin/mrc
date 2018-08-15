const prefix = '___CACHE___';

export const setCacheSync = (opt, expires = 300000) => {
	if(!opt || !opt.key || !opt.value) return ;

	let {key, value} = opt;
	// let expires = 1000 * 60 * 5;			//超时时间

	key = prefix + key;
	let data = {
		key,
		data: value,
		expires,
		timestamp: +new Date()
	}

	wx.setStorageSync(key, data)

}

export const getCacheSync = (key, isExpires = true) => {
	if(!key) return ;
	key = prefix + key;
	const cache = wx.getStorageSync(key)

	if(cache){
		//判断是否超时
		let now = +new Date();
		return now - cache.timestamp > cache.expires && isExpires ? undefined : cache;
	}else{
		return undefined;
	}
}

export const removeCacheSync = (key) => {
	if(!key) return ;
	key = prefix + key;
	wx.removeStorageSync(key)
}

