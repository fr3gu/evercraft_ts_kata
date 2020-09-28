/**
 * @jest-environment node
 */

import { Hero, AbilityType, ClassType  } from "../evercraft";

declare var global: any;

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

    describe("#class", () => {
        it("defaults to None", () => {
            expect(sut.class).toBe(ClassType.None);
        });

        it.each([
            [ClassType.None, "None"],
            [ClassType.Fighter, "Fighter"],
            [ClassType.Rogue, "Rogue"],
            [ClassType.Monk, "Monk"],
            [ClassType.Paladin, "Paladin"]
        ])("can be set to %s (%s)", (classType, _expected) => {
            sut.class = classType;
            expect(sut.class).toBe(classType);
        });

        it("throws on setting invalid class", () => {
            expect(() => (sut.class = 0)).toThrowError("Invalid class (0)!");
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

    describe("#attackModifier", () => {

        it.each([
            [ "defaults to 0", 1, 10, 0 ],
            [ "goes up when hero is beefy", 1, 14, 2 ],
            [ "goes down when hero is whimpy", 1, 6, -2 ],
            [ "goes up on even levels", 2, 10, 1 ],
            [ "doesn't go up on odd levels", 3, 10, 1 ],
            [ "goes up on even higher even levels", 4, 10, 2 ],
            [ "goes up with levels and beeftitude", 4, 14, 4 ],
            [ "goes up with levels and down with wimpiness", 4, 6, 0 ],
            
        ])("%s", (_msg, lvl, str, am) => {
            global.makeLevel(sut, lvl);
            sut.setAbility(AbilityType.Strength, str);
            expect(sut.attackModifier).toBe(am);
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
});
