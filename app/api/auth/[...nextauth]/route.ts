import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import GitHub from 'next-auth/providers/github'
import Facebook from 'next-auth/providers/facebook'

const mustDefinedEnv = ['GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET'];
let err;
mustDefinedEnv.forEach(envKey => {
    if (!process.env[envKey]) {
        err = `${envKey} is missing in envirmonet file`
        console.error(err)
    }
});

const providers = [];
if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
    providers.push(
        Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        })
    );
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    providers.push(
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
    );
}

export const authOptions: NextAuthOptions = {
    providers: providers,
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async session({ session, token, user }) {
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token
        }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };