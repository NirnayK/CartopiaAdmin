import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "admin username",
        },
        password: {
          label: "Password:",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = {
          id: "47",
          username: "adminCartopia",
          password: "admin@cartopia123",
        };

        if (
          credentials?.username === user.username &&
          credentials?.password === user.password
        ) {
          return user;
        }
        return null;
      },
    }),
  ],
};
