import Hero from "../Hero";
import { AlignmentType, ClassType, RaceType } from "../Enums";
import Validator from "../Validator";

export default class Alignment {
    private _hero: Hero;
    private _alignment: AlignmentType;

    constructor(hero: Hero) {
        this._hero = hero;
        this._alignment = AlignmentType.Neutral;
    }

    public get value(): AlignmentType {
        return this._alignment;
    }

    public set value(v: AlignmentType) {
        Validator.validateClassAlignmentAndRace(this._hero.class, v, this._hero.race);

        this._alignment = v;
    }
}
