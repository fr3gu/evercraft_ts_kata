/**
 * @jest-environment node
 */

import { Hero, AbilityType, ClassType, AlignmentType } from "../../evercraft";
import { ISpecHelperGlobal } from "../Declarations";

declare var global: ISpecHelperGlobal;

describe("Hero", () => {
    let sut: Hero;

    beforeEach(() => (sut = new Hero()));

    describe("#hitPoints", () => {
        it.each([
            ["defaults to 5", ClassType.None, 1, 10, 5],
            ["goes up when hero is buff", ClassType.None, 1, 15, 7],
            ["goes up when hero is sickly", ClassType.None, 1, 6, 3],
            ["cannot go below zero regardless of const", ClassType.None, 1, 1, 1],
            ["goes up with levels", ClassType.None, 3, 10, 15],
            ["goes up with levels and bufftitude", ClassType.None, 3, 15, 21],
            ["goes up with level even if sickly", ClassType.None, 3, 6, 9],
            ["cannot go below zero regardless of const", ClassType.None, 3, 1, 3],
            ["defaults to 10 for fighter", ClassType.Fighter, 1, 10, 10],
            ["goes up by 10 with levels for Fighter", ClassType.Fighter, 3, 10, 30],
            ["goes up more for buff, high-level Fighter", ClassType.Fighter, 3, 14, 36],
            ["defaults to 6 for Monk", ClassType.Monk, 1, 10, 6],
            ["goes up by 6 with levels for Monk", ClassType.Monk, 3, 10, 18],
            ["goes up more for buff, high-level Monk", ClassType.Monk, 3, 14, 24],
            ["defaults to 8 for Paladin", ClassType.Paladin, 1, 10, 8],
            ["goes up by 8 with levels for Paladin", ClassType.Paladin, 3, 10, 24],
            ["goes up more for buff, high-level Paladin", ClassType.Paladin, 3, 14, 30],
        ])("%s", (_msg, charClass, lvl, con, hp) => {
            global.makeLevel(sut, lvl);
            global.makeClass(sut, charClass);
            
            sut.setAbility(AbilityType.Constitution, con);
            expect(sut.hitPoints).toBe(hp);
        });

        it("doesn't go down when damaged", () => {
            sut.doDamage(3);
            expect(sut.hitPoints).toBe(5);
        });
    });

    describe.each([
        ["when undamaged", 0, 5, true],
        ["when damaged", 4, 1, true],
        ["when damaged to 0", 5, 0, false],
        ["when damaged below 0", 6, -1, false],
    ])("%s", (_msg, dmg, hp, isAlive) => {
        beforeEach(() => sut.doDamage(dmg));

        it("has expected hitPoints", () => expect(sut.currentHitPoints).toBe(hp));
        it("has expected liveliness", () => expect(sut.isAlive).toBe(isAlive));
    });
});
