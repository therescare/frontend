import type { EndpointOutput } from '@sveltejs/kit';
import { dev } from '$app/env';

export async function get({ params }: { params: { slug: string } }): Promise<EndpointOutput> {
	try {
		const base = dev ? 'http://localhost:1339' : 'https://api.theres.care';
		const data = await fetch(`${base}/chatrooms/${params.slug}`).then((res) => res.json());
		return {
			body: {
				name: data.name,
				description: data.description
			}
		};
	} catch {
		return;
	}
}
