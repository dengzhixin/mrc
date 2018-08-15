require('../core/index');

import {assert, expect} from 'chai'
import wxPromise from '../../src/components/mrc/wxPromise';

describe('wx promise test', () => {
	it('promise fail', (done) => {
		const setStorageFail = wxPromise(wx.setStorageFail);

		const setStorageFailPromise = setStorageFail({
			key: 'setCacheTest',
			value: 1
		});

		setStorageFailPromise.then(() => {
			throw new Error({errMsg: 'setStorage:fail'});
		})
			.catch((err) => {
				assert.isObject(err, 'is not object');
				expect(err.errMsg).to.equal('setStorage:fail');

				done();
			})


	})
})
