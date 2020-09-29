/**
 * @jest-environment node
 */

import { Hero, AlignmentType, ClassType } from "../../evercraft";

describe("Hero", () => {
    let sut: Hero;

    beforeEach(() => (sut = new Hero()));

    describe("#alignment", () => {
        it("defaults to 'NEUTRAL'", () => expect(sut.alignment).toBe(AlignmentType.Neutral));

        it.each([
            ["can be set to 'NEUTRAL'", ClassType.None, AlignmentType.Neutral],
            ["can be set to 'GOOD'", ClassType.None, AlignmentType.Good],
            ["can be set to 'EVIL'", ClassType.None, AlignmentType.Evil],
        ])("%s", (_msg, classType, alignment) => {
            sut.class = classType;
            sut.alignment = alignment;
            expect(sut.alignment).toBe(alignment);
        });

        it("throws when settings invalid alignment", () => {
            expect(() => sut.alignment = "OLA" as AlignmentType).toThrow("Invalid alignment (OLA)!");
        });

        describe("when hero is Rogue", () => {

            beforeEach(() => sut.class = ClassType.Rogue);

            it.each([
                ["can be set to 'NEUTRAL'", ClassType.None, AlignmentType.Neutral],
                ["can be set to 'EVIL'", ClassType.None, AlignmentType.Evil],
            ])("%s", (_msg, classType, alignment) => {
                sut.class = classType;
                sut.alignment = alignment;
                expect(sut.alignment).toBe(alignment);
            });
    
            it("throws when rogue tries to set 'GOOD'", () => {
                expect(() => sut.alignment = AlignmentType.Good).toThrow("'GOOD' cannot be 'Rogue'!");
            });
        });
    });
});