// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "../../../services/login";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Debe coincidir exactamente con las claves que pasas, como 'email' y 'password'
        if (!credentials.email || !credentials.password) {
          return null;
        }

        // Realiza la validación de las credenciales
        const user = await loginUser(credentials.email, credentials.password);
        if (user) {
          return user;
        } else {
          return null; // Autenticación fallida
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
});
