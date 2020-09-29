import { AlignmentType, ClassType } from "./Enums";

export default class Validator {
    static validateClassAndAlignment(charClass: ClassType, alignment: AlignmentType, errMsg: string) {
        Validator.validateIsInList(Object.values(AlignmentType), alignment, `Invalid alignment (${alignment})!`);
        Validator.validateIsInList(Object.values(ClassType), charClass, `Invalid classType (${charClass})!`);
        
        if (alignment === AlignmentType.Good && charClass === ClassType.Rogue) {
            throw errMsg;
        }
    }
    
    private static validateIsInList(list: unknown[], v: AlignmentType | ClassType, errMsg: string) {
        const found = !!list.find((u: string | number) => u === v);

        if (!found) {
            throw errMsg;
        }
    }
}