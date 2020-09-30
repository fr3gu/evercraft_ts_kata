import { AlignmentType, ClassType } from "./Enums";

export default class Validator {
    static validateClassAndAlignment(charClass: ClassType, alignment: AlignmentType): void {
        Validator.validateIsInList(Object.values(AlignmentType), alignment, `Invalid alignment (${alignment})!`);
        Validator.validateIsInList(Object.values(ClassType), charClass, `Invalid classType (${charClass})!`);

        if (charClass === ClassType.Rogue && alignment === AlignmentType.Good) {
            throw new Error("'Rogue' cannot be 'GOOD'!");
        }

        if (charClass === ClassType.Paladin && alignment !== AlignmentType.Good) {
            throw new Error("'Paladin' must be 'GOOD'!");
        }
    }

    private static validateIsInList(list: unknown[], v: AlignmentType | ClassType, errMsg: string): void {
        const found = !!list.find((u: string | number) => u === v);

        if (!found) {
            throw new Error(errMsg);
        }
    }
}
