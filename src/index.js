const program = require('commander')

const pkg = require('../package.json')

const { composeCodec } = require('./compose')
const { utf8, base64 } = require('./codec')
const { imgToAscii } = require('./img-to-ascii')

program
  .version(pkg.version)
  .option('-i, --image <image>', 'set source image, e.g. https://abc.com/d.jpg')
  .option('-t, --text <text>', 'set shown text')
  .option('-s, --spliter <s>', 'set spliter')
  .option('-c, --codec <c>', 'set codec, default: "base64", accept: [base64, jwt] e.g. "base64,jwt"')
  .parse(process.argv)

const imgUrl = program.image || 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Edsger_Wybe_Dijkstra.jpg'
const text = program.text || '测试数据'
const spliter = program.spliter || '//////'
const codecStr = program.codec || 'base64'

console.log(`
Used args:
--------------------
- image: ${imgUrl}
- text: ${text}
- spliter: ${spliter}
- codec: ${codecStr}
--------------------
`)

const codecMap = {
  'base64': base64
}

const codecs = codecStr.split(',').map((str) => {
  const codec = codecMap[str]
  if (!codec) throw new Error(`undefined codec: ${str}`)
  return codec
})

const { encode } = composeCodec(...codecs.concat(utf8))
const code = encode(text)

imgToAscii(imgUrl, `${code}${spliter}`)
