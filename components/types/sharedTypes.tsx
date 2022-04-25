import { FormikValues } from "formik";

export type FormData = {
	initialValues: FormikValues;
	onSubmit: () => void;
}