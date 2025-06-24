const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

// This should match the token you provided in the webhook setup
const VERIFY_TOKEN = "onlychat123";

app.use(express.json());

// For verifying webhook
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    console.log("Webhook verified!");
    res.status(200).send(challenge);
  } else {
    res.status(403).send("Verification failed");
  }
});

// For receiving messages
app.post("/webhook", (req, res) => {
  console.log("Webhook received:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

