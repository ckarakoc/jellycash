export interface User {
	userId: number;
	email: string;
	firstName: string;
	lastName: string;
	avatar: string;
	currency: string;
	balance: number;
	income: number;
	expenses: number;
	enabled: boolean;
	roles: string[];
}

export interface RegisterUser {
	email: string;
	password: string;
	confirmPassword: string;
	firstName?: string;
	lastName?: string;
	avatar?: string;
	currency?: string;
}
