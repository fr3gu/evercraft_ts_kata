/**
 * @jest-environment node
 */

import { Ability } from "../evercraft";

describe("Ability", () => {
    let sut: Ability;

    beforeEach(() => {
        sut = new Ability();
    });

    describe("#score", () => {
        it("defaults to 10", () => {
            expect(sut.score).toBe(10);
        });

        it("can be changed", () => {
            sut.score = 15;
            expect(sut.score).toBe(15);
        });

        it("cannot be less than 1", () => {
            expect(() => {
                sut.score = 0;
            }).toThrow("Invalid score (0)!");
        });

        it("cannot be more than 20", () => {
            expect(() => {
                sut.score = 21;
            }).toThrow("Invalid score (21)!");
        });
    });

    describe("#modifier", () => {
        it.each([
            [1, -5],
            [2, -4],
            [3, -4],
            [4, -3],
            [5, -3],
            [6, -2],
            [7, -2],
            [8, -1],
            [9, -1],
            [10, 0],
            [11, 0],
            [12, 1],
            [13, 1],
            [14, 2],
            [15, 2],
            [16, 3],
            [17, 3],
            [18, 4],
            [19, 4],
            [20, 5],
        ])("score %i has a modifier of %i", (score, modifier) => {
            sut.score = score;
            expect(sut.modifier).toEqual(modifier);
        });
    });
});
