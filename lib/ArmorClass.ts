import { AbilityType } from "./Enums";
import Hero from "./Hero";

const BASE_ARMOR_CLASS = 10;

export default class ArmorClass {
    private _hero: Hero;

    constructor(hero: Hero) {
        this._hero = hero;
    }

    
    public get value() : number {
        return BASE_ARMOR_CLASS + this._hero.getModifierForAbility(AbilityType.Dexterity);
    }
    
}