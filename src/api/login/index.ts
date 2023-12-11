import request from '@/utils/request';

/**
 * @path: @/api/login/index.ts 
 * @functionName login
 * @param {} 
 * @description 登录
 * @author 谭人杰
 * @date 2023-03-16 14:18:12
*/
export function login(data: object) {
	return request({
		url: '/user/login',
		method: 'post',
		data,
	});
}

/**
 * @path: @/api/login/index.ts 
 * @functionName login
 * @param {} 
 * @description 登出
 * @author 谭人杰
 * @date 2023-03-16 14:18:12
*/
export function logout(data: object) {
	return request({
		url: '/user/signIn',
		method: 'post',
		data,
	});
}
