// import { describe, expect, test } from 'jest'
const parseCronExpression  = require('../src/parser.js')
const CMD = "/cmd";

describe('parseCronExpression', () => {


	test('Should parse asterix to all allowed values', () => {
		
		expect(parseCronExpression(`* * * * * ${CMD}`)).toMatchObject({
			minutes: Array.from({ length: 60 }, (_, i) => i),
			hours: Array.from({ length: 24 }, (_, i) => i),
			days: Array.from({ length: 31 }, (_, i) => i + 1),
			months: Array.from({ length: 12 }, (_, i) => i + 1),
			weekdays: Array.from({ length: 7 }, (_, i) => i + 1),
      cmd: CMD
		})
	})

	test('Should correctly parse weekday range with 7', () => {
		expect(parseCronExpression(`2 3 4 5 6-7 ${CMD}`)).toMatchObject({
			minutes: [2],
			hours: [3],
			days: [4],
			months: [5],
			weekdays: [6, 7],
			cmd: CMD
		})
	})

	test('Should correctly parse single numbers', () => {
		expect(parseCronExpression(`2 3 4 5 6 ${CMD}`)).toMatchObject({
			minutes: [2],
			hours: [3],
			days: [4],
			months: [5],
			weekdays: [6],
			cmd: CMD
		})
	})

	test('Should correctly parse lists', () => {
		const { minutes, hours, days, months, weekdays } =
			parseCronExpression(`2,3,4 4,5,6 7,8 9,10,11 1,2,3 ${CMD}`)
		console.log({minutes})
		expect(minutes).toStrictEqual([2, 3, 4])
		expect(hours).toStrictEqual([4, 5, 6])
		expect(days).toStrictEqual([7, 8])
		expect(months).toStrictEqual([9, 10, 11])
		expect(weekdays).toStrictEqual([ 1, 2, 3])
	})

	test('Should correctly parse ranges', () => {
		const { seconds, minutes, hours, days, months, weekdays } =
			parseCronExpression(`2-3 3-22 4-10 5-11 1-7 ${CMD}`)

		expect(minutes).toStrictEqual([2, 3])
		expect(hours).toStrictEqual([
			3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
		])
		expect(days).toStrictEqual([4, 5, 6, 7, 8, 9, 10])
		expect(months).toStrictEqual([5, 6, 7, 8, 9, 10, 11])
		expect(weekdays).toStrictEqual([1, 2, 3, 4, 5, 6, 7])
	})

	test('Should correctly parse ranges in lists', () => {
		const { seconds, minutes, hours, days, months, weekdays } =
			parseCronExpression(`2,3,2-6 1,3-22,2 2,3,4-10 1,5-11 1-6,7 ${CMD}`)

		expect(minutes).toStrictEqual([2, 3, 4, 5, 6])
		expect(hours).toStrictEqual([
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
			22,
		])
		expect(days).toStrictEqual([2, 3, 4, 5, 6, 7, 8, 9, 10])
		expect(months).toStrictEqual([1, 5, 6, 7, 8, 9, 10, 11])
		expect(weekdays).toStrictEqual([1, 2, 3, 4, 5, 6, 7])
	})

	test('Should correctly parse step values', () => {
		const { seconds, minutes, hours, days, months, weekdays } =
			parseCronExpression(`2-10/3 0-9/2 5-11/4 */2 1-6/3 ${CMD}`)

		expect(minutes).toStrictEqual([2, 5, 8])
		expect(hours).toStrictEqual([0, 2, 4, 6, 8])
		expect(days).toStrictEqual([5, 9])
		expect(months).toStrictEqual([1, 3, 5, 7, 9, 11])
		expect(weekdays).toStrictEqual([1, 4])
	})




	test('Should throw error on invalid cron string', () => {
		expect(() => parseCronExpression('')).toThrow(
			new TypeError('Invalid cron expression: expected 6 elements.'),
		)
	
		expect(() => parseCronExpression(`* * * * * * ${CMD}`)).toThrow(
			new Error('Invalid cron expression: expected 6 elements.'),
		)
		expect(() => parseCronExpression(`60 * * * * ${CMD}`)).toThrow(
			new Error(
				'Failed to parse 60: 60 is outside of range of 0 - 59.',
			),
		)
		expect(() => parseCronExpression(`-1 * * * * ${CMD}`)).toThrow(
			new Error(
				'Failed to parse -1: -1 is outside of range of 0 - 59.',
			),
		)
		
		expect(() => parseCronExpression(`* 24 * * * ${CMD}`)).toThrow(
			new Error(
				'Failed to parse 24: 24 is outside of range of 0 - 23.',
			),
		)
		
		expect(() => parseCronExpression(`* * * * 8 ${CMD}`)).toThrow(
			new Error(
				'Failed to parse 8: 8 is outside of range of 1 - 7.',
			),
		)
	})
})