const fs = require('fs')
const util = require('util')
const events = require('./events')

require('./logger')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const files = {}

files.loadFile = file => readFile(file)

files.saveFile = (file, buffer) => writeFile(file, buffer)

files.convertBuffer = buffer => {
  let converted = buffer.toString().trim().toUpperCase()
  return Buffer.from(converted)
}

files.alterFile = async file => {
try {
   let fileLoaded = await files.loadFile(file)
   let upperCased = await files.convertBuffer(fileLoaded)
   await files.saveFile(file, upperCased)

   const status = {
      status: 0,
      file: file,
      message: 'Saved Properly'
   }
   events.emit('save-file', status)
  } catch (e) {
      const status = {
        status: 1,
        file: file, 
        message: e.message
      }
      events.emit('readwrite-error', status)
  }
}

module.exports = files
