/**
 * @jest-environment node
 */

import { AbilityType, ClassType, Hero } from "../../evercraft";
import { AlignmentType } from "../../lib/Enums";
import { ISpecHelperGlobal } from "../Declarations";

declare const global: ISpecHelperGlobal;

interface IAttackDamageTestData {
    classType: ClassType;
    str: number;
    opponentAlignment: AlignmentType;
    expected: number;
}

describe("Hero", () => {
    let sut: Hero;

    beforeEach(() => {
        sut = new Hero();
    });

    describe("#attackSystem", () => {
        describe("#attackModifier", () => {
            interface IAttackModifierTestData {
                class: ClassType;
                lvl: number;
                str: number;
                dex: number;
                oppAlign: AlignmentType;
                expected: number;
            }

            describe("for classes", () => {
                const defaults: IAttackModifierTestData = { class: ClassType.None, lvl: 1, str: 10, dex: 10, oppAlign: AlignmentType.Neutral, expected: 0 };

                it.each([
                    ["defaults to 0", { ...defaults }],
                    ["goes up when hero is beefy", { ...defaults, str: 14, expected: +2 }],
                    ["goes down when hero is whimpy", { ...defaults, str: 6, expected: -2 }],
                    ["goes up on even levels", { ...defaults, lvl: 2, expected: +1 }],
                    ["doesn't go up on odd levels", { ...defaults, lvl: 3, expected: +1 }],
                    ["goes up on even higher even levels", { ...defaults, lvl: 4, expected: +2 }],
                    ["goes up with levels and beefitude", { ...defaults, lvl: 4, str: 14, expected: +4 }],
                ])("%s", (_msg, data: IAttackModifierTestData) => validateAttackModifier(data));
            });

            describe("for Fighters", () => {
                const defaults: IAttackModifierTestData = { class: ClassType.Fighter, lvl: 1, str: 10, dex: 10, oppAlign: AlignmentType.Neutral, expected: 0 };

                it.each([
                    ["defaults to 1 for Fighter", { ...defaults, expected: +1 }],
                    ["goes up on every level on Fighter", { ...defaults, lvl: 3, expected: +3 }],
                    ["goes up on strong, high-level Fighter", { ...defaults, lvl: 4, str: 14, expected: +6 }],
                ])("%s", (_msg, data: IAttackModifierTestData) => validateAttackModifier(data));
            });

            describe("for Rogues", () => {
                const defaults: IAttackModifierTestData = { class: ClassType.Rogue, lvl: 1, str: 10, dex: 10, oppAlign: AlignmentType.Neutral, expected: 0 };

                it.each([
                    ["defaults to 0 for Rogue", { ...defaults }],
                    ["doesn't go up when hero is beefy Rogue", { ...defaults, str: 14 }],
                    ["goes up when hero is fast Rogue", { ...defaults, str: 14, dex: 14, expected: +2 }],
                ])("%s", (_msg, data: IAttackModifierTestData) => validateAttackModifier(data));
            });

            describe("for Monks", () => {
                const defaults: IAttackModifierTestData = { class: ClassType.Monk, lvl: 1, str: 10, dex: 10, oppAlign: AlignmentType.Neutral, expected: 0 };

                it.each([
                    ["defaults to 0 for Monk", { ...defaults }],
                    ["goes up on second level for Monk", { ...defaults, lvl: 2, expected: 1 }],
                    ["goes up on third level for Monk", { ...defaults, lvl: 3, expected: 2 }],
                    ["doesn't go up on fourth level for Monk", { ...defaults, lvl: 4, expected: 2 }],
                    ["goes up on strong, high-level Monk", { ...defaults, lvl: 10, str: 14, expected: 8 }],
                ])("%s", (_msg, data: IAttackModifierTestData) => validateAttackModifier(data));
            });

            describe("for Paladins", () => {
                const defaults: IAttackModifierTestData = { class: ClassType.Paladin, lvl: 1, str: 10, dex: 10, oppAlign: AlignmentType.Neutral, expected: 0 };

                it.each([
                    ["defaults to 1 for Paladin", { ...defaults, expected: 1 }],
                    ["goes up on every level on Paladin", { ...defaults, lvl: 3, expected: +3 }],
                    ["goes up on strong, high-level Paladin", { ...defaults, lvl: 4, str: 14, expected: +6 }],
                    ["goes up on extra +2 for Paladin vs 'EVIL'", { ...defaults, oppAlign: AlignmentType.Evil, expected: +3 }],
                    ["doesn't go up for Paladin vs 'EVIL'", { ...defaults, oppAlign: AlignmentType.Good, expected: +1 }],
                ])("%s", (_msg, data: IAttackModifierTestData) => validateAttackModifier(data));
            });

            function validateAttackModifier(data: IAttackModifierTestData) {
                const { class: charClass, lvl, str, dex, oppAlign, expected } = data;

                const defender = new Hero();
                defender.alignment = oppAlign;

                global.makeLevel(sut, lvl);
                global.makeClass(sut, charClass);

                sut.setAbility(AbilityType.Strength, str);
                sut.setAbility(AbilityType.Dexterity, dex);

                expect(sut.getAttackModifier(defender)).toBe(expected);
            }
        });

        describe("#attackDamage", () => {
            describe.each([[ClassType.None, ClassType.Fighter, ClassType.Rogue]])("for %s", (classType) => {
                const defaults: IAttackDamageTestData = { classType, str: 10, opponentAlignment: AlignmentType.Neutral, expected: 0 };

                it.each([
                    ["defaults to 1", { ...defaults, expected: 1 }],
                    ["goes up when hero is beefy", { ...defaults, str: 14, expected: 3 }],
                    ["cannot go below 1", { ...defaults, str: 3, expected: 1 }],
                ])("%s", (_msg, data) => validateAttackDamage(data));
            });

            describe("when a Monk", () => {
                const defaults = { classType: ClassType.Monk, str: 10, opponentAlignment: AlignmentType.Neutral };

                it.each([
                    ["defaults to 3", { ...defaults, expected: 3 }],
                    ["goes up when Monk is beefy", { ...defaults, str: 14, expected: 5 }],
                    ["goes down when Monk is wimpy", { ...defaults, str: 6, expected: 1 }],
                    ["cannot go below 1", { ...defaults, str: 1, expected: 1 }],
                ])("%s", (_msg, data) => validateAttackDamage(data));
            });

            describe("when a Paladin", () => {
                const defaults = { classType: ClassType.Paladin, str: 10, opponentAlignment: AlignmentType.Neutral };

                it.each([
                    ["defaults to 1", { ...defaults, expected: 1 }],
                    ["goes up when Paladin is beefy", { ...defaults, str: 14, expected: 3 }],
                    ["goes up by +2 when opponent is 'EVIL'", { ...defaults, opponentAlignment: AlignmentType.Evil, expected: 3 }],
                    ["remains default when 'GOOD'", { ...defaults, opponentAlignment: AlignmentType.Good, expected: 1 }],
                    ["goes down when Paladin is wimpy vs 'EVIL'", { ...defaults, str: 6, opponentAlignment: AlignmentType.Evil, expected: 1 }],
                    ["cannot go below 1", { ...defaults, str: 1, expected: 1 }],
                ])("%s", (_msg, data) => validateAttackDamage(data));
            });

            function validateAttackDamage(data: IAttackDamageTestData) {
                const defender = new Hero();
                defender.alignment = data.opponentAlignment;

                global.makeClass(sut, data.classType);

                sut.setAbility(AbilityType.Strength, data.str);
                expect(sut.getAttackDamage(defender)).toBe(data.expected);
            }
        });

        describe("#critAttackDamage", () => {
            describe.each([[ClassType.None, ClassType.Fighter]])("for %s", (classType) => {
                const defaults: IAttackDamageTestData = { classType, str: 10, opponentAlignment: AlignmentType.Neutral, expected: 0 };

                it.each([
                    ["defaults to 2", { ...defaults, expected: 2 }],
                    ["goes up when hero is beefy", { ...defaults, str: 14, expected: 6 }],
                    ["cannot go below 1", { ...defaults, str: 3, expected: 1 }],
                ])("%s", (_msg, data) => validateCriticalDamage(data));
            });

            describe("when a Rogue", () => {
                const defaults = { classType: ClassType.Rogue, str: 10, opponentAlignment: AlignmentType.Neutral };

                it.each([
                    ["defaults to 3", { ...defaults, expected: 3 }],
                    ["goes up when Rogue is beefy", { ...defaults, str: 14, expected: 9 }],
                    ["cannot go below 1", { ...defaults, str: 1, expected: 1 }],
                ])("%s", (_msg, data) => validateCriticalDamage(data));
            });

            describe("when a Monk", () => {
                const defaults = { classType: ClassType.Monk, str: 10, opponentAlignment: AlignmentType.Neutral };

                it.each([
                    ["defaults to 6", { ...defaults, expected: 6 }],
                    ["goes up when Monk is beefy", { ...defaults, str: 14, expected: 10 }],
                    ["cannot go below 1", { ...defaults, str: 1, expected: 1 }],
                ])("%s", (_msg, data) => validateCriticalDamage(data));
            });

            describe("when a Paladin", () => {
                const defaults = { classType: ClassType.Paladin, str: 10, opponentAlignment: AlignmentType.Neutral };

                it.each([
                    ["defaults to 2", { ...defaults, expected: 2 }],
                    ["goes up when Paladin is beefy", { ...defaults, str: 14, expected: 6 }],
                    ["goes up by +2 then x3 when opponent is 'EVIL'", { ...defaults, opponentAlignment: AlignmentType.Evil, expected: 9 }],
                    ["goes down when Paladin is wimpy and opponent is 'EVIL'", { ...defaults, str: 6, opponentAlignment: AlignmentType.Evil, expected: 3 }],
                    ["cannot go below 1", { ...defaults, str: 1, expected: 1 }],
                ])("%s", (_msg, data) => validateCriticalDamage(data));
            });

            function validateCriticalDamage(data: IAttackDamageTestData) {
                const defender = new Hero();
                defender.alignment = data.opponentAlignment;

                global.makeClass(sut, data.classType);

                sut.setAbility(AbilityType.Strength, data.str);
                expect(sut.getCritAttackDamage(defender)).toBe(data.expected);
            }
        });
    });
});
