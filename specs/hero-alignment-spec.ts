/**
 * @jest-environment node
 */

import { Hero, Alignment } from "../evercraft";

describe("Hero", () => {
    let sut: Hero;

    beforeEach(() => (sut = new Hero()));

    describe("#alignment", () => {
        it("defaults to Neutral", () => expect(sut.alignment).toBe(Alignment.Neutral));

        it.each([
            [Alignment.Neutral, "Neutral"],
            [Alignment.Good, "Good"],
            [Alignment.Evil, "Evil"],
        ])("can be set to %s (%s)", (alignment, _expected) => {
            sut.alignment = alignment;
            expect(sut.alignment).toBe(alignment);
        });

        it("throws on setting invalid value", () => {
            expect(() => (sut.alignment = 0))
                .toThrowError("Invalid value (0)!");
        });
    });
});