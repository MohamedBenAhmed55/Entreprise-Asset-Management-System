/**
 * Converts a JavaScript Date object (from PrimeNG Calendar)
 * into a safe 'YYYY-MM-DD' string for the Spring Boot backend.
 * * We extract local year, month, and day manually to prevent
 * timezone shifting bugs (e.g., losing a day when converting to UTC).
 */
export function formatDateForBackend(date: Date | null | undefined): string | null {
  if(!date) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String (date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`
}

/**
 * Converts a 'YYYY-MM-DD' string (from Spring Boot)
 * into a JavaScript Date object for the PrimeNG Calendar to display.
 */
export function parseDateFromBacked(dateString: string | null | undefined): Date | null {
  if (!dateString) return null;

  // Appending 'T00:00:00' forces the JS Date parser to treat this
  // as a local midnight time rather than a UTC time, preventing day shifts.
  const isJustDate = dateString.length === 10; // 'YYYY-MM-DD' is exactly 10 chars

  if (isJustDate){
    return new Date (`${dateString}T00:00:00`);
  }

  // Fallback for full timestamps
  return new Date(dateString);
}
