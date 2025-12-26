const events = [];
const failedEvents = [];

export function saveEvent(event) {
  events.push(event);
}

export function saveFailed(rawEvent, reason) {
  failedEvents.push({ rawEvent, reason });
}

export function getEvents() {
  return events;
}

export function getFailedEvents() {
  return failedEvents;
}
