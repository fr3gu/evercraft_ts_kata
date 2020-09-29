import Hero from "./Hero";
import { AlignmentType, ClassType } from "./Enums";

export default class Alignment {
    private _hero: Hero;
    private _alignment : AlignmentType;
    
    constructor(hero: Hero) {
        this._hero = hero;
        this._alignment = AlignmentType.Neutral;
    }

    public get value() : AlignmentType {
        return this._alignment;
    }

    public set value(v : AlignmentType) {
        this.validateIsInList(Object.values(AlignmentType), v, `Invalid alignment (${v})!`);
        this.validateClassAndAlignment(this._hero.class, v, `'GOOD' cannot be 'Rogue'!`);

        this._alignment = v;
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