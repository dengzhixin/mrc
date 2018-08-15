const wxPromise = function (fn) {
	return function (obj = {}) {
		return new Promise((resolve, reject) => {
			obj.success = function (res) {
				resolve(res);
			}
			obj.fail = function (err) {
				reject(err);
			}

			fn(obj)
		})
	}
}

export default wxPromise;