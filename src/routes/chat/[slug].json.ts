import type { EndpointOutput } from '@sveltejs/kit';
import { apiBase } from '$lib/api';

export async function get({ params }: { params: { slug: string } }): Promise<EndpointOutput> {
	try {
		const data = await fetch(`${apiBase}/chatrooms/${params.slug}`).then((res) => res.json());
		if (data.error) {
			return {
				status: 404,
				body: {
					error: data.error
				}
			};
		}

		return {
			body: {
				name: data.name,
				description: data.description
			}
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
