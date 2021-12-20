import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({ out: 'build' }),

		// hydrate the <div id="svelte"> element in src/app.html
		target: 'body',

		prerender: {
			enabled: true, // prerender everything!
			onError: 'fail' // means we have a dynamic page usually so we need to disable prerendering for it
		},
		hydrate: true, // hydrate all pages too with the svelte stuff,
		router: true // and enable the router (we have to hydrate anyway!)
	}
};

export default config;
