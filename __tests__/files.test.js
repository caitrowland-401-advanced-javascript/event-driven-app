jest.mock('fs')
const files = require('../lib/files')

describe('files module', () => {
  it('can load a file', () => {
    return files.loadFile('foo.txt')
      .then(contents => {
        expect(Buffer.isBuffer(contents)).toBeTruthy()
      })
  })
  
  describe ('save file', () => {
    it('can save a file', () => {
      const buffer = Buffer.from('test')
      return files.saveFile('test_file.text', buffer)
      .then(success => {
        expect(success).toBeUndefined()
      })
      .catch(err => {
        expect(err).toBeUndefined()
      })
    })
  
    it('raises an error if a file is invalid', () => {
      const buffer = Buffer.from('test')
      return files.saveFile(null, buffer)
      .then(success => {
        expect(success).toBeFalsy()
      })
      .catch(err => {
        expect(err.message).toEqual('Invalid file')
      })
    })
  })

  it('can uppercase a buffer of text', () => {
    const toConvert = Buffer.from('Hello There')
    const result = 'HELLO THERE'
    files.convertBuffer
    expect(files.convertBuffer(toConvert)).toEqual(Buffer.from(result))
  })
  describe ('Alter file', () => {

    it('Success when good file name is passed', () => {
      return files.alterFile('foo.txt')
      .then(success => {
        expect(success).toBeTruthy
      })
      .catch(err => {
        expect(err.message).toBeUndefined()
      })
  
    })
    it('Errors when bad file name is padded', () => {
      return files.alterFile(null)
      .then(success => {
        expect(success).toBeFalsy()
      })
      .catch( err => {
        expect(err.message).toEqual('Invalid file')
      })
    })
  })
})
