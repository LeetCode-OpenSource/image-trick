const program = require('commander')

const pkg = require('../package.json')

const { composeCodec } = require('./compose')
const { hex, base64, jwt } = require('./codec')
const { imgToAscii } = require('./img-to-ascii')

program
  .version(pkg.version)
  .option('-i, --image <image>', 'set source image, e.g. https://abc.com/d.jpg')
  .option('-t, --text <text>', 'set shown text')
  .option('-s, --spliter <s>', 'set spliter')
  .option('-c, --codec <c>', 'set codec, default: "hex,base64", accept: [hex, base64, jwt] e.g. "hex,jwt"')
  .option('-h, --height <h>', 'set height, e.g. 40 or 50%, and width will be computed to keep aspect ratio')
  .parse(process.argv)

const imgUrl = program.image || 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Edsger_Wybe_Dijkstra.jpg'
const text = program.text || '测试数据'
const spliter = program.spliter || '//////'
const codecStr = program.codec || 'hex,base64'
const height = program.height || null

console.log(`
Used args:
--------------------
- image: ${imgUrl}
- text: ${text}
- spliter: ${spliter}
- codec: ${codecStr}
--------------------`)

const codecMap = {
  'hex': hex,
  'base64': base64,
  'jwt': jwt
}

const codecs = codecStr.split(',').map((str) => {
  const codec = codecMap[str]
  if (!codec) throw new Error(`undefined codec: ${str}`)
  return codec
}).reverse()

const { encode, decode } = composeCodec(...codecs)
const code = encode(text)

console.log(`
----------------
code: ${code}
decoded: ${decode(code)}
----------------
`)

imgToAscii(imgUrl, `${code}${spliter}`, height)
