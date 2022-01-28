import type { GetSession } from '@sveltejs/kit';

export const getSession: GetSession = (event) => {
	return {
		userAgent: event.request.headers['user-agent']
	};
};

// console.log(event.request.headers);
// console.log(JSON.stringify(event.request.headers));
// let map = new Map(Object.entries(event.request.headers));
// console.log(map);
