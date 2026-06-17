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