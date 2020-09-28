/**
 * @jest-environment node
 */

import { Hero, AbilityType } from "../evercraft";

describe("Hero", () => {
    let sut: Hero;

    beforeEach(() => (sut = new Hero()));

    describe("#hitPoints", () => {

        it.each([
            [ "defaults to 5", 0, 10, 5 ],
            [ "goes up when hero is buff", 0, 15, 7 ],
            [ "goes up when hero is sickly", 0, 6, 3 ],
            [ "cannot go below zero regardless of const", 0, 1, 1 ],
            [ "goes up with levels", 2000, 10, 15 ],
            [ "goes up with levels and bufftitude", 2000, 15, 21 ],
            [ "goes up with level even if sickly", 2000, 6, 9 ],
            [ "cannot go below zero regardless of const", 2000, 1, 3 ],
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

    describe("#currentHitPoints", () => {
        it("defaults to 5", () => {
            expect(sut.currentHitPoints).toBe(5);
        });

        it("goes down when damaged", () => {
            sut.doDamage(3);
            expect(sut.currentHitPoints).toBe(2);
        });
    });

    describe("isAlive", () => {
        it("defaults to 'true'", () => {
            expect(sut.isAlive).toBe(true);
        });

        it("is still alive", () => {
            sut.doDamage(3);
            expect(sut.isAlive).toBe(true);
        });

        it("is dead when really damaged", () => {
            sut.doDamage(5);
            expect(sut.isAlive).toBe(false);
        });

        it("is dead when really, really damaged", () => {
            sut.doDamage(6);
            expect(sut.isAlive).toBe(false);
        });
    });
});