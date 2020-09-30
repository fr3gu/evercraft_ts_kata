import { AlignmentType, ClassType } from "./Enums";

export default class Validator {
    static validateClassAndAlignment(charClass: ClassType, alignment: AlignmentType) {
        Validator.validateIsInList(Object.values(AlignmentType), alignment, `Invalid alignment (${alignment})!`);
        Validator.validateIsInList(Object.values(ClassType), charClass, `Invalid classType (${charClass})!`);
        
        if (charClass === ClassType.Rogue && alignment === AlignmentType.Good) {
            throw `'Rogue' cannot be 'GOOD'!`;
        }

        if (charClass === ClassType.Paladin) {
            if (alignment === AlignmentType.Neutral) {
                throw `'Paladin' cannot be 'NEUTRAL'!`;
            }
    
            if (alignment === AlignmentType.Evil) {
                throw `'Paladin' cannot be 'EVIL'!`;
            }
        }
    }
    
    private static validateIsInList(list: unknown[], v: AlignmentType | ClassType, errMsg: string) {
        const found = !!list.find((u: string | number) => u === v);

        if (!found) {
            throw errMsg;
        }
    }
}