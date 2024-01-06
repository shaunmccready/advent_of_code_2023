import fs from 'fs'

function readInput(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8')
        return data.split(/\r?\n/)
    } catch (err) {
        console.error(err)
        return
    }
}

function calculateValuesPart1() {
    const contentsArray = readInput('./input.txt')
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
    console.log('Total for Part 1:', total)
}

function calculateValuesPart2() {
    const contentsArray = readInput('./input.txt')
    const numbersToSum = []

    for (let line in contentsArray) {
        const lineNumberArray = []
        let wordBuilder = []

        //find first occurence
        let notFoundFirst = true

        while (notFoundFirst) {
            for (let c of contentsArray[line]) {
                if (!isNaN(c)) {
                    lineNumberArray.push(Number.parseInt(c))
                    notFoundFirst = false
                    break
                }

                wordBuilder.push(c)
                const wordToCheck = wordBuilder.join('')
                const wordAsNumber = convertWordToNumber(wordToCheck)

                if (wordAsNumber) {
                    lineNumberArray.push(wordAsNumber)
                    notFoundFirst = false
                    break
                }
            }
        }

        wordBuilder = []

        //find last occurence
        let notFoundLast = true
        while (notFoundLast) {
            const lineOfText = contentsArray[line]
            const lineReversed = lineOfText.split('').reverse().join('')

            for (let c of lineReversed) {
                if (!isNaN(c)) {
                    lineNumberArray.push(Number.parseInt(c))
                    notFoundLast = false
                    break
                }

                wordBuilder.unshift(c)
                const wordToCheck = wordBuilder.join('')
                const wordAsNumber = convertWordToNumber(wordToCheck)

                if (wordAsNumber) {
                    lineNumberArray.push(wordAsNumber)
                    notFoundLast = false
                    break
                }
            }
            break
        }

        //concat the first and last number
        const lineNumber = lineNumberArray[0] + '' + lineNumberArray[1]
        numbersToSum.push(Number.parseInt(lineNumber))
    }

    const total = numbersToSum.reduce((acc, curr) => acc + curr, 0)
    console.log('Total for Part 2:', total)
}

function convertWordToNumber(word) {
    if (word.includes('one')) {
        return 1
    } else if (word.includes('two')) {
        return 2
    } else if (word.includes('three')) {
        return 3
    } else if (word.includes('four')) {
        return 4
    } else if (word.includes('five')) {
        return 5
    } else if (word.includes('six')) {
        return 6
    } else if (word.includes('seven')) {
        return 7
    } else if (word.includes('eight')) {
        return 8
    } else if (word.includes('nine')) {
        return 9
    } else {
        return undefined
    }
}

// Part 1 : Correct value = 54388
calculateValuesPart1()

// Part 2 : Correct value = 53515
calculateValuesPart2()
