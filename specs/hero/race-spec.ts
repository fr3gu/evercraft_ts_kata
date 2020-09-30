/**
 * @jest-environment node
 */

import { Hero, AlignmentType, ClassType, RaceType } from "../../evercraft";

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
            sut.race = race;
            expect(sut.race).toBe(race);
        });
    });
});
