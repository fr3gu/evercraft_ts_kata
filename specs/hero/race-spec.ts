/**
 * @jest-environment node
 */

import { Hero, RaceType } from "../../evercraft";
import { ISpecHelperGlobal } from "../Declarations";

declare const global: ISpecHelperGlobal;

describe("Hero", () => {
    let sut: Hero;

    beforeEach(() => {
        sut = new Hero();
    });

    describe("#race", () => {
        it("defaults to Human", () => {
            expect(sut.race).toBe(RaceType.Human);
        });

        it("throws on setting invalid race", () => {
            expect(() => {
                sut.race = 0 as RaceType;
            }).toThrowError("Invalid race (0)!");
        });

        it.each([
            [RaceType.Human, "Human"],
            [RaceType.Orc, "Orc"],
            // [RaceType.Dwarf, "Dwarf"],
            // [RaceType.Elf, "Elf"],
            // [RaceType.Halfling, "Halfling"],
        ])("can be set to %s (%s)", (race) => {
            global.makeRace(sut, race);
            expect(sut.race).toBe(race);
        });
    });
});
