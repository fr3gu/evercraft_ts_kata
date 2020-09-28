/**
 * @jest-environment node
 */

import { Hero, AbilityType } from "../evercraft";

declare var global: any;

describe("Hero", () => {
    let sut: Hero;

    beforeEach(() => (sut = new Hero()));

    describe("#hitPoints", () => {
        it.each([
            ["defaults to 5", 1, 10, 5],
            ["goes up when hero is buff", 1, 15, 7],
            ["goes up when hero is sickly", 1, 6, 3],
            ["cannot go below zero regardless of const", 1, 1, 1],
            ["goes up with levels", 3, 10, 15],
            ["goes up with levels and bufftitude", 3, 15, 21],
            ["goes up with level even if sickly", 3, 6, 9],
            ["cannot go below zero regardless of const", 3, 1, 3],
        ])("%s", (_msg, lvl, con, hp) => {
            global.makeLevel(sut, lvl);
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
