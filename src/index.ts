import { createCanvas, loadImage } from 'canvas'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url)) + '/'

if(process.argv[2] === '--help') {
  console.log('npm run start -- [items_count] [money_sum]')
  process.exit(0)
}

const itemsCount = Number(process.argv[2])
const itemsSum = Number(process.argv[3])

if(!Number.isSafeInteger(itemsCount) || !Number.isSafeInteger(itemsSum)) {
  console.log('npm run start -- [items_count] [money_sum]')
  process.exit(0)
}

const canvas = createCanvas(1500, 500)
const ctx = canvas.getContext('2d')

ctx.fillRect(0, 0, 1500, 500)

// const image = await loadImage(__dirname + 'background.jpeg')
// ctx.drawImage(image, -515, -622, 1614, 2354)

// ctx.font = '30px Impact'
// ctx.textAlign = 'center'
// ctx.fillStyle = 'white'
// ctx.font = 'semibold 24px Montserrat'
// ctx.fillText('Как человек, работающий в IT-сфере,', 292, 267-24)
// ctx.fillText('я считаю важным выделять часть своего', 292, 267)
// ctx.fillText('дохода на благотворительность.', 292, 267+24)

const image = await loadImage(__dirname + 'background_template.png')
ctx.drawImage(image, 0, 0, 1500, 500)

ctx.textAlign = 'right'
ctx.fillStyle = 'white'
ctx.font = '500 39px Montserrat'
ctx.fillText('Пожертвовано', 1460, 73)

ctx.font = 'bold 66px Montserrat'
ctx.fillText(Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0
}).format(itemsSum), 1460, 160)

ctx.font = 'medium 28px Montserrat'
ctx.fillText(`в ${itemsCount} ${
  ((itemsCount >= 10 && itemsCount <= 20) || itemsCount % 10 === 0 || itemsCount % 10 >= 5)
    ? 'организаций'
    : (itemsCount % 10 === 1)
      ? 'организацию'
      : 'организации'
}`, 1460, 219)
ctx.fillText(`или ${
  ((itemsCount >= 10 && itemsCount <= 20) || itemsCount % 10 === 0 || itemsCount % 10 >= 5)
    ? 'лицам'
    : (itemsCount % 10 === 1)
      ? 'лицу'
      : 'лицам'
}`, 1460, 254)

ctx.fillStyle = '#404040'
ctx.font = 'bold 24px Montserrat'
const today = Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  
}).format(new Date())
ctx.fillText(today, 1462, 465)
const { width } = ctx.measureText(today)

ctx.font = 'medium 24px Montserrat'
ctx.fillText('на момент', 1462-width-7, 465)

await fs.writeFile(__dirname + 'tmp_result.png', canvas.toBuffer('image/png'))