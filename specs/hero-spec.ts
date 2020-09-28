/**
 * @jest-environment node
 */

import { Hero, Alignment } from "../evercraft";

describe("Hero", () => {

    let sut: Hero;

    beforeEach(() => sut = new Hero());

    describe("#name", () => {
        it("defaults to empty string", () => {
            expect(sut.name).toBe("");
        });

        it("can be changed", () => {
            sut.name = "Alvar";
            expect(sut.name).toBe("Alvar");
        });
    });

    describe("#alignment", () => {
        it("defaults to Neutral", () => {
            expect(sut.alignment).toBe(Alignment.Neutral);
        });

        it.each([
            [Alignment.Neutral, "Neutral"],
            [Alignment.Good, "Good"],
            [Alignment.Evil, "Evil"]
        ])("can be set to %s (%s)", (alignment, _expected) => {
            sut.alignment = alignment;
            expect(sut.alignment).toBe(alignment);
        });

        it("throws on setting invalid value", () => {
            expect(() => sut.alignment = 0).toThrowError("Invalid value (0)!");
        });
    });

    describe("#armorClass", () => {
        it("defaults to 10", () => {
            expect(sut.armorClass).toBe(10);
        });
    });

    describe("#hitPoints", () => {
        it("defaults to 5", () => {
            expect(sut.availableHitPoints).toBe(5);
        });

        it("has fewer hitPoints", () => {
            sut.damage(3)
            expect(sut.availableHitPoints).toBe(2);
        });
    });

    describe("isAlive", () => {
        it("defaults to 'true'", () => {
            expect(sut.isAlive).toBe(true);
        });

        it("is still alive", () => {
            sut.damage(3);
            expect(sut.isAlive).toBe(true);
        });

        it("is dead when really damaged", () => {
            sut.damage(5);
            expect(sut.isAlive).toBe(false);
        });

        it("is dead when really, really damaged", () => {
            sut.damage(6);
            expect(sut.isAlive).toBe(false);
        });
    });
});