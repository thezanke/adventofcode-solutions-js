import { createObject } from "./day1";

describe("2021 - Day 1", () => {
  describe("Part 1", () => {
    describe(createObject, () => {
      it('creates a new object with the given name', () => {
        const obj = createObject({ name: 'test' });
        expect(obj.name).toEqual('test');
      })
    })
  });

  // describe("Part 2");
});
