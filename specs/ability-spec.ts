/**
 * @jest-environment node
 */

import { Ability, RaceType } from "../evercraft";
import Hero from "../lib/Hero";

describe("Ability", () => {
    let sut: Ability;
    let hero = new Hero();

    beforeEach(() => {
        sut = new Ability(hero);
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

        it.each([
            [RaceType.Human, "Human"],
            [RaceType.Orc, "Orc"],
            //[RaceType.Dwarf, "Dwarf"]
        ])("can get modifiers for race", (race) => {

            hero.race = race;
            expect(sut.modifier).toBeDefined();
        });
    });
});
