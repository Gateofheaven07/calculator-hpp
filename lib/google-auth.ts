import { redirect } from "next/navigation";

export interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export function getGoogleUrl() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  
  const options = {
    redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/google/callback",
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
}

export async function getGoogleUser(code: string): Promise<GoogleUser> {
  const tokenEndpoint = "https://oauth2.googleapis.com/token";
  
  const body = new URLSearchParams({
    code,
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
    redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/google/callback",
    grant_type: "authorization_code",
  });

  const tokenRes = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!tokenRes.ok) {
      throw new Error("Failed to fetch google token");
  }

  const { id_token, access_token } = await tokenRes.json();

  const userRes = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  
  if (!userRes.ok) {
     throw new Error("Failed to fetch google user");
  }

  return userRes.json();
}
