import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
	// callbacks: {
	// 	async signIn({ user, account, profile, email, credentials }) {
	// 		return true;
	// 	},
	// },
	pages: {
		signIn: "/auth/signin",
		// signOut: '/auth/signout',
		error: "/auth/error",
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text", placeholder: "username" },
			},
			async authorize(credentials, req) {
				if(credentials.username) {
					return {name:credentials.username}
				}
				return null;
			},
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
};

export default NextAuth(authOptions);
