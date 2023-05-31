const postData = async (url, data) => {     /* postdata для отправки данных на сервер - функция, сюда отправляем разные url и body */
	const res = await fetch(url, {
		// eslint-disable-next-line quotes
		method:"POST",
		headers: {
			'Content-type': 'application/json'
		},
		body: data
	});
	return await res.json();
};

const getResource = async (url) => {     
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error(`Could not fetch ${url}, status ${res.status}`);
	}

	return await res.json();
};

export {postData};
export {getResource};