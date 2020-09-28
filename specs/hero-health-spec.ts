/**
 * @jest-environment node
 */

import { Hero, AbilityType } from "../evercraft";

describe("Hero", () => {
    let sut: Hero;

    beforeEach(() => (sut = new Hero()));

    describe("#hitPoints", () => {
        it.each([
            ["defaults to 5", 0, 10, 5],
            ["goes up when hero is buff", 0, 15, 7],
            ["goes up when hero is sickly", 0, 6, 3],
            ["cannot go below zero regardless of const", 0, 1, 1],
            ["goes up with levels", 2000, 10, 15],
            ["goes up with levels and bufftitude", 2000, 15, 21],
            ["goes up with level even if sickly", 2000, 6, 9],
            ["cannot go below zero regardless of const", 2000, 1, 3],
        ])("%s", (_msg, xp, con, hp) => {
            sut.setXp(xp);
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
