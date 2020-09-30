import Hero from "../Hero";
import { ClassType } from "../Enums";
import Validator from "../Validator";

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
        Validator.validateClassAlignmentAndRace(v, this._hero.alignment, this._hero.race);

        this._class = v;
    }
}
