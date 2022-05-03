import { FormikValues } from "formik";

export type FormData = {
	initialValues: FormikValues;
	onSubmit: () => void;
}

export type ForgotPasswordValues = {
	email: string;
	otp: string;
	time: string;
	newPassword: string;
	confirmPassword: string | undefined;
};