/**
 * @jest-environment node
 */

import { Alignment, Hero } from "../evercraft";

describe("Hero", () => {

    let sub: Hero;

    beforeEach(() => sub = new Hero());

    describe("#name", () => {
        it("defaults to empty string", () => {
            expect(sub.name).toBe("");
        });

        it("can be changed", () => {
            sub.name = "Alvar";
            expect(sub.name).toBe("Alvar");
        });
    });

    describe("#alignment", () => {
        it("defaults to Neutral", () => {
            expect(sub.alignment).toBe(Alignment.Neutral);
        });

        it.each([
            [Alignment.Neutral, "Neutral"],
            [Alignment.Good, "Good"],
            [Alignment.Evil, "Evil"]
        ])("can be set to %s (%s)", (alignment, _expected) => {
            sub.alignment = alignment;
            expect(sub.alignment).toBe(alignment);
        });

        it("throws on setting invalid value", () => {
            expect(() => sub.alignment = 0).toThrowError("Invalid value (0)!");
        });
    });

    describe("#armorClass", () => {
        it("defaults to 10", () => {
            expect(sub.armorClass).toBe(10);
        });
    });

    describe("#hitPoints", () => {
        it("defaults to 5", () => {
            expect(sub.hitPoints).toBe(5);
        });
    });
});