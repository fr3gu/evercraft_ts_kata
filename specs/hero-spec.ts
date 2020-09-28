/**
 * @jest-environment node
 */

import { Hero, Alignment } from "../evercraft";
import { AbilityType } from "../lib/Enums";

describe("Hero", () => {
    let sut: Hero;

    beforeEach(() => (sut = new Hero()));

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
            [Alignment.Evil, "Evil"],
        ])("can be set to %s (%s)", (alignment, _expected) => {
            sut.alignment = alignment;
            expect(sut.alignment).toBe(alignment);
        });

        it("throws on setting invalid value", () => {
            expect(() => (sut.alignment = 0)).toThrowError("Invalid value (0)!");
        });
    });

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
    });

    describe("#hitPoints", () => {
        it("defaults to 5", () => {
            expect(sut.hitPoints).toBe(5);
        });

        it("goes up when hero is buff", () => {
            sut.setAbility(AbilityType.Constitution, 15);
            expect(sut.hitPoints).toBe(7);
        });

        it("goes up when hero is sickly", () => {
            sut.setAbility(AbilityType.Constitution, 6);
            expect(sut.hitPoints).toBe(3);
        });

        it("cannot go below zero regardless of const", () => {
            sut.setAbility(AbilityType.Constitution, 1);
            expect(sut.hitPoints).toBe(1);
        });

        it("doesn't go down when damaged", () => {
            sut.damage(3);
            expect(sut.hitPoints).toBe(5);
        });
    });

    describe("#hitPoints", () => {
        it("defaults to 5", () => {
            expect(sut.currentHitPoints).toBe(5);
        });

        it("goes down when damaged", () => {
            sut.damage(3);
            expect(sut.currentHitPoints).toBe(2);
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

    describe("#attackModifier", () => {
        it("defaults to 0", () => {
            expect(sut.attackModifier).toBe(0);
        });

        it("goes up when hero is beefy", () => {
            sut.setAbility(AbilityType.Strength, 14);
            expect(sut.attackModifier).toBe(2);
        });

        it("goes down when hero is whimpy", () => {
            sut.setAbility(AbilityType.Strength, 6);
            expect(sut.attackModifier).toBe(-2);
        });
    });

    describe("#attackDamage", () => {
        it("defaults to 1", () => {
            expect(sut.attackDamage).toBe(1);
        });

        it("goes up when hero is beefy", () => {
            sut.setAbility(AbilityType.Strength, 14);
            expect(sut.attackDamage).toBe(3);
        });

        it("cannot go below 1", () => {
            sut.setAbility(AbilityType.Strength, 3);
            expect(sut.attackDamage).toBe(1);
        });
    });

    describe("#critAttackDamage", () => {
        it("defaults to 2", () => {
            expect(sut.critAttackDamage).toBe(2);
        });

        it("goes up when hero is beefy", () => {
            sut.setAbility(AbilityType.Strength, 14);
            expect(sut.critAttackDamage).toBe(6);
        });

        it("cannot go below 1", () => {
            sut.setAbility(AbilityType.Strength, 3);
            expect(sut.critAttackDamage).toBe(1);
        });
    });

    describe("xp", () => {
        it("defaults to", () => {
            expect(sut.xp).toBe(0);
        });

        it("goes up when experience is added", () => {
            sut.addXp(100);

            expect(sut.xp).toBe(100);
        });

        it("goes up when experience is added more than once", () => {
            sut.addXp(100);
            sut.addXp(50);
            expect(sut.xp).toBe(150);
        });
    });
});
