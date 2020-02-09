async function sendJSONRequest(url, opts) {
	opts = {
		method: 'GET',
		timeout: 60000,
		mode: 'cors',
		cache: 'no-cache',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		...(opts || {})
	};

	if (opts.body && typeof opts.body !== 'string')
		opts.body = JSON.stringify(opts.body);

	const r = await fetch(url, opts);

	let resp = { statusCode: r.status };

	if (resp.statusCode < 200 || resp.statusCode > 300)
		throw new Error('unknown error');

	try {
		const body = await r.json();

		resp = { statusCode: r.status, body: body };
	} catch (ex) {
		console.error(ex);
	}

	if (resp.statusCode >= 200 && resp.statusCode < 300)
		resp.statusCode = 200;

	return resp;
}

export async function getFiles() {
	const files = await sendJSONRequest('http://localhost:8081/files');

	if (!Array.isArray(files.body))
		return [];

	return files.body;
}

export async function getFile(link) {
	const file = await sendJSONRequest(`http://localhost:8081/files?fileLink=${encodeURIComponent(link)}`);

	return file.body;
}

export async function addFile(file) {
	await sendJSONRequest('http://localhost:8081/files', {
		method: 'POST',
		body: {
			fileLink: file.fileLink || '',
			fileName: file.fileName || '',
			fileType: file.fileType || '',
			fileCategory: file.fileCategory || '',
			fileUploadedTimestamp: file.fileUploadedTimestamp || '',
			fileUploadedUser: file.fileUploadedUser || '',
			fileSize: file.fileSize || 0,
			fileDescription: file.fileDescription || ''
		}
	});
}