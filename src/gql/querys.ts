import { gql } from "@apollo/client";

export const querys = {
    REGISTER: gql`
        mutation newUser($userInput: UserInput) {
            newUser(userInput: $userInput) {
                name,
                lastName,
                id
            }
        }
    `,
    AUTHENTICATE: gql`
        mutation authenticate($authInput: AuthInput) {
            authenticate(authInput: $authInput) {
                token
            }
        }
    `,
    GET_USER_INFO: gql`
        query getUserInfo {
            getUserInfo {
                id,
		        name,
		        email,
		        lastName,
            }
        }
    `,
    FORGOT_PASSWORD_INIT: gql`
        mutation initForgotPassword($email: String) {
            initForgotPassword(email: $email)
        }
    `,
    FORGOT_PASSWORD_FINISH: gql`
        mutation FinishForgotPassword($forgotPasswordInput: ForgotPasswordInput) {
            finishForgotPassword(forgotPasswordInput: $forgotPasswordInput) {
                name
            }
        }
    `,
    NEW_BLOG_ENTRY: gql`
        mutation($blogInput: BlogInput) {
            newBlogEntry(blogInput: $blogInput) {
                id,
                author {
                    name,
                    lastName
                },
                title
            }
        }
    `,
    GET_BLOG_BY_ID: gql`
        query getSpecificBlogEntry($blogId:String!) {
            getSpecificBlogEntry(blogId: $blogId) {
                title,
                markdown,
                createdAt,
                tags,
                author {
                    name
                    lastName
                    email
                },
            }
        }
    `
};