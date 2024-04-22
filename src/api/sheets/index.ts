const key = import.meta.env.VITE_GOOGLE_API_KEY

export function getAllSheet(sheetId: string) {
  return fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?key=${key}`
  ).then((res) => res.json())
}
