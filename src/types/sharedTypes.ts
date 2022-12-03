import { FormikHelpers, FormikValues } from 'formik';

export type FormData = {
	initialValues: FormikValues;
	onSubmit: () => void;
};

export type ForgotPasswordValues = {
	email: string;
	otp: string;
	time: string;
	newPassword: string;
	confirmPassword: string | undefined;
};

type Author = {
	name: string;
	lastName: string;
	email: string;
	avatar: string;
};

export type BlogEntry = {
	id: string;
	tags: string[];
	title: string;
	markdown: string;
	createdAt: string;
	author: Author;
	views: number;
	sneakpeak: string;
};

export type NewBlogEntryValues = {
	tags: string[];
	title: string;
	markdown: string;
	sneakpeak: string;
};

export type NewTicketValues = {
	companyName: string;
	email: string;
	description: string;
	service: string[];
	phoneNumber: string;
};

export type NewsletterValues = {
	email: string;
};

export interface UserContext extends Author {
	id?: string;
	__typename: string;
};

type formikHelper = FormikHelpers<NewBlogEntryValues>['setFieldValue'];

export type EditorContextType = {
	setBlogTitle: formikHelper;
	title: string;

	setShowSneakpeak: (prop: boolean) => void;

	setVisualMarkdown: (prop: string) => void;
	setPreview: (prop: boolean) => void;
	visualMarkdown: string;

	tags: string[];
	setTags: formikHelper;

	setMarkdownText: formikHelper;
	markdownText: string;
	storeMarkdown: () => void;
};

export type RegisterFormValues = {
	name: string;
	lastName: string;
	email: string;
	password: string;
	file: string;
};

export type LoginFormValues = {
	email: string;
	password: string;
};

export type SignatureInfo = {
    name: string;
    position: string;
    department: string;
    phoneNumber: string;
    email: string;
};
