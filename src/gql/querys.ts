import { gql } from '@apollo/client';

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
                avatar
            }
        }
    `,
    FORGOT_PASSWORD_INIT: gql`
        mutation initForgotPassword($email: String) {
            initForgotPassword(email: $email)
        }
    `,
    FORGOT_PASSWORD_FINISH: gql`
        mutation finishForgotPassword($forgotPasswordInput: ForgotPasswordInput) {
            finishForgotPassword(forgotPasswordInput: $forgotPasswordInput) {
                name
            }
        }
    `,
    NEW_BLOG_ENTRY: gql`
        mutation newBlogEntry($blogInput: BlogInput) {
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
                id,
                title,
                markdown,
                createdAt,
                tags,
                author {
                    name
                    lastName
                    email
                    avatar
                },
            }
        }
    `,
    NEW_TICKET: gql`
        mutation newTicket($ticketInput: TicketInput) {
            newTicket(ticketInput: $ticketInput) {
                id
            }
        }
    `,
    NEW_NEWSLETTER: gql`
        mutation newNewsletterEntry($newsletterInput: NewsletterInput) {
            newNewsletterEntry(newsletterInput: $newsletterInput) {
                email
            }
        }
    `,
    GET_RECENT_BLOGS: gql`
        query getRecentEntries {
            getRecentEntries {
                title,
                id,
                markdown,
                createdAt,
                author {
                    name
                    lastName
                    email,
                    avatar
                },
                views,
                shares,
                tags,
                sneakpeak,
            }
        }
    `,
    GET_MOST_VIEWED_BLOGS: gql`
        query getMostViewedEntries {
            getMostViewedEntries {
                title,
                id,
                markdown,
                createdAt,
                author {
                    name
                    lastName
                    email,
                    avatar
                },
                views,
                shares,
                tags,
                sneakpeak,
            }
        }
    `,
    GET_ALL_BLOGS_IDS: gql`
        query getAllEntriesIds {
            getAllEntriesIds {
                id,
            }
        }
    `,
    UPDATE_BLOG_METRICS: gql`
        mutation updateBlogMetrics($blogMetricsInput: BlogMetricsInput) {
            updateBlogMetrics(blogMetricsInput: $blogMetricsInput)
        }
    `,
    NEW_USER_METRIC: gql`
        mutation newUserDetailsEntry($metricsInput: MetricsInput) {
            newUserDetailsEntry(metricsInput: $metricsInput)
        }
    `,
    GET_IMAGE_BY_PROMPT: gql`
        query getImageByPrompt($prompt: String!) {
            getImageByPrompt(prompt: $prompt) {
                prompt,
                date,
                img {
                    buffer,
                    contentType,
                },
            }
        }
    `,
    GET_ALL_IMAGES_OF_TODAY: gql`
        query getAllImagesOfDay {
            getAllImagesOfDay {
                prompt,
                date,
                img {
                    buffer,
                    contentType,
                },
            }
        }
    `
};