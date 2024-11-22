import { FormikHelpers, FormikValues } from 'formik';
import { ReactNode, SyntheticEvent } from 'react';
import { RefObject } from 'react';

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
  _id: string;
  tags: string[];
  title: string;
  markdown: string;
  createdAt: string;
  author: Author;
  views: number;
  shares: number;
  sneakpeak: string;
  deleted?: boolean;
};

export type NewBlogEntryValues = {
  tags: string[];
  title: string;
  markdown: string;
  sneakpeak: string;
  _id?: string;
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
  id: string;
  role: string;
  createdAt: string;
  __typename?: string;
  active: boolean;
}

type formikHelper = FormikHelpers<NewBlogEntryValues>['setFieldValue'];

export type EditorContextType = {
  setBlogTitle: any;
  title: string;

  setShowSneakpeak: (prop: boolean) => void;

  setVisualMarkdown: (prop: string) => void;
  setPreview: (prop: boolean) => void;
  visualMarkdown: string;

  tags: string[];
  setTags: any;

  setMarkdownText: any;
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

export type NavbarOptionsProps = {
  setShowTags?: (e: SyntheticEvent) => void;
  setPreview?: any;
  storeMarkdown?: any;
  setShowSneakpeak?: any;
  read?: boolean;
  editor?: boolean;
};

export type Options = {
  tooltipText: string;
  icon: ReactNode;
  submitButton?: boolean;
  onClick?: (e: SyntheticEvent) => void;
  text?: string;
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: SyntheticEvent) => void;
  form?: string;
  type?: 'submit';
}

export interface OptionProps {
  buttonParams: ButtonProps;
  option: Options;
}

export type BasicObject = Record<string, string>;

export type KeyOfBasicObject = keyof BasicObject;

export interface Image {
  prompt: string;
  date: string;
  img: {
    buffer: string;
    contentType: string;
  };
}

export interface IndexScreenProps {
  recentEntries: BlogEntry[];
  handleClickServices: (ref: string) => void;
  mostViewedEntries: BlogEntry[];
  refServices: RefObject<HTMLDivElement>;
  refForm: RefObject<HTMLDivElement>;
}
