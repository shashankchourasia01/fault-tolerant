// Key idea:
// Ingestion does not aggregate
// Ingestion does not care about UI
// One responsibility only

import { normalizeEvent } from "./normalizeEvent";
import { isDuplicate } from "./deduplicate";
import { saveEvent } from "../store/eventStore";

export function ingestEvent(rawEvent, simulateFailure) {
  console.log("Ingest called with:", rawEvent);

  const normalized = normalizeEvent(rawEvent);
  console.log("Normalized event:", normalized);

  if (!normalized) {
    console.log("Normalization failed");
    return;
  }

  if (isDuplicate(normalized.id)) {
    console.log("Duplicate event detected");
    return;
  }

  if (simulateFailure) {
    console.log("Simulating failure...");
    throw new Error("Simulated DB failure");
  }

  console.log("Saving event...");
  saveEvent(normalized);
}


  //return { status: "success", event: normalized };

