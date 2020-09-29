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
                atckMod: number;
            }
    
            const defaults: IAttackModifierTestDefaults = { class: ClassType.None, lvl: 1, str: 10, dex: 10, atckMod: 0 };
    
            it.each([
                ["defaults to 0", { ...defaults }],
                ["goes up when hero is beefy", { ...defaults, str: 14, atckMod: +2 }],
                ["goes down when hero is whimpy", { ...defaults, str: 6, atckMod: -2 }],
                ["goes up on even levels", { ...defaults, lvl: 2, atckMod: +1 }],
                ["doesn't go up on odd levels", { ...defaults, lvl: 3, atckMod: +1 }],
                ["goes up on even higher even levels", { ...defaults, lvl: 4, atckMod: +2 }],
                ["goes up with levels and beefitude", { ...defaults, lvl: 4, str: 14, atckMod: +4 }],
                ["defaults to 1 for Fighter", { ...defaults, class: ClassType.Fighter, atckMod: +1 }],
                ["goes up on every level on Fighter", { ...defaults, class: ClassType.Fighter, lvl: 3, atckMod: +3 }],
                ["goes up on strong, high-level Fighter", { ...defaults, class: ClassType.Fighter, lvl: 4, str: 14, atckMod: +6 }],
                ["defaults to 0 for Rogue", { ...defaults, class: ClassType.Rogue }],
                ["doesn't go up when hero is beefy Rogue", { ...defaults, class: ClassType.Rogue, str: 14 }],
                ["goes up when hero is fast Rogue", { ...defaults, class: ClassType.Rogue, str: 14, dex: 14, atckMod: +2 }],
            ])("%s", (_msg, data: IAttackModifierTestDefaults) => {
                const { class: charClass, lvl, str, dex, atckMod } = data;
                
                global.makeLevel(sut, lvl);
                
                sut.class = charClass;
                sut.setAbility(AbilityType.Strength, str);
                sut.setAbility(AbilityType.Dexterity, dex);
    
                expect(sut.attackModifier).toBe(atckMod);
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
    });
});