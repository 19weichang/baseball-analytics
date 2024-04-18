const key = import.meta.env.VITE_GOOGLE_API_KEY

export function getSheetData(sheetId: string, sheetName: string) {
  if (!key) {
    throw new Error('Google API Key is not defined')
  }

  if (sheetName === 'all') {
    return fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?key=${key}`
    ).then((res) => res.json())
  } else {
    return fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${key}`
    ).then((res) => res.json())
  }
}
