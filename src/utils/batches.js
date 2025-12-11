// // src/utils/batches.js
// export const BATCH_KEY = "batches_v1";

// export function getBatches() {
//   try {
//     const raw = localStorage.getItem(BATCH_KEY);
//     return raw ? JSON.parse(raw) : [];
//   } catch {
//     return [];
//   }
// }

// export function saveBatches(batches) {
//   localStorage.setItem(BATCH_KEY, JSON.stringify(batches));
// }

// export function addBatch(batch) {
//   const batches = getBatches();
//   batches.unshift(batch); // newest first
//   saveBatches(batches);
//   return batch;
// }

// export function getBatchById(id) {
//   return getBatches().find(b => b.batchId === id);
// }

// src/utils/batches.js
export const BATCH_KEY = "batches_v1";

export function getBatches() {
  try {
    const raw = localStorage.getItem(BATCH_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveBatches(batches) {
  localStorage.setItem(BATCH_KEY, JSON.stringify(batches));
}

export function addBatch(batch) {
  const batches = getBatches();
  batches.unshift(batch); // newest first
  saveBatches(batches);
  return batch;
}

export function getBatchById(id) {
  return getBatches().find(b => b.batchId === id);
}

// updateBatch: merges updates into batch with batchId
export function updateBatch(batchId, updates) {
  const batches = getBatches();
  const idx = batches.findIndex(b => b.batchId === batchId);
  if (idx === -1) return null;
  const updated = { ...batches[idx], ...updates, updatedAt: new Date().toISOString() };
  batches[idx] = updated;
  saveBatches(batches);
  return updated;
}

// addInspectionToBatch: appends inspection result to batch.inspections array and optionally update status
export function addInspectionToBatch(batchId, inspection, newStatus = null) {
  const batches = getBatches();
  const idx = batches.findIndex(b => b.batchId === batchId);
  if (idx === -1) return null;
  const batch = batches[idx];
  const inspections = Array.isArray(batch.inspections) ? [...batch.inspections] : [];
  inspections.unshift({ ...inspection, inspectedAt: new Date().toISOString() });
  const updated = { ...batch, inspections, status: newStatus || batch.status, updatedAt: new Date().toISOString() };
  batches[idx] = updated;
  saveBatches(batches);
  return updated;
}
