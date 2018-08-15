let request = {};

const successRes = {
	"data": {
		"errcode": 0,
		"msg": "succeed",
		"data": {
			"test": 1
		}
	},
	"header": {
		"x-proxy-by": "SmartProxy PC-OA-Gate",
		"Date": "Wed, 15 Aug 2018 07:37:39 GMT",
		"Content-Type": "application/json; charset=utf-8",
		"Content-Length": "476",
		"Connection": "keep-alive",
		"Access-Control-Allow-Origin": "*",
		"x-forwarded-for": "10.85.12.32,10.14.87.206,10.14.87.233",
		"set-cookie": "x_host_key=1653c84dbc1-ca60ff16d45d586dc429f7cabdf8d7c57b5df7f3; path=/; domain=.oa.com; HttpOnly"
	},
	"statusCode": 200,
	"errMsg": "request:ok",
	"type": ""
}
const failRes = {
	"errMsg": "request:fail"
}

request.request = function (obj) {
	obj.success && setTimeout(() => obj.success(successRes), 0)
	obj.complete && setTimeout(() => obj.complete(successRes), 0)

}

request.requestFail = function (obj) {
	obj.fail && setTimeout(() => obj.fail(failRes), 0)
	obj.complete && setTimeout(() => obj.complete(failRes), 0)
}

export default request;