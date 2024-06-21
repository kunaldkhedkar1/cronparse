const formatToTable = require("../src/formatToTable")
const fs = require("fs");

//TODO write remaining test cases
describe("formatToTable", () => {
    it("should format cron object to table string", () => {
        const str = formatToTable({
            minutes: [ 0, 15, 30, 45 ],
            hours: [ 0 ],
            days: [ 1, 15 ],
            months: [
               1,  2, 3, 4,  5,
               6,  7, 8, 9, 10,
              11, 12
            ],
            weekdays: [ 1, 2, 3, 4, 5 ],
            cmd: '/usr/bin/find'
          })
          expect(str).toEqual(
`minute        0 15 30 45
hour          0
day of month  1 15
month         1 2 3 4 5 6 7 8 9 10 11 12
day of week   1 2 3 4 5
command       /usr/bin/find
`)
    })
})