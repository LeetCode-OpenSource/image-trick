// Doc: https://github.com/IonicaBizau/image-to-ascii

const imageToAscii = require('image-to-ascii')
const stringify = require('asciify-pixel-matrix')

function imgToAscii (imgUrl, text, height) {
  console.log('fetching and generating...\n')
  const options = {
    bg: true,
    fg: false,
    stringify: false,
    concat: false
  }

  if (height) {
    Object.assign(options, {
      size: {
        height
      }
    })
  }

  imageToAscii(imgUrl, options, (err, converted) => {
    if (err) {
      console.error(err)
      return
    }

    let snip = text
    let i = 0
    converted.forEach((cRow) => {
      cRow.forEach((px) => {
        px.char = snip[i = ++i % snip.length]
      })
    })

    console.log(stringify.stringifyMatrix(converted))
  })
}

module.exports = {
  imgToAscii
}
