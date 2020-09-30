import Hero from "../Hero";
import { RaceType } from "../Enums";
import Validator from "../Validator";

export default class Race {
    private _hero: Hero;
    private _class: RaceType;

    constructor(hero: Hero) {
        this._hero = hero;
        this._class = RaceType.Human;
    }

    public get value(): RaceType {
        return this._class;
    }

    public set value(v: RaceType) {
        Validator.validateClassAlignmentAndRace(this._hero.class, this._hero.alignment, v);

        this._class = v;
    }
}
