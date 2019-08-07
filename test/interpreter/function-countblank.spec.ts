import {HandsOnEngine} from '../../src'
import {CellError, ErrorType} from '../../src/Cell'
import '../testConfig'

describe('COUNTBLANK', () => {
  it('with empty args', () => {
    const engine = HandsOnEngine.buildFromArray([['=COUNTBLANK()']])
    expect(engine.getCellValue('A1')).toEqual(new CellError(ErrorType.NA))
  })

  it('with args', () => {
    const engine = HandsOnEngine.buildFromArray([['=COUNTBLANK(B1, C1)', '3.14']])
    expect(engine.getCellValue('A1')).toEqual(1)
  })

  it('with range', () => {
    const engine = HandsOnEngine.buildFromArray([['1', '', '', '=COUNTBLANK(A1:C1)']])
    expect(engine.getCellValue('D1')).toEqual(2)
  })
})