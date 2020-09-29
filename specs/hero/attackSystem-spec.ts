/**
 * @jest-environment node
 */

import { AbilityType, ClassType, Hero } from "../../evercraft";

declare var global: any;

describe("Hero", () => {
    let sut: Hero;

    beforeEach(() => (sut = new Hero()));

    describe("#attackSystem", () => {
        
        describe("#attackModifier", () => {
            interface IAttackModifierTestDefaults {
                class: ClassType;
                lvl: number;
                str: number;
                dex: number;
                expected: number;
            }
    
            const defaults: IAttackModifierTestDefaults = { class: ClassType.None, lvl: 1, str: 10, dex: 10, expected: 0 };
    
            it.each([
                ["defaults to 0", { ...defaults }],
                ["goes up when hero is beefy", { ...defaults, str: 14, expected: +2 }],
                ["goes down when hero is whimpy", { ...defaults, str: 6, expected: -2 }],
                ["goes up on even levels", { ...defaults, lvl: 2, expected: +1 }],
                ["doesn't go up on odd levels", { ...defaults, lvl: 3, expected: +1 }],
                ["goes up on even higher even levels", { ...defaults, lvl: 4, expected: +2 }],
                ["goes up with levels and beefitude", { ...defaults, lvl: 4, str: 14, expected: +4 }],
                ["defaults to 1 for Fighter", { ...defaults, class: ClassType.Fighter, expected: +1 }],
                ["goes up on every level on Fighter", { ...defaults, class: ClassType.Fighter, lvl: 3, expected: +3 }],
                ["goes up on strong, high-level Fighter", { ...defaults, class: ClassType.Fighter, lvl: 4, str: 14, expected: +6 }],
                ["defaults to 0 for Rogue", { ...defaults, class: ClassType.Rogue }],
                ["doesn't go up when hero is beefy Rogue", { ...defaults, class: ClassType.Rogue, str: 14 }],
                ["goes up when hero is fast Rogue", { ...defaults, class: ClassType.Rogue, str: 14, dex: 14, expected: +2 }],
                ["defaults to 0 for Monk", { ...defaults, class: ClassType.Monk }],
                ["goes up on second level for Monk", { ...defaults, class: ClassType.Monk, lvl: 2, expected: 1 }],
                ["goes up on third level for Monk", { ...defaults, class: ClassType.Monk, lvl: 3, expected: 2 }],
                ["doesn't go up on fourth level for Monk", { ...defaults, class: ClassType.Monk, lvl: 4, expected: 2 }],
                ["goes up on strong, high-level Monk", { ...defaults, class: ClassType.Monk, lvl: 10, str: 14, expected: 8 }],
                ["defaults to 1 for Paladin", { ...defaults, class: ClassType.Paladin, expected: 1 }],
                ["goes up on every level on Paladin", { ...defaults, class: ClassType.Paladin, lvl: 3, expected: +3 }],
            ])("%s", (_msg, data: IAttackModifierTestDefaults) => {
                const { class: charClass, lvl, str, dex, expected } = data;
                
                global.makeLevel(sut, lvl);
                
                sut.class = charClass;
                sut.setAbility(AbilityType.Strength, str);
                sut.setAbility(AbilityType.Dexterity, dex);
    
                expect(sut.attackModifier).toBe(expected);
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

            describe("when a Monk", () => {
                beforeEach(() => sut.class = ClassType.Monk);
                
                it("defaults to 3", () => {
                    expect(sut.attackDamage).toBe(3);
                });
        
                it("goes up when hero is fit", () => {
                    sut.setAbility(AbilityType.Strength, 14);
                    expect(sut.attackDamage).toBe(5);
                });
        
                it("cannot go below 1", () => {
                    sut.setAbility(AbilityType.Strength, 1);
                    expect(sut.attackDamage).toBe(1);
                });
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
    
        describe("when a Rogue", () => {
            beforeEach(() => sut.class = ClassType.Rogue);
            
            it("defaults to 3", () => {
                expect(sut.critAttackDamage).toBe(3);
            });
    
            it("goes up when hero is fit", () => {
                sut.setAbility(AbilityType.Strength, 14);
                expect(sut.critAttackDamage).toBe(9);
            });
    
            it("cannot go below 1", () => {
                sut.setAbility(AbilityType.Strength, 6);
                expect(sut.critAttackDamage).toBe(1);
            });
        });

        describe("when a Monk", () => {
            beforeEach(() => sut.class = ClassType.Monk);
            
            it("defaults to 6", () => {
                expect(sut.critAttackDamage).toBe(6);
            });
    
            it("goes up when hero is fit", () => {
                sut.setAbility(AbilityType.Strength, 14);
                expect(sut.critAttackDamage).toBe(10);
            });
    
            it("cannot go below 1", () => {
                sut.setAbility(AbilityType.Strength, 1);
                expect(sut.critAttackDamage).toBe(1);
            });
        });
    });
});