import type { EndpointOutput } from '@sveltejs/kit';
import { dev } from '$app/env';

export async function get(): Promise<EndpointOutput> {
	try {
		const base = dev ? 'http://localhost:1339' : 'https://api.theres.care';
		const data = await fetch(`${base}/chatrooms`).then((res) => res.json());
		return {
			body: data
		};
	} catch (e) {
		return {
			status: 500,
			body: {
				message: 'API failure',
				error: e
			}
		};
	}
}

export async function put({
	body
}: {
	body: { name: string; description?: string };
}): Promise<EndpointOutput> {
	try {
		const base = dev ? 'http://localhost:1339' : 'https://api.theres.care';
		const data = await fetch(`${base}/chatrooms`, {
			method: 'PUT',
			body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
		}).then((res) => res.json());
		return {
			body: {
				id: data.id
			}
		};
	} catch {
		return;
	}
}
