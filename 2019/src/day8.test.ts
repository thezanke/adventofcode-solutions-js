import { solvePart1 } from './day8';
import { getInput } from './utils/getInput';

describe('DAY 8', () => {
    test('example', () => {
        const input = '123456789012'.split('');
        expect(solvePart1(input, 3, 2)).toEqual(1);
    })
    test('Part 1', async () => {
        const input = await getInput('day8.txt', '');
        expect(solvePart1(input, 25, 6)).toEqual(100);
    })
})