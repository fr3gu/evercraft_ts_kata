import { AlignmentType, ClassType, RaceType } from "./Enums";

export default class Validator {
    static validateClassAlignmentAndRace(charClass: ClassType, alignment: AlignmentType, race: RaceType): void {
        Validator.validateIsInList(Object.values(AlignmentType), alignment, `Invalid alignment (${alignment})!`);
        Validator.validateIsInList(Object.values(ClassType), charClass, `Invalid classType (${charClass})!`);
        Validator.validateIsInList(Object.values(RaceType), race, `Invalid race (${race})!`);

        if (charClass === ClassType.Rogue && alignment === AlignmentType.Good) {
            throw new Error("'Rogue' cannot be 'GOOD'!");
        }

        if (charClass === ClassType.Paladin && alignment !== AlignmentType.Good) {
            throw new Error("'Paladin' must be 'GOOD'!");
        }

        // if (race === RaceType.Halfling && alignment === AlignmentType.Evil) {
        //     throw new Error("'Halfling' cannot be 'EVIL'!");
        // }
    }

    private static validateIsInList(list: unknown[], v: AlignmentType | ClassType | RaceType, errMsg: string): void {
        const found = !!list.find((u: string | number) => u === v);

        if (!found) {
            throw new Error(errMsg);
        }
    }
}
