import { classNames } from './classNames';

describe('classNames', () => {
	test('Работает , если передан только один параметр', () => {
		expect(classNames('someClass')).toBe('someClass');
	});

	test('Массив классов появляется в списке классов', () => {
		const expected = 'someClass class1 class2';
		expect(classNames(
			'someClass', 
			{}, 
			['class1', 'class2']
		)).toBe(expected);
	});

	test('Моды в значение true появляются в списке классов', () => {
		const expected = 'someClass class1 class2 hovered scrollable';
		expect(classNames(
			'someClass', 
			{hovered: true, scrollable: true}, 
			['class1', 'class2']
		)).toBe(expected);
	});

	test('Моды в значение false не появляются в списке классов', () => {
		const expected = 'someClass class1 class2 hovered';
		expect(classNames(
			'someClass', 
			{hovered: true, scrollable: false}, 
			['class1', 'class2']
		)).toBe(expected);
	});

	test('Моды со значением undefined не появляются в списке классов', () => {
		const expected = 'someClass class1 class2 hovered';
		expect(classNames(
			'someClass', 
			{hovered: true, scrollable: undefined}, 
			['class1', 'class2']
		)).toBe(expected);
	});
});