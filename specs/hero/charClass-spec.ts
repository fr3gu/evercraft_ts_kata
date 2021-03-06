/**
 * @jest-environment node
 */

import { Hero, AlignmentType, ClassType } from "../../evercraft";

describe("Hero", () => {
    let sut: Hero;

    beforeEach(() => {
        sut = new Hero();
    });

    describe("#class", () => {
        it("defaults to None", () => {
            expect(sut.class).toBe(ClassType.None);
        });

        it("throws on setting invalid classType", () => {
            expect(() => {
                sut.class = 0;
            }).toThrowError("Invalid classType (0)!");
        });

        describe("when hero is 'GOOD'", () => {
            beforeEach(() => {
                sut.alignment = AlignmentType.Good;
            });

            it.each([
                [ClassType.None, "None"],
                [ClassType.Fighter, "Fighter"],
                [ClassType.Monk, "Monk"],
                [ClassType.Paladin, "Paladin"],
            ])("can be set to %s (%s)", (classType) => {
                sut.class = classType;
                expect(sut.class).toBe(classType);
            });

            it("throws on setting class to Rogue", () => {
                expect(() => {
                    sut.class = ClassType.Rogue;
                }).toThrowError("'Rogue' cannot be 'GOOD'");
            });
        });

        describe("when hero is 'NEUTRAL'", () => {
            beforeEach(() => {
                sut.alignment = AlignmentType.Neutral;
            });

            it.each([
                [ClassType.None, "None"],
                [ClassType.Fighter, "Fighter"],
                [ClassType.Monk, "Monk"],
                [ClassType.Rogue, "Rogue"],
            ])("can be set to %s (%s)", (classType) => {
                sut.class = classType;
                expect(sut.class).toBe(classType);
            });

            it("throws on setting class to Paladin", () => {
                expect(() => {
                    sut.class = ClassType.Paladin;
                }).toThrowError("'Paladin' must be 'GOOD'");
            });
        });

        describe("when hero is 'EVIL'", () => {
            beforeEach(() => {
                sut.alignment = AlignmentType.Evil;
            });

            it.each([
                [ClassType.None, "None"],
                [ClassType.Fighter, "Fighter"],
                [ClassType.Monk, "Monk"],
                [ClassType.Rogue, "Rogue"],
            ])("can be set to %s (%s)", (classType) => {
                sut.class = classType;
                expect(sut.class).toBe(classType);
            });

            it("throws on setting class to Paladin", () => {
                expect(() => {
                    sut.class = ClassType.Paladin;
                }).toThrowError("'Paladin' must be 'GOOD'");
            });
        });
    });
});
