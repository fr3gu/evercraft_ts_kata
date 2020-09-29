import Hero from "./Hero";
import { classFeatures } from "./Data";
import { AbilityType } from "./Enums";

const BASE_ATTACK_DMG = 1;
const MIN_ATTACK_DMG = 1;

export default class AttackSystem {
    private _hero: Hero;

    constructor(hero: Hero) {
        this._hero = hero;
    }

    public get attackModifier(): number {
        const myClassData = classFeatures.get(this._hero.class);
        const attackAbilityMod = this._hero.getModifierForAbility(myClassData.attackAbilityMod);

        return attackAbilityMod + Math.floor(this._hero.level / classFeatures.get(this._hero.class).rollModForEveryNLevel);
    }

    public get attackDamage(): number {
        return Math.max(BASE_ATTACK_DMG + this._hero.getModifierForAbility(AbilityType.Strength), MIN_ATTACK_DMG);
    }

    public get critAttackDamage(): number {
        const myClassData = classFeatures.get(this._hero.class);
        const attackAbilityMod = this._hero.getModifierForAbility(AbilityType.Strength);

        return Math.max((BASE_ATTACK_DMG + attackAbilityMod) * myClassData.critModifier, MIN_ATTACK_DMG);
    }
}