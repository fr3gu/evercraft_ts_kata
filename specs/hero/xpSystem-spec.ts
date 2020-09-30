/**
 * @jest-environment node
 */

import { Hero } from "../../evercraft";

describe("Hero", () => {
    let sut: Hero;

    beforeEach(() => {
        sut = new Hero();
    });

    describe("#xpSystem", () => {
        it("defaults to", () => expect(sut.xp).toBe(0));

        it("goes up when experience is added", () => {
            sut.addXp(100);
            expect(sut.xp).toBe(100);
        });

        it("goes up when experience is added more than once", () => {
            sut.addXp(100);
            sut.addXp(50);
            expect(sut.xp).toBe(150);
        });
    });

    describe("#level", () => {
        it.each([
            [0, 1],
            [500, 1],
            [999, 1],
            [1000, 2],
            [1500, 2],
            [2000, 3],
            [5000, 6],
        ])("has expected value", (xp, level) => {
            sut.addXp(xp);
            expect(sut.level).toBe(level);
        });
    });
});
