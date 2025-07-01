import { google } from "googleapis";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

// Path to your service account JSON file (set in your .env or hardcoded)
const KEYFILEPATH =
  process.env.GOOGLE_SERVICE_ACCOUNT_KEYFILE
    ? path.resolve(process.env.GOOGLE_SERVICE_ACCOUNT_KEYFILE)
    : path.resolve(process.cwd(), "service-account.json");


    

export async function authorize() {
  // Load service account key JSON file
  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });

  // Get client instance for auth
  const authClient = await auth.getClient();

  return authClient;
}

export async function addEvent(auth, event) {
  const calendar = google.calendar({ version: "v3", auth });

  const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

  try {
    const response = await calendar.events.insert({
      calendarId,
      resource: event,
    });
    return response.data;
  } catch (error) {
    console.error("Error inserting event:", error);
    throw error;
  }
}
