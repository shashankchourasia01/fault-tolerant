import { generateHash } from "./deduplicate";

export function normalizeEvent(raw) {
  try {
    const client_id = raw.source || raw.client || "unknown";

    const payload = raw.payload || {};

    const metric = payload.metric || payload.type || "unknown";

    const amount = Number(payload.amount);
    if (isNaN(amount)) return null;

    // FIXED DATE PARSING
    const timestampStr = payload.timestamp;
    const timestamp = new Date(timestampStr.replace(/\//g, "-"));
    if (isNaN(timestamp.getTime())) return null;

    return {
      id: generateHash(client_id, metric, amount, timestamp),
      client_id,
      metric,
      amount,
      timestamp: timestamp.toISOString(),
      raw
    };
  } catch {
    return null;
  }
}
