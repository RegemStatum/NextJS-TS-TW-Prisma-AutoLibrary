import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/utils/prisma";
import { hash, compare } from "bcrypt";
import BadRequestError from "@/utils/errors/BadRequestError";
import validatePassword from "@/utils/auth/validatePassword";

export const AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new BadRequestError("Please provide credentials");
        }

        const { email, password } = credentials;

        // server validation
        if (!email || email.trim() === "") {
          throw new BadRequestError("Please provide email");
        }

        if (!password || password.trim() === "") {
          throw new BadRequestError("Please provide password");
        }

        const passwordValidation = validatePassword(password);
        if (!passwordValidation.ok) {
          throw new BadRequestError(passwordValidation.errorMsg);
        }

        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        // create user
        if (!user) {
          const newUser = await prisma.user.create({
            data: {
              email,
              password: await hash(password, 12),
            },
          });

          return {
            id: newUser.id,
            email: newUser.email,
          };
        }

        // create password for user if user has email but doesnt have password
        let updatedUser = null;
        if (!user.password) {
          updatedUser = await prisma.user.update({
            where: {
              email,
            },
            data: {
              password: await hash(password, 12),
            },
          });

          throw new BadRequestError(
            "There was no password for provided email. This can happen if you authorized earlier with the help of external provider e.g. Google. New password was created for your account. Now you can login with password you provided"
          );
        }

        // compare provided password and db password
        let isValid = false;
        if (updatedUser) {
          isValid = await compare(password, updatedUser.password);
        }
        isValid = await compare(password, user.password);

        if (!isValid) {
          throw new BadRequestError("Wrong password. Try again!");
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/auth/signin",
    login: "/auth/signin",
    signup: "/auth/signup",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 15 * 24 * 30 * 60, // 15 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        console.log("user: ", user);
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
};

export default NextAuth(AuthOptions);
