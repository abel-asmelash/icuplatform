export interface SignInWithOAuthParams{
    provider: string
    providerAccountId: string
    user:{
        email:string,
        name: string,
        image:string
        username:string

    }
}

interface AuthCredentials {
    name: string
    username:string
    email:string
    password:string
}
interface createQuestionParams{
    title: string
    content: string
    tags:string[]
}
interface RouteParams{
    params: Promise<Record<string, string>>
    searchParams:Promise<Record<string, string>>
}
export interface EditQuestionParams extends createQuestionParams{
questionId: string
}
 interface GetQuestionParams{
    questionId: string
}