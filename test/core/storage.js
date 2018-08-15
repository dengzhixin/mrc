let storage = {};
storage.__storage__ = {};
storage.__storage__prefix = '___CACHE___';

storage.setStorage = function (obj) {
	if(!obj.key) throw new Error('fail parameter error: parameter.key should be String instead of Undefined');
	let {key, data} = obj;
	storage.__storage__[key] = data;

	obj.success && setTimeout(() => obj.success({errMsg: 'setStorage:ok'}), 0)
	obj.complete && setTimeout(() => obj.complete({errMsg: 'setStorage:ok'}), 0)
}

storage.setStorageFail = function (obj) {
	if(!obj.key) throw new Error('fail parameter error: parameter.key should be String instead of Undefined');

	obj.fail && setTimeout(() => obj.fail({errMsg: 'setStorage:fail'}), 0)
	obj.complete && setTimeout(() => obj.complete({errMsg: 'setStorage:fail'}), 0)
}

storage.setStorageSync = function (key, data) {
	if(!key) throw new Error('fail parameter error: parameter.key should be String instead of Undefined');
	storage.__storage__[storage.__storage__prefix + key] = data;
}

storage.getStorage = function (obj) {
	if(!obj.key) throw new Error('fail parameter error: parameter.key should be String instead of Undefined');

	let data = storage.__storage__[obj.key];

	obj.success && setTimeout(() => obj.success({errMsg: 'getStorage:ok', data: data}), 0)
	obj.complete && setTimeout(() => obj.complete({errMsg: 'getStorage:ok', data: data}), 0)
}

storage.getStorageFail = function (obj) {
	if(!obj.key) throw new Error('fail parameter error: parameter.key should be String instead of Undefined');

	obj.fail && setTimeout(() => obj.success({errMsg: 'getStorage:fail'}), 0)
	obj.complete && setTimeout(() => obj.complete({errMsg: 'getStorage:fail'}), 0)
}

storage.getStorageSync = function (key) {
	if(!key) throw new Error('fail parameter error: parameter.key should be String instead of Undefined');
	return storage.__storage__[storage.__storage__prefix + key];
}

storage.removeStorage = function (obj) {
	if(!obj.key) throw new Error('fail parameter error: parameter.key should be String instead of Undefined');

	delete storage.__storage__[obj.key];

	obj.success && setTimeout(() => obj.success({errMsg: 'removeStorage:ok'}), 0)
	obj.complete && setTimeout(() => obj.complete({errMsg: 'removeStorage:ok'}), 0)
}

storage.removeStorageFail = function (obj) {
	if(!obj.key) throw new Error('fail parameter error: parameter.key should be String instead of Undefined');

	obj.fail && setTimeout(() => obj.success({errMsg: 'removeStorage:fail'}), 0)
	obj.complete && setTimeout(() => obj.complete({errMsg: 'removeStorage:fail'}), 0)
}

storage.removeStorageSync = function (key) {
	if(!key) throw new Error('fail parameter error: parameter.key should be String instead of Undefined');

	delete storage.__storage__[storage.__storage__prefix + key];

}

export default storage;
