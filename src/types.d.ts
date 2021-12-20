export interface User {
    loggedIn: boolean;
    id: string;
    email: string;
    moniker: string;
    canChangeMonikerAfter: Date;
}