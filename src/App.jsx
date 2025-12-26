import { useState } from "react";
import "./App.css";

import { ingestEvent } from "./services/ingestEvent";
import { saveFailed, getEvents, getFailedEvents } from "./store/eventStore";

function App() {
  const [rawInput, setRawInput] = useState("");
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleSubmit = () => {
  console.log("Submit clicked");
  console.log("Raw Input:", rawInput);

  try {
    const rawEvent = JSON.parse(rawInput);
    console.log("Parsed Event:", rawEvent);

    ingestEvent(rawEvent, simulateFailure);
    setRefresh(!refresh);
  } catch (err) {
    console.error("Error:", err.message);

    try {
      const rawEvent = JSON.parse(rawInput);
      saveFailed(rawEvent, err.message);
    } catch {
      alert("Invalid JSON format");
    }

    setRefresh(!refresh);
  }
};


  const events = getEvents();
  const failedEvents = getFailedEvents();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Event Ingestion System</h2>

      <textarea
        rows="8"
        cols="60"
        placeholder="Paste raw event JSON here"
        value={rawInput}
        onChange={(e) => setRawInput(e.target.value)}
      />

      <br /><br />

      <label>
        <input
          type="checkbox"
          checked={simulateFailure}
          onChange={(e) => setSimulateFailure(e.target.checked)}
        />
        Simulate Failure
      </label>

      <br /><br />

      <button onClick={handleSubmit}>Submit Event</button>

      <hr />

      <h3>Processed Events</h3>
      {events.map((e, index) => (
        <pre key={index}>{JSON.stringify(e, null, 2)}</pre>
      ))}

      <h3>Failed Events</h3>
      {failedEvents.map((e, index) => (
        <pre key={index}>{JSON.stringify(e, null, 2)}</pre>
      ))}
    </div>
  );
}

export default App;
