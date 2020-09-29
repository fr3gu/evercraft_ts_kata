/**
 * @jest-environment node
 */

import { AbilityType, Hero } from "../../evercraft";
import { ClassType } from "../../lib/Enums";

describe("Hero", () => {
    let sut: Hero;

    beforeEach(() => (sut = new Hero()));

    describe("#armorClass", () => {
        it("defaults to 10", () => {
            expect(sut.armorClass).toBe(10);
        });

        it("include dexterity modifier when hero is zippy", () => {
            sut.setAbility(AbilityType.Dexterity, 14);
            expect(sut.armorClass).toBe(12);
        });

        it("include dexterity modifier when hero is sluggish", () => {
            sut.setAbility(AbilityType.Dexterity, 6);
            expect(sut.armorClass).toBe(8);
        });

        describe("when hero is a Monk", () => {
            beforeEach(() => sut.class = ClassType.Monk);

            describe("and is very wise", () => {
                beforeEach(() => sut.setAbility(AbilityType.Wisdom, 14));

                it("adds wisdom to armorClass", () => {
                    expect(sut.armorClass).toBe<number>(12);
                });

                it("include dexterity modifier when hero is zippy", () => {
                    sut.setAbility(AbilityType.Dexterity, 13);
                    expect(sut.armorClass).toBe<number>(13);
                });

                it("include dexterity modifier when hero is sluggish", () => {
                    sut.setAbility(AbilityType.Dexterity, 6);
                    expect(sut.armorClass).toBe<number>(10);
                });

            });

            describe("and is a bit ignorant", () => {
                beforeEach(() => sut.setAbility(AbilityType.Wisdom, 5));

                it("ignore wisdom when calculating armorClass", () => {
                    expect(sut.armorClass).toBe<number>(10);
                });

                it("include dexterity modifier when hero is zippy", () => {
                    sut.setAbility(AbilityType.Dexterity, 14);
                    expect(sut.armorClass).toBe<number>(12);
                });

                it("include dexterity modifier when hero is sluggish", () => {
                    sut.setAbility(AbilityType.Dexterity, 6);
                    expect(sut.armorClass).toBe<number>(8);
                });
            });
        });
    });
});