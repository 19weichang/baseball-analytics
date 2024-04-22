import * as xlsx from 'xlsx'

export async function readWorkbookFromRemoteFile(
  url: string,
  callback: (workbook: xlsx.WorkBook) => void = () => {}
) {
  const xhr = new XMLHttpRequest()
  xhr.open('get', url, true)
  xhr.responseType = 'arraybuffer'
  xhr.onload = function () {
    if (xhr.status == 200) {
      const data = new Uint8Array(xhr.response)
      const workbook = xlsx.read(data, { type: 'array' })
      if (callback) callback(workbook)
    }
  }
  xhr.send()

  return xhr
}
