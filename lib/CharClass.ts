import Hero from "./Hero";
import { AlignmentType, ClassType } from "./Enums";

export default class CharClass {
    private _hero: Hero;
    private _class : ClassType;
    
    constructor(hero: Hero) {
        this._hero = hero;
        this._class = ClassType.None;
    }

    public get value() : ClassType {
        return this._class;
    }

    public set value(v : ClassType) {
        this.validateIsInList(Object.values(ClassType), v, `Invalid classType (${v})!`);
        this.validateClassAndAlignment(v, this._hero.alignment, `'GOOD' cannot be 'Rogue'!`);

        this._class = v;
    }

    private validateClassAndAlignment(charClass: ClassType, alignment: AlignmentType, errMsg: string) {
        if (alignment === AlignmentType.Good && charClass === ClassType.Rogue) {
            throw errMsg;
        }
    }
    
    private validateIsInList(list: unknown[], v: AlignmentType | ClassType, errMsg: string) {
        const found = !!list.find((u: string | number) => u === v);

        if (!found) {
            throw errMsg;
        }
    }
}