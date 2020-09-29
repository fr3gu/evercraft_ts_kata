import { AbilityType } from "../Enums";
import Hero from "../Hero";

const BASE_ARMOR_CLASS = 10;

export default class ArmorClass {
    private _hero: Hero;

    constructor(hero: Hero) {
        this._hero = hero;
    }

    
    get value() : number {
        return BASE_ARMOR_CLASS + this.dexterityModifier;
    }

    get dexLessValue(): number {
        return this.dexterityModifier < 0 ? this.value : BASE_ARMOR_CLASS;
    }

    private get dexterityModifier(): number {
        return this._hero.getModifierForAbility(AbilityType.Dexterity);
    }
    
}