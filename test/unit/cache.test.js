require('../core/index');

import {assert, expect} from 'chai'

const {setCacheSync, getCacheSync, removeCacheSync} = require('../../src/components/mrc/cache');


//
describe('cache test', () => {
	it('prefix test', () => {
		expect(wx.__storage__prefix).to.equal('___CACHE___');
	})
	it('set cache', () => {
		setCacheSync({
			key: 'setCacheTest',
			value: 1
		})

		const data = getCacheSync('setCacheTest');

		expect(data).to.have.property('key').to.equal(wx.__storage__prefix + 'setCacheTest');
		expect(data).to.have.property('data').to.equal(1);
		expect(data).to.have.property('expires').to.be.an('number').to.equal(5 * 60 * 1000);
		expect(data).to.have.property('timestamp').to.be.an('number');

	})

	it('get cache', () => {

		setCacheSync({
			key: 'getCacheTest',
			value: 1
		})

		const data = getCacheSync('setCacheTest');
		expect(data).to.have.property('data').to.equal(1);
	})

	it('get cache timeout', (done) => {
		setCacheSync({
			key: 'getCacheTimeoutTest',
			value: 1
		}, 1)

		setTimeout(() => {
			const data = getCacheSync('getCacheTimeoutTest');
			expect(data).to.be.undefined;
			done();
		}, 100);

	})

	it('remove cache', () => {
		setCacheSync({
			key: 'removeCacheTest',
			value: 1
		})

		expect(getCacheSync('removeCacheTest')).to.have.property('data').to.equal(1);

		removeCacheSync('removeCacheTest')

		const data1 = getCacheSync('removeCacheTest');
		expect(data1).to.be.undefined;


	})
})

