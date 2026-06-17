import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { api } from "./lib/api";
import { ActionResponse } from "./app/types/global";
import { IAccount } from "./database/account.model";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],

  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub as string;

      return session;
    },

    async jwt({ token, account }) {
      if (account) {
        const { data: existingAccount, success } =
          (await api.accounts.getByProvider(
            account.type === "credentials"
              ? token.email!
              : account.providerAccountId,
          )) as ActionResponse<IAccount>;

        if (!success || !existingAccount) {
          return token;
        }

        const userId = existingAccount.userId;

        if (userId) {
          token.sub = userId.toString();
        }
      }

      return token;
    },

    async signIn({ user, account }) {
      if (account?.type === "credentials") {
        return true;
      }

      if (!account || !user) {
        return false;
      }

      const userInfo = {
        name: user.name!,
        email: user.email!,
        image: user.image!,
        username:
          account.provider === "google"
            ? user.email!.split("@")[0]
            : (user.name?.toLowerCase() ?? ""),
      };

      const { success } = (await api.auth.oAuthSignIn({
        user: userInfo,
        provider: account.provider as "google" | "github",
        providerAccountId: account.providerAccountId,
      })) as ActionResponse;

      return success;
    },
  },
});
