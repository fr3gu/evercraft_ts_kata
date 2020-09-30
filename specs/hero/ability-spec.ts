/**
 * @jest-environment node
 */

import { Hero, AbilityType, RaceType } from "../../evercraft";
import { ISpecHelperGlobal } from "../Declarations";

declare const global: ISpecHelperGlobal;

interface IAbilityTestData {
    race: RaceType;
    ability: AbilityType;
    score: number;
    expected: number;
}

describe("Hero", () => {
    let sut: Hero;

    beforeEach(() => {
        sut = new Hero();
    });

    describe("#Orc Abilities", () => {
        function validateAbilityModifier(data: IAbilityTestData) {
            sut.setAbility(data.ability, data.score);
            expect(sut.getModifierForAbility(data.ability)).toBe<number>(data.expected);
        }

        beforeEach(() => {
            global.makeRace(sut, RaceType.Orc);
        });

        const defaults = { race: RaceType.Orc, ability: AbilityType.Unknown, score: 10, expected: 0 };

        it.each([
            ["¤str: default +2", { ...defaults, ability: AbilityType.Strength, expected: 2 }],
            ["¤str: always adds +2", { ...defaults, ability: AbilityType.Strength, score: 14, expected: 4 }],
            ["¤str: always adds +2, even when wimpy", { ...defaults, ability: AbilityType.Strength, score: 4, expected: -1 }],
            ["¤int: default -1", { ...defaults, ability: AbilityType.Intelligence, expected: -1 }],
            ["¤int: always adds -1", { ...defaults, ability: AbilityType.Intelligence, score: 14, expected: 1 }],
            ["¤int: always adds -1, even when dull", { ...defaults, ability: AbilityType.Intelligence, score: 4, expected: -4 }],
            ["¤wis: default -1", { ...defaults, ability: AbilityType.Wisdom, expected: -1 }],
            ["¤wis: always adds -1", { ...defaults, ability: AbilityType.Wisdom, score: 14, expected: 1 }],
            ["¤wis: always adds -1, even when stoopid", { ...defaults, ability: AbilityType.Wisdom, score: 4, expected: -4 }],
            ["¤chr: default -1", { ...defaults, ability: AbilityType.Charisma, expected: -1 }],
            ["¤chr: always adds -1", { ...defaults, ability: AbilityType.Charisma, score: 14, expected: 1 }],
            ["¤chr: always adds -1, even when appauling", { ...defaults, ability: AbilityType.Charisma, score: 4, expected: -4 }],
        ])("%", (_, data) => {
            validateAbilityModifier(data);
        });
    });
});
