const key = import.meta.env.VITE_GOOGLE_API_KEY

export function getSheetData(sheetId: string, sheetName: string) {
  return fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${key}`
  ).then((res) => res.json())
}

export function getAllSheet(sheetId: string) {
  return fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?key=${key}`
  ).then((res) => res.json())
}
