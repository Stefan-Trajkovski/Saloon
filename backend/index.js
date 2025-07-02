import express from "express";
import cors from "cors"; // so frontend can call your backend
import { authorize, addEvent } from "./googleCalendar.js"; // your Google Calendar helper
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors()); // allow cross-origin requests from frontend
app.use(express.json()); // parse JSON bodies

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.post("/api/appointment", async (req, res) => {
   console.log("Received POST /api/appointment request");
  console.log("Request body:", req.body);
  const { name, phone, email, service, date, time } = req.body;

  if (!name || !phone || !service || !date || !time) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const auth = await authorize();

    const startDateTime = new Date(`${date}T${time}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60000); // +30 minutes

    const event = {
      summary: `Appointment: ${service}`,
      description: `Name: ${name}\nPhone: ${phone}\nEmail: ${email || "Not provided"}`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: "Europe/Skopje",
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: "Europe/Skopje",
      },
    };

    const calendarEvent = await addEvent(auth, event);

    return res.status(200).json({ message: "Appointment added to Google Calendar", event: calendarEvent });
  } catch (error) {
    console.error("Error adding appointment:", error);
    return res.status(500).json({ message: "Failed to add appointment", error: error.message });
  }
});




app.get("/api/free-timeslots", async (req, res) => {
  console.error("Poseta")
  const date = req.query.date; // e.g. '2025-07-04'

  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  try {
    const auth = await authorize();
    const calendar = google.calendar({ version: "v3", auth });

    // Time range for that day
    const startOfDay = new Date(`${date}T09:00:00`);
    const endOfDay = new Date(`${date}T20:00:00`);

    const eventsRes = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = eventsRes.data.items || [];

    const allTimeSlots = [
      "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
      "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
      "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
      "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
    ];

    const freeSlots = [];

    for (const slot of allTimeSlots) {
      const slotStart = new Date(`${date}T${slot}:00`);
      const slotEnd = new Date(slotStart.getTime() + 30 * 60 * 1000); // +30 min

      let isOverlapping = false;

      for (const event of events) {
        if (!event.start.dateTime || !event.end.dateTime) continue;

        const eventStart = new Date(event.start.dateTime);
        const eventEnd = new Date(event.end.dateTime);

        // Overlap check
        if (slotStart < eventEnd && slotEnd > eventStart) {
          isOverlapping = true;
          break;
        }
      }

      if (!isOverlapping) {
        freeSlots.push(slot);
      }
    }

    return res.status(200).json({ freeSlots });

  } catch (error) {
    console.error("Error fetching available time slots:", error);
    return res.status(500).json({ message: "Failed to fetch available time slots", error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});