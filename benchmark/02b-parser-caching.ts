import {ParserWithCaching} from "../src/parser/ParserWithCaching";
import {performance} from "perf_hooks";

const rows = 100000
const millisecondsPerThousandRows = 160
const numberOfRuns = 3

let sheet = []

let prev = 0
while (prev < rows) {
  sheet.push([
    `=D${prev}*E${prev} - D${prev}*(B${prev} + C${prev}) + C${prev}*(D${prev} - A${prev}) - C${prev} * C${prev} + A${prev}`, // always 100
    `=D${prev}*E${prev} - D${prev}*(B${prev} + C${prev}) + C${prev}*(D${prev} - A${prev}) - C${prev} * C${prev} + B${prev}`, // always 200
    `=D${prev}*E${prev} - D${prev}*(B${prev} + C${prev}) + C${prev}*(D${prev} - A${prev}) - C${prev} * C${prev} + C${prev}`, // always 300
    `=D${prev}*E${prev} - D${prev}*(B${prev} + C${prev}) + C${prev}*(D${prev} - A${prev}) - C${prev} * C${prev} + D${prev}`, // always 400
    `=D${prev}*E${prev} - D${prev}*(B${prev} + C${prev}) + C${prev}*(D${prev} - A${prev}) - C${prev} * C${prev} + E${prev}`, // always 500
  ])

  prev++
}
const flattenSheet: Array<string> = [].concat.apply([], sheet) // flatten

let runsData = []
let currentRun = 0
while (currentRun < numberOfRuns) {
  const parser = new ParserWithCaching()

  const timestampBefore = Date.now()
  flattenSheet.forEach((formula) => {
    parser.parse(formula)
  })
  const timestampAfter = Date.now()

  runsData.push(timestampAfter - timestampBefore)
  console.warn(`Run ${currentRun}, cache used ${parser.statsCacheUsed} times`)

  currentRun++
}
runsData.sort()
const medianRun = runsData[Math.trunc(numberOfRuns / 2)];
console.warn(`Number of rows: ${rows}`)
console.warn(`Runs: ${runsData.map((v) => (v / 1000))} (in seconds)`)
console.warn(`Median run: ${medianRun / 1000}`)

const resultMillisecondsPerThousandRows = medianRun / (rows / 1000)
console.warn(`Actual time: ${resultMillisecondsPerThousandRows} ms per 1000 rows`)

