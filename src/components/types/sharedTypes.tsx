import { FormikHelpers, FormikValues } from "formik";

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

export type BlogEntry = {
	tags?: string[];
	title: string;
	markdown: string;
	createdAt: string;
	author: {
		name: string;
		lastName: string;
		email: string;
	};
};

export type NewBlogEntryValues = {
	tags?: string[];
	title: string;
	markdown: string;
};

export interface UserContext {
	id?: string;
	name: string;
	email: string;
	lastName: string;
	__typename: string;
};

type formikHelper = FormikHelpers<NewBlogEntryValues>['setFieldValue'];

export type EditorContextType = {
	setBlogTitle: formikHelper;
	title: string;

	setVisualMarkdown: (prop: string) => void;
	setPreview: (prop: boolean) => void;
	visualMarkdown: string;

	tags: string[];
	setTags: formikHelper;

	setMarkdownText: formikHelper;
	markdownText: string;
	storeMarkdown: () => void;
}