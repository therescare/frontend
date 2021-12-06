import type { EndpointOutput } from '@sveltejs/kit';
import { dev } from '$app/env';

export async function get({ params }: { params: { slug: string } }): Promise<EndpointOutput> {
	try {
		const base = dev ? 'http://localhost:1338' : 'https://strapi.theres.care';
		const data = await fetch(`${base}/api/pages/${params.slug}`).then(res => res.json());
		return {
			body: {
				title: data.name,
				markdown: data.content,
				shortDescription: data.shortDescription,
				lastUpdated: data.updatedAt,
				author: data.author
			}
		}
	} catch {
		return;
	}
}
