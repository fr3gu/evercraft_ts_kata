import { AbilityType, ClassType } from "../Enums";
import Hero from "../Hero";

const BASE_ARMOR_CLASS = 10;

export default class ArmorClass {
    private _hero: Hero;

    constructor(hero: Hero) {
        this._hero = hero;
    }

    getValue(attacker: Hero): number {
        let total = BASE_ARMOR_CLASS;
        if (attacker.class === ClassType.Rogue) {
            total += this.negativeDex;
        } else {
            total += this.dexterityModifier;
        }

        if (this._hero.class === ClassType.Monk) {
            total += this.positiveWis;
        }

        return total;
    }

    private get dexterityModifier(): number {
        return this._hero.getModifierForAbility(AbilityType.Dexterity);
    }

    private get wisdomModifier(): number {
        return this._hero.getModifierForAbility(AbilityType.Wisdom);
    }

    private get negativeDex(): number {
        return Math.min(this.dexterityModifier, 0);
    }

    private get positiveWis(): number {
        return Math.max(this.wisdomModifier, 0);
    }
}
