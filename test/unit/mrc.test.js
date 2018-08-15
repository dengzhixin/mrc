require('../core/index');
import {assert, expect} from 'chai';
import Mrc from '../../src/components/mrc/mrc';
import {setCacheSync, getCacheSync} from '../../src/components/mrc/cache';


const wxp = new Mrc({
	prefix: '___CACHE___',			//选填，存储字段前缀，默认___CACHE___
	timeout: 600000,				//选填，缓存多长时间，单位ms，默认10分钟
});

describe('mrc test', () => {
	it('snapshot no cache test', (done) => {
		const url = 'http://snapshottest';
		wxp.request({
			url: url,
			method: 'POST',
			cache: {
				enable: true,			//选填，是否开启缓存，默认false
				type: 'snapshot',		//选填，开启缓存类型，定时(timeout)、快照(snapshot)，默认定时
				timeout: 100000,			//选填，定时缓存时间，使用优先级，当前配置>全局配置>默认配置
			}
		})
			.then((res) => {
				const data = getCacheSync(url);
				expect(data).to.have.property('key').to.equal(wx.__storage__prefix + url);
				expect(data).to.have.property('data').to.equal(res.data);
				expect(data).to.have.property('expires').to.be.an('number').to.equal(100000);
				expect(data).to.have.property('timestamp').to.be.an('number');
				expect(res).to.have.property('type').to.equal('');
				done();
			})
			.catch((err) => {
				done(err);
			})
	})
	it('snapshot has cache test', (done) => {
		const url = 'http://snapshothavecache';

		setCacheSync({
			key: url,
			value: {
				"errcode": 0,
				"msg": "succeed",
				"data": {
					"test": 1
				}
			}
		}, 100000)

		wxp.request({
			url: url,
			method: 'POST',
			cache: {
				enable: true,			//选填，是否开启缓存，默认false
				type: 'snapshot',		//选填，开启缓存类型，定时(timeout)、快照(snapshot)，默认定时
				timeout: 100000,			//选填，定时缓存时间，使用优先级，当前配置>全局配置>默认配置
			}
		})
		.then((res) => {
			//这里返回的是快照缓存
			expect(res).to.have.property('type').to.equal('snapshot');
			expect(res).to.have.property('errMsg').to.equal('request:ok');
			expect(res).to.have.property('header').to.be.empty;
			expect(res).to.have.property('statusCode').to.equal('');
			return res.req;
		})
		.then((res) => {
			//这里返回的是正式请求
			expect(res).to.have.property('type').to.equal('');
			done();

		})
		.catch((err) => {
			done(err);
		})
	})

	it('timeout no cache test', (done) => {
		const url = 'http://timeouttest';
		wxp.request({
			url: url,
			method: 'POST',
			cache: {
				enable: true,			//选填，是否开启缓存，默认false
				type: 'timeout',		//选填，开启缓存类型，定时(timeout)、快照(snapshot)，默认定时
				timeout: 200000,			//选填，定时缓存时间，使用优先级，当前配置>全局配置>默认配置
			}
		})
			.then((res) => {
				const data = getCacheSync(url);
				expect(res).to.have.property('type').to.equal('');
				expect(data).to.have.property('key').to.equal(wx.__storage__prefix + url);
				expect(data).to.have.property('data').to.equal(res.data);
				expect(data).to.have.property('expires').to.be.an('number').to.equal(200000);
				expect(data).to.have.property('timestamp').to.be.an('number');
				done();
			})
			.catch((err) => {
				done(err);
			})
	})

	it('timeout has cache test', (done) => {
		const url = 'http://timeouthastest';
		setCacheSync({
			key: url,
			value: {
				"errcode": 0,
				"msg": "succeed",
				"data": {
					"test": 1
				}
			}
		}, 200000)

		wxp.request({
			url: url,
			method: 'POST',
			cache: {
				enable: true,			//选填，是否开启缓存，默认false
				type: 'timeout',		//选填，开启缓存类型，定时(timeout)、快照(snapshot)，默认定时
				timeout: 200000,			//选填，定时缓存时间，使用优先级，当前配置>全局配置>默认配置
			}
		})
		.then((res) => {
			expect(res).to.have.property('type').to.equal('timeout');
			expect(res).to.have.property('errMsg').to.equal('request:ok');
			expect(res).to.have.property('header').to.be.empty;
			expect(res).to.have.property('statusCode').to.equal('');
			done();
		})
		.catch((err) => {
			done(err);
		})
	})
})