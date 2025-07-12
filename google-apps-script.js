// Google Apps Script code for handling form submissions
// Deploy this as a web app and use the URL in the booking modal

function doPost(e) {
  try {
    // Parse the JSON data from the request
    const data = JSON.parse(e.postData.contents)

    // Get the active spreadsheet (make sure to create one and note the ID)
    const spreadsheetId = "YOUR_SPREADSHEET_ID_HERE" // Replace with your actual spreadsheet ID
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet()

    // If this is the first time, add headers
    if (sheet.getLastRow() === 0) {
      sheet
        .getRange(1, 1, 1, 9)
        .setValues([
          ["Timestamp", "First Name", "Last Name", "Email", "Phone", "Date", "Time", "Program", "Message", "Mode"],
        ])
    }

    // Add the new booking data
    sheet.appendRow([
      new Date(data.timestamp),
      data.firstName,
      data.lastName,
      data.email,
      data.phone || "",
      data.date,
      data.time,
      data.program,
      data.message || "",
      data.mode,
    ])

    // Optional: Send confirmation email
    if (data.email) {
      const subject = `Booking Confirmation - ${data.mode === "swimming" ? "Swimming" : "Fitness"} Session`
      const body = `
Dear ${data.firstName} ${data.lastName},

Thank you for booking a ${data.mode} session with Individual Medley!

Booking Details:
- Program: ${data.program}
- Date: ${data.date}
- Time: ${data.time}
- Mode: ${data.mode === "swimming" ? "Swimming" : "Fitness"}

We will contact you soon to confirm your booking.

Best regards,
Individual Medley Team
      `

      GmailApp.sendEmail(data.email, subject, body)
    }

    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    console.error("Error processing booking:", error)
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() })).setMimeType(
      ContentService.MimeType.JSON,
    )
  }
}

function doGet() {
  return ContentService.createTextOutput("Individual Medley Booking System is running!").setMimeType(
    ContentService.MimeType.TEXT,
  )
}
