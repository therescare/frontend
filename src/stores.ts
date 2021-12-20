import { writable } from 'svelte/store';
import type { User } from './types';

export const user = writable<User>({
	loggedIn: false,
	id: null,
	email: null,
	moniker: null,
	canChangeMonikerAfter: null
});
