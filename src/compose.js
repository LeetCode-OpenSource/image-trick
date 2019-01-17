function compose (...funcs) {
  return function (value) {
    return funcs.reduceRight((prevVal, func) => func(prevVal), value)
  }
}

function composeCodec (...codecs) {
  return {
    encode: compose(...codecs.map((codec) => codec.encode)),
    decode: compose(...codecs.reverse().map((codec) => codec.decode))
  }
}

module.exports = {
  compose,
  composeCodec
}
