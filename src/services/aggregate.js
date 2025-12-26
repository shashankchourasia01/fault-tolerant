// Aggregation can change
// Ingestion remains stable
// Easy to add new metrics later


export function aggregateEvents(events, filters) {
  return events
    .filter(e => {
      if (filters.client && e.client_id !== filters.client) return false;
      return true;
    })
    .reduce((acc, e) => {
      acc.totalAmount += e.amount;
      acc.count += 1;
      return acc;
    }, { totalAmount: 0, count: 0 });
}
