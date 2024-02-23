import { DateTime, Str } from "@cloudflare/itty-router-openapi";

export const Task = {
	name: new Str({ example: "lorem" }),
	slug: String,
	description: new Str({ required: false }),
	completed: Boolean,
	due_date: new DateTime(),
};


export const SignIn = {
	username: 'example',
	password: 'secret!!'
}

export const RegisterUser = {
	username: 'example',
	email: 'example@email.com',
	password: 'secret!!'
}