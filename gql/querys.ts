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
};