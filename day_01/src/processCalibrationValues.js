import fs from 'fs'

function readInput() {
    try {
        const data = fs.readFileSync('./input.txt', 'utf8')
        return data
    } catch (err) {
        console.error(err)
        return
    }
}

function calculateValues() {
    const inputFile = readInput()

    if (!inputFile) {
        console.log('Problems reading the file')
        return
    }

    const contentsArray = inputFile.split(/\r?\n/)
    const numbersToSum = []

    for (let line in contentsArray) {
        const lineNumberArray = []

        //push all numbers to an array
        for (let c of contentsArray[line]) {
            if (!isNaN(c)) {
                lineNumberArray.push(c)
            }
        }

        //extract the first and last number. Also check if theres only one number
        const arrayLength = lineNumberArray.length

        const lineNumber =
            arrayLength === 1
                ? lineNumberArray[0] + '' + lineNumberArray[0]
                : lineNumberArray[0] + '' + lineNumberArray[arrayLength - 1]

        numbersToSum.push(Number.parseInt(lineNumber))
    }

    const total = numbersToSum.reduce((acc, curr) => acc + curr, 0)
    console.log('Total:', total)
}

calculateValues()
