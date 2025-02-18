import { google } from "googleapis";
import { oauth2Client } from "..";
import { BadRequestError, NotFoundError } from "../errors";
import { prismaClient } from "../db";
import { Request, Response } from "express";

// Redirect users to Google's OAuth 2.0 authorization URL
export const oAuthGmail = (req: Request, res: Response) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/gmail.readonly", // Read emails (Trigger)
      "https://www.googleapis.com/auth/gmail.send", // Send emails (Action)
    ],
  });
  res.redirect(url);
};

export const oAuthCallback = async (req: Request, res: Response) => {
  const { code } = req.query;
  if (!code || typeof code !== "string") {
    throw new BadRequestError("Invalid request. No code provided.");
  }

  // Exchange authorization code for access & refresh tokens
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  // Save the tokens in DB (Example with Prisma)
  if (!req.user?.userId) {
    throw new BadRequestError("User ID is required");
  }

  const gmailApp = await prismaClient.app.findFirst({
    where: {
      name: "Gmail",
    },
    select: {
      id: true,
    },
  });

  if (!gmailApp) {
    throw new BadRequestError("Gmail app not found");
  }

  // Example: Fetch user Gmail profile (optional)
  const gmail = google.gmail({ version: "v1", auth: oauth2Client });
  const profile = await gmail.users.getProfile({ userId: "me" });

  await prismaClient.connection.create({
    data: {
      userId: req.user.userId, // Replace with actual user ID
      accessToken: tokens.access_token!,
      refreshToken: tokens.refresh_token!,
      expiresAt: new Date(Date.now() + tokens.expiry_date!),
      appId: gmailApp.id,
      connectedEmail: profile.data.emailAddress,
    },
  });

  // await prismaClient.connection.upsert({
  //   where: {
  //     userId_appId: {
  //       userId: req.user?.userId,
  //       appId: gmailApp.id,
  //     },
  //   },
  //   update: {
  //     userId: req.user.userId, // Replace with actual user ID
  //     accessToken: tokens.access_token!,
  //     refreshToken: tokens.refresh_token!,
  //     expiresAt: new Date(Date.now() + tokens.expiry_date!),
  //     appId: gmailApp.id,
  //     connectedEmail: profile.data.emailAddress,
  //   },
  //   create: {
  //     userId: req.user.userId, // Replace with actual user ID
  //     accessToken: tokens.access_token!,
  //     refreshToken: tokens.refresh_token!,
  //     expiresAt: new Date(Date.now() + tokens.expiry_date!),
  //     appId: gmailApp.id,
  //     connectedEmail: profile.data.emailAddress,
  //   },
  // });
  
  // Respond with success message and user details
  res.send(`
     <html>
      <body>
        <script>
          window.opener.postMessage({
            type: "oauth_complete",
            success: true,
            email: "${profile.data.emailAddress}",
            tokens: ${JSON.stringify({
              accessToken: tokens.access_token,
              refreshToken: tokens.refresh_token,
              expiresAt: tokens.expiry_date,
            })}
          }, "http://localhost:5173"); // Send to frontend origin
          window.close();
        </script>
      </body>
    </html>
`);
};

export const getConnections = async (req: Request, res: Response) => {
  const query = req.query;
  const appId = query.appId as string;
  const userId = req.user!.userId; // Assuming authentication is handled

  if (!appId && !userId) {
    throw new BadRequestError("App ID is required");
  }

  const connections = await prismaClient.connection.findMany({
    where: { appId, userId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });

  if (!connections) {
    throw new NotFoundError(
      `Connection not found for appId: ${appId}, userId: ${userId}`
    );
  }

  res.json({
    connections,
  });
};
