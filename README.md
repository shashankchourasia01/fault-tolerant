Fault-Tolerant Data Processing System (React + JavaScript)
Overview

This project is a fault-tolerant data ingestion and processing system built using React and JavaScript.
It is designed to handle unreliable, inconsistent, and duplicate event data coming from multiple external clients.

The system safely ingests raw events, normalizes them into a consistent format, prevents duplicate processing, handles partial failures, and exposes aggregated results through a simple UI.

Key Problems This Project Solves

Clients do not follow a fixed schema

Data types are inconsistent (string numbers, different date formats)

Events can be retried or duplicated

Failures can occur during processing

System must remain consistent and reliable

How the System Works (High Level Flow)
Raw Event (UI)
   ↓
Ingestion Layer
   ↓
Normalization Layer
   ↓
Deduplication (Idempotency)
   ↓
Safe Storage
   ↓
Aggregation Logic
   ↓
UI Display


Each step is clearly separated to keep the system clean, safe, and easy to extend.

Core Features
1. Event Ingestion

Accepts raw JSON events from different clients

Handles missing or extra fields gracefully

Acts as a single entry point for all events

2. Normalization Layer

Converts unreliable input into a canonical internal format

Safely parses:

Client identifiers

Metrics

Amounts (string → number)

Timestamps (multiple formats → ISO)

Keeps original raw data for debugging and auditing

Example normalized format:

{
  "client_id": "client_A",
  "metric": "sales",
  "amount": 1200,
  "timestamp": "2024-01-01T00:00:00Z"
}

3. Idempotency & Deduplication

No event ID is provided by clients

A deterministic hash is generated from normalized data

Duplicate or retried events are safely ignored

Prevents double counting even after failures

4. Partial Failure Handling

Simulates database failures

Failed events are stored separately

No data is lost

Retried events do not cause duplicate processing

5. Aggregation

Aggregation logic is fully separated from ingestion

Supports:

Total amount

Event count

Client-based filtering

Designed for easy future extension

6. Minimal Frontend UI

Manual submission of raw JSON events

Toggle to simulate failures

View:

Successfully processed events

Failed events

Aggregated results

Project Folder Structure
src/
 ├─ components/
 │   ├─ EventForm.jsx          # UI for submitting raw events
 │   ├─ EventList.jsx          # Displays processed & failed events
 │   ├─ AggregationView.jsx    # Shows aggregated results
 │
 ├─ services/
 │   ├─ ingestEvent.js         # Main ingestion logic
 │   ├─ normalizeEvent.js      # Converts raw data to canonical format
 │   ├─ deduplicate.js         # Handles idempotency & hashing
 │   ├─ aggregate.js           # Aggregation logic
 │
 ├─ store/
 │   └─ eventStore.js          # In-memory data store (acts like DB)
 │
 ├─ App.jsx                    # Application entry point
 └─ main.jsx                   # React bootstrap file

Why This Design

Clear separation of concerns

Safe under retries and failures

Easy to debug and extend

Avoids over-engineering

Mimics real-world backend system design using simple frontend tools

Tech Stack

React

JavaScript

In-memory state (no backend required)
