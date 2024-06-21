
const minuteRange = {
    min: 0,
    max: 59,
}

const hourRange = {
    min: 0,
    max: 23,
}

const dayRange = {
    min: 1,
    max: 31,
}

const monthRange = {
    min: 1,
    max: 12,
}

const weekdayRange = {
    min: 1,
    max: 7,
}
 function parseElement(element, range) {
    const result = new Set()

    if (element === '*') {
        for (let i = range.min; i <= range.max; i = i + 1) {
            result.add(i)
        }
        return Array.from(result).sort((a, b) => a - b)
    }
    const listElements = element.split(',')
    if (listElements.length > 1) {
        listElements.forEach(listElement => {
            const parsedListElement = parseElement(listElement, range)
        
            parsedListElement.forEach(e => result.add(e));
        })
            
            
            return Array.from(result).sort((a, b) => a - b)

    }
        const parseSingleElement = (singleElement) => {

            const parsedElement = Number.parseInt(singleElement, 10)

            if (Number.isNaN(parsedElement)) {
                throw new Error(`Failed to parse ${element}: ${singleElement} is NaN.`)
            }

            if (parsedElement < range.min || parsedElement > range.max) {
                throw new Error(
                    `Failed to parse ${element}: ${singleElement} is outside of range of ${range.min} - ${range.max}.`,
                )
            }

            return parsedElement
        }
        const rangeSegments =
            /^((([0-9a-zA-Z]+)-([0-9a-zA-Z]+))|\*)(\/([0-9]+))?$/.exec(element)
        if (rangeSegments === null) {
            result.add(parseSingleElement(element))
            return Array.from(result).sort((a, b) => a - b)

        }
        const parsedStart =
            rangeSegments[1] === '*'
                ? range.min
                : parseSingleElement(rangeSegments[3])

        const parsedEnd =
            rangeSegments[1] === '*'
                ? range.max
                : parseSingleElement(rangeSegments[4])

                if (Number.isNaN(element)) {
                    throw new Error(`Failed to parse ${element}: ${singleElement} is NaN.`)
                }

        if (parsedStart > parsedEnd) {
            throw new Error(
                `Failed to parse ${element}: Invalid range (start: ${parsedStart}, end: ${parsedEnd}).`,
            )
        }
        const step = rangeSegments[6]
        let parsedStep = 1

        if (step !== undefined) {
            parsedStep = Number.parseInt(step, 10)
            if (Number.isNaN(parsedStep)) {
                throw new Error(`Failed to parse step: ${step} is NaN.`)
            }
            if (parsedStep < 1) {
                throw new Error(
                    `Failed to parse step: Expected ${step} to be greater than 0.`,
                )
            }
        }

        for (let i = parsedStart; i <= parsedEnd; i = i + parsedStep) {
            result.add(i)
        }
        return Array.from(result).sort((a, b) => a - b)

}
 function parseCronExpression(cronExpression) {
    const elements = cronExpression.split(" ");
    if (elements.length !== 6) {
        throw new TypeError("Invalid cron expression: expected 6 elements.");
    }
    const rawMinutes = elements[0];
    const rawHours = elements[1];
    const rawDays = elements[2];
    const rawMonths = elements[3];
    const rawWeekdays = elements[4];
    const cmd = elements[5];
    return {
        minutes: parseElement(rawMinutes, minuteRange),
        hours: parseElement(rawHours, hourRange),
        days: parseElement(rawDays, dayRange),
        months: parseElement(rawMonths, monthRange),
        weekdays: parseElement(rawWeekdays, weekdayRange),
        cmd
    }

}

module.exports = parseCronExpression

