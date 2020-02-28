import { HyperFormula } from '../../src'
import '../testConfig'
import { adr, detailedError } from '../testUtils'
import {  ErrorType } from '../../src/Cell'

//Standard 
// UNARY + https://docs.oasis-open.org/office/OpenDocument/v1.3/csprd02/part4-formula/OpenDocument-v1.3-csprd02-part4-formula.html#__RefHeading__1018040_715980110
// UNARY - https://docs.oasis-open.org/office/OpenDocument/v1.3/csprd02/part4-formula/OpenDocument-v1.3-csprd02-part4-formula.html#__RefHeading__1018042_715980110


function createEngine(data: any[][]) {
  const engine = HyperFormula.buildFromArray(data)

  return {
    getCellValue(cellAddress: string) {
      return engine.getCellValue(adr(cellAddress))
    }
  }
}

describe('Quality assurance of operators Unary plus and minus', () => {
  it('string given by reference should return string with UNARY+', () => {
    const engine = createEngine([
      ['Liz'],
      ['=+A1']
    ])
    expect(engine.getCellValue('A2')).toEqual('Liz') // UNARY PLUS value
  })

  it('string given by reference should return string with UNARY-', () => {
    const engine = createEngine([
      ['Liz'],
      ['=-A1']
    ])
    expect(engine.getCellValue('A2')).toEqual(detailedError(ErrorType.VALUE))
  })

  it('string given directly should return same string', () => {
    const engine = createEngine([
      ['=+"Liz"']
    ])
    expect(engine.getCellValue('A1')).toEqual('Liz') 
  })

  it('string given directly should thrown error with UNARY-', () => {
    const engine = createEngine([
      ['=-"Liz"']
    ])
    expect(engine.getCellValue('A1')).toEqual(detailedError(ErrorType.VALUE)) 
  })

  it('float given by reference should return same float with UNARY+', () => {
    const engine = createEngine([
      ['3.1415'],
      ['=+A1']
    ])
    expect(engine.getCellValue('A2')).toEqual(3.1415) 
  })

  it('number given by reference should return same number with UNARY+', () => {
    const engine = createEngine([
      [999],
      ['=+A1']
    ])
    expect(engine.getCellValue('A2')).toEqual(999) 
  })

  xit('Integer given by reference should return same Integer with UNARY+', () => {
    const engine = createEngine([
      ['02/01/1999'],
      ['=+A1']
    ])
    expect(engine.getCellValue('A2')).toEqual('02/01/1999') //36192
  })

  it('Integer given by reference should return same Integer with UNARY+', () => {
    const engine = createEngine([
      ['=+"02/01/1999"']
    ])
    expect(engine.getCellValue('A1')).toEqual('02/01/1999') //36192
  })

  it('Integer given by reference should be counted with UNARY-', () => {
    const engine = createEngine([
      ['02/01/1999'],
      ['=-A1']
    ])
    expect(engine.getCellValue('A2')).toEqual(-36192)
  }) 
  
  it('Integer given by reference should be counted  with UNARY-', () => {
    const engine = createEngine([
      ['=-"02/01/1999"']
    ])
    expect(engine.getCellValue('A1')).toEqual(-36192) 
  })

})


