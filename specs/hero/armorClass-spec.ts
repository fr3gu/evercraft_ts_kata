/**
 * @jest-environment node
 */

import { AbilityType, Hero, ClassType, RaceType } from "../../evercraft";
import { ISpecHelperGlobal } from "../Declarations";

declare const global: ISpecHelperGlobal;

describe("Hero", () => {
    let sut: Hero;

    beforeEach(() => {
        sut = new Hero();
    });

    describe("#armorClass", () => {
        interface IArmorClassTestDefaults {
            attackerClass: ClassType;
            defenderClass: ClassType;
            defenderRace: RaceType;
            dex: number;
            wis: number;
            expected: number;
        }

        const defaults: IArmorClassTestDefaults = { attackerClass: ClassType.None, defenderClass: ClassType.None, defenderRace: RaceType.Human, dex: 10, wis: 10, expected: 10 };

        it.each([
            ["defaults to 10", { ...defaults }],
            ["include dexterity modifier when hero is zippy", { ...defaults, dex: 14, expected: 12 }],
            ["include dexterity modifier when hero is sluggish", { ...defaults, dex: 6, expected: 8 }],
            ["when hero is a wise Monk", { ...defaults, defenderClass: ClassType.Monk, wis: 14, expected: 12 }],
            ["when hero is a wise and zippy Monk", { ...defaults, defenderClass: ClassType.Monk, dex: 14, wis: 14, expected: 14 }],
            ["when hero is a wise and sluggish Monk", { ...defaults, defenderClass: ClassType.Monk, dex: 6, wis: 14, expected: 10 }],
            ["when hero is an ignorant Monk", { ...defaults, defenderClass: ClassType.Monk, wis: 6, expected: 10 }],
            ["when hero is an ignorant and zippy Monk", { ...defaults, defenderClass: ClassType.Monk, dex: 14, wis: 5, expected: 12 }],
            ["when hero is an ignorant and sluggish Monk", { ...defaults, defenderClass: ClassType.Monk, dex: 6, wis: 5, expected: 8 }],
            ["when the attacker is Rogue and hero is zippy", { ...defaults, attackerClass: ClassType.Rogue, dex: 14, expected: 10 }],
            ["when the attacker is Rogue and hero is sluggish", { ...defaults, attackerClass: ClassType.Rogue, dex: 4, expected: 7 }],
            ["when the attacker is Rogue and hero is a wise Monk", { ...defaults, attackerClass: ClassType.Rogue, defenderClass: ClassType.Monk, wis: 14, expected: 12 }],
            [
                "when the attacker is Rogue and hero is a wise, zippy Monk",
                {
                    ...defaults,
                    attackerClass: ClassType.Rogue,
                    defenderClass: ClassType.Monk,
                    dex: 14,
                    wis: 14,
                    expected: 12,
                },
            ],
            [
                "when the attacker is Rogue and hero is a wise, sluggish Monk",
                {
                    ...defaults,
                    attackerClass: ClassType.Rogue,
                    defenderClass: ClassType.Monk,
                    dex: 4,
                    wis: 14,
                    expected: 9,
                },
            ],
            [
                "when the attacker is Rogue and hero is a ignorant Monk",
                {
                    ...defaults,
                    attackerClass: ClassType.Rogue,
                    defenderClass: ClassType.Monk,
                    wis: 6,
                    expected: 10,
                },
            ],
            [
                "when the attacker is Rogue and hero is a ignorant, zippy Monk",
                {
                    ...defaults,
                    attackerClass: ClassType.Rogue,
                    defenderClass: ClassType.Monk,
                    dex: 14,
                    wis: 6,
                    expected: 10,
                },
            ],
            [
                "when the attacker is Rogue and hero is a ignorant, sluggish Monk",
                {
                    ...defaults,
                    attackerClass: ClassType.Rogue,
                    defenderClass: ClassType.Monk,
                    dex: 4,
                    wis: 6,
                    expected: 7,
                },
            ],
            ["when the defender is Orc, +2 is added", { ...defaults, defenderRace: RaceType.Orc, expected: 12 }],
            ["when the defender is a zippy Orc, +2 is still added", { ...defaults, defenderRace: RaceType.Orc, dex: 14, expected: 14 }],
            ["when the defender is a sluggish Orc, +2 is still added", { ...defaults, defenderRace: RaceType.Orc, dex: 6, expected: 10 }],
            ["when the attacker is Rogue and the defender is Orc, +2 is added", { ...defaults, attackerClass: ClassType.Rogue, defenderRace: RaceType.Orc, expected: 12 }],
            ["when the attacker is Rogue and the defender is a zippy Orc, +2 is still added", { ...defaults, attackerClass: ClassType.Rogue, defenderRace: RaceType.Orc, dex: 14, expected: 12 }],
            ["when the attacker is Rogue and the defender is a sluggish Orc, +2 is still added", { ...defaults, attackerClass: ClassType.Rogue, defenderRace: RaceType.Orc, dex: 6, expected: 10 }],
        ])("%s", (_msg, data: IArmorClassTestDefaults) => {
            const { attackerClass, defenderClass, defenderRace, dex, wis, expected } = data;

            const attacker = new Hero();
            global.makeClass(attacker, attackerClass);

            global.makeRace(sut, defenderRace);
            global.makeClass(sut, defenderClass);

            sut.setAbility(AbilityType.Dexterity, dex);
            sut.setAbility(AbilityType.Wisdom, wis);

            const actual = sut.getArmorClass(attacker);

            expect(actual).toBe<number>(expected);
        });
    });
});
