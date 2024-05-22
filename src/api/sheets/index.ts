const key = import.meta.env.VITE_GOOGLE_API_KEY

const sheetId = import.meta.env.VITE_GOOGLE_SHEET_DOC_ID

export function getAllSheet() {
  return fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?key=${key}`
  ).then((res) => res.json())
}
