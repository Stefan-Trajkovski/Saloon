import { google } from "googleapis";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const TEMP_KEYFILE_PATH = path.resolve(process.cwd(), "service-account.json");

function writeKeyFile() {
  const rawJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!rawJson) {
    console.warn("GOOGLE_SERVICE_ACCOUNT_JSON not set.");
    return;
  }

  try {
    const parsed = JSON.parse(rawJson);
    parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');
    const fixedJsonString = JSON.stringify(parsed, null, 2);

    const currentContent = fs.existsSync(TEMP_KEYFILE_PATH)
      ? fs.readFileSync(TEMP_KEYFILE_PATH, "utf8")
      : null;

    if (currentContent !== fixedJsonString) {
      fs.writeFileSync(TEMP_KEYFILE_PATH, fixedJsonString, { encoding: "utf8", flag: "w" });
      console.log("Updated service account key file.");
    }
  } catch (err) {
    console.error("Failed to parse or write service account JSON:", err);
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
