// Why this is safe:
// No reliance on client IDs
// Retry produces same hash
// Prevents double counting

const processedIds = new Set();

export function generateHash(client, metric, amount, timestamp) {
  return `${client}|${metric}|${amount}|${timestamp.getTime()}`;
}

export function isDuplicate(id) {
  if (processedIds.has(id)) {
    return true;
  }
  processedIds.add(id);
  return false;
}
