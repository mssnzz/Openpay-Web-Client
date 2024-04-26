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
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const user = await loginUser(credentials.email, credentials.password);
        if (!user.error) {
          // Suponiendo que `user.data` contiene `access_token`
          return { ...user.data, email: credentials.email };
        }
        return null; // Autenticación fallida
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        // Agregamos el access token al token JWT
        token.accessToken = user.access_token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      // Hacemos disponible el access token en la sesión del cliente
      session.user.accessToken = token.accessToken;
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin",
  },
  // Asegúrate de configurar la clave secreta de JWT
  secret: "123",
});
