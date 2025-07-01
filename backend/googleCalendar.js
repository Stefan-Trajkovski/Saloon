import { google } from "googleapis";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const TEMP_KEYFILE_PATH = path.resolve(process.cwd(), "service-account.json");

// Write the service account JSON from env to a temp file, overwriting if changed
function writeKeyFile() {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    console.warn(
      "Warning: GOOGLE_SERVICE_ACCOUNT_JSON env variable is not set. Authorization might fail."
    );
    return;
  }

  try {
    // Write the key file every time (or you can cache it if you want)
    fs.writeFileSync(TEMP_KEYFILE_PATH, process.env.GOOGLE_SERVICE_ACCOUNT_JSON, {
      encoding: "utf8",
      flag: "w",
    });
    console.log("Service account key file written to", TEMP_KEYFILE_PATH);
  } catch (err) {
    console.error("Failed to write service account key file:", err);
  }
}

// Ensure key file is written on module load
writeKeyFile();

export async function authorize() {
  const auth = new google.auth.GoogleAuth({
    keyFile: TEMP_KEYFILE_PATH,
    scopes: SCOPES,
  });

  try {
    const authClient = await auth.getClient();
    return authClient;
  } catch (err) {
    console.error("Error during Google Auth:", err);
    throw err;
  }
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
