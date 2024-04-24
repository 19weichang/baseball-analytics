import * as xlsx from 'xlsx'
import { readWorkbookFromRemoteFile } from '../../utils/xlsx'
import { utils } from 'xlsx'

const gameSheetId = import.meta.env.VITE_SHEET_GAME_ID
const key = import.meta.env.VITE_GOOGLE_API_KEY

export function getGame(game: string) {
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${gameSheetId}/export?format=xlsx`
  const file = new Promise((resolve) => {
    const callback = (workbook: xlsx.WorkBook) => {
      const sheet = workbook.Sheets[game]
      const json = utils.sheet_to_json(sheet)
      resolve(json)
    }
    readWorkbookFromRemoteFile(sheetUrl, callback)
  })
  return file
}

export function getAllGames() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${gameSheetId}?key=${key}`
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const sheetsInfo = data.sheets
      if (sheetsInfo && sheetsInfo.length) {
        sheetsInfo.forEach((sheet: { properties: { title: string } }) => {
          console.log(sheet.properties.title)
          // console.log(sheet.properties.sheetId)
        })
      } else {
        console.log('No sheets found in the spreadsheet.')
      }
    })
    .catch((error) => {
      console.error('Error fetching sheet data:', error)
    })
}
