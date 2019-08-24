import fs from 'fs'
import path from 'path'

const saveJSON = (result: any, fileName: string) => {
  const content = JSON.stringify(result, null, 2)
  const tempPath = path.resolve(`static/tmp_${fileName}.json`)
  fs.writeFile(
    tempPath,
    content,
    { flag: 'wx' },
    (err) => {
      if (err) {
        throw err
      }
      console.log(`寫入資料完成`)
    }
  )

  const destinationPath = path.resolve(`static/${fileName}.json`)
  if (fs.existsSync(destinationPath)) {
    fs.unlinkSync(destinationPath)
  }
  fs.rename(tempPath, destinationPath, () => {
    // if (fs.existsSync(tempPath)) {
    //   fs.unlinkSync(tempPath)
    // }
  })
}

export { saveJSON }