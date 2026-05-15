import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { Role } from "@/types";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Credentials({
      name: "Sovereign Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          include: { tenant: true },
        });

        if (!user || !user.passwordHash || !user.isActive) return null;

        const valid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          sovereignId: user.sovereignId,
          tenantId: user.tenantId,
          tenantSlug: user.tenant?.slug ?? null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.sovereignId = (user as any).sovereignId;
        token.tenantId = (user as any).tenantId;
        token.tenantSlug = (user as any).tenantSlug;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).role = token.role as Role;
        (session.user as any).sovereignId = token.sovereignId;
        (session.user as any).tenantId = token.tenantId;
        (session.user as any).tenantSlug = token.tenantSlug;
      }
      return session;
    },
  },
});

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  sovereignId: string | null;
  tenantId: string | null;
  tenantSlug: string | null;
};
