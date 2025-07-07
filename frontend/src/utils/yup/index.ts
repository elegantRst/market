import { Errors } from 'errors';
import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
	email: yup.string().email(Errors.InvalidEmail).required(Errors.FieldRequired),
	password: yup
		.string()
		.min(6, Errors.MinFieldLength)
		.required(Errors.FieldRequired)
		.matches(
			/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()-+]{6,}/g,
			Errors.PasswordFormatIncorrect
		),
});

// export const RegisterSchema = yup.object({
// 	name: yup.string().required('Имя обязательно'),
// 	login: yup.string().required('Логин обязателен'),
// 	email: yup.string().email('Неверный email').required('Email обязателен'),
// 	password: yup
// 		.string()
// 		.min(6, 'Минимум 6 символов')
// 		.required('Пароль обязателен'),
// 	passwordRepeat: yup
// 		.string()
// 		.required('Повторите пароль')
// 		.oneOf([yup.ref('password')], 'Пароли должны совпадать'),
// });

export const RegisterSchema = yup.object().shape({
	name: yup.string().required(Errors.FieldRequired),
	login: yup.string().required(Errors.FieldRequired),
	email: yup.string().email(Errors.InvalidEmail).required(Errors.FieldRequired),
	password: yup
		.string()
		.min(6, Errors.MinFieldLength)
		.required(Errors.FieldRequired)
		.matches(
			/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()-+]{6,}/g,
			Errors.PasswordFormatIncorrect
		),
	passwordRepeat: yup
		.string()
		.required(Errors.FieldRequired)
		.oneOf([yup.ref('password')], Errors.PasswordDoNotMatch),
});
