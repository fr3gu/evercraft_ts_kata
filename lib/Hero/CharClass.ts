import Hero from "../Hero";
import { AlignmentType, ClassType } from "../Enums";
import Validator from "./Validator";

export default class CharClass {
    private _hero: Hero;
    private _class: ClassType;

    constructor(hero: Hero) {
        this._hero = hero;
        this._class = ClassType.None;
    }

    public get value(): ClassType {
        return this._class;
    }

    public set value(v: ClassType) {
        Validator.validateClassAndAlignment(v, this._hero.alignment, `'GOOD' cannot be 'Rogue'!`);

        this._class = v;
    }
}
