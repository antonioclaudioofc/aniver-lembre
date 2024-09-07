import { NextApiRequest, NextApiResponse } from "next";
import { SignJWT } from "jose";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { idToken } = req.body;

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const sessionToken = await new SignJWT({ idToken })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(encodedKey);

    res.setHeader(
      "Set-Cookie",
      `session=${sessionToken}; HttpOnly; Secure; Path=/; Expires=${expiresAt.toUTCString()}; SameSite=Lax`
    );

    res.status(200).json({ message: "Sessão criada com sucesso" });
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
