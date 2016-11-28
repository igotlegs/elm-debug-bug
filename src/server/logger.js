const path = require('path')
const fs = require('fs-extra')
const morgan = require('morgan')
const FileStreamRotator = require('file-stream-rotator')

const defaultConfig = {
  dateFormat: 'DD-MM-YYYY',
  logFilename: 'access-%DATE%.log',
  frequency: 'daily',
  verbose: false
}

function getAccessLogStream(config) {
  if(!config.logDirectory) {
    throw new Error(`Cannot create rotating log stream because no logDirectory`
      + ` was specified.`)
  }

  fs.ensureDir(config.logDirectory)
  const accessLogStream = FileStreamRotator.getStream({
    date_format: config.dateFormat,
    filename: path.join(config.logDirectory, config.logFilename),
    frequency: config.frequency,
    verbose: config.verbose
  })
}

module.exports = {
  setup: (config) => {
    return morgan('combined', {
      stream: getAccessLogStream(Object.assign({}, defaultConfig, config))
    })
  }
}
