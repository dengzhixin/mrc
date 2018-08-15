import storage from './storage';
import request from './request';

//模拟小程序运行环境
let wx = {};



Object.assign(wx, storage, request);
global.wx = wx;