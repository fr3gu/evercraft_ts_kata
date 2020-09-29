import Hero from "./Hero";
import { AbilityType, ClassType } from "./Enums";

const BASE_ATTACK_DMG = 1;
const MIN_ATTACK_DMG = 1;
const CRIT_MODIFIER = 2;
const ATTACK_PROGRESSION = 0.5;

const classFeatures = new Map<ClassType, { attackProgression: number, attackAbilityMod: AbilityType, critMultiplier: number }>([
    [ClassType.None, { attackProgression: ATTACK_PROGRESSION, attackAbilityMod: AbilityType.Strength, critMultiplier: CRIT_MODIFIER }],
    [ClassType.Fighter, { attackProgression: 1, attackAbilityMod: AbilityType.Strength, critMultiplier: CRIT_MODIFIER }],
    [ClassType.Rogue, { attackProgression: ATTACK_PROGRESSION, attackAbilityMod: AbilityType.Dexterity, critMultiplier: 3 }],
]);

export default class AttackSystem {
    private _hero: Hero;

    constructor(hero: Hero) {
        this._hero = hero;
    }

    get attackModifier(): number {
        return Math.floor(this.attackProgression * this._hero.level) + this.abiltiyModifier;
    }

    get attackDamage(): number {
        return Math.max(BASE_ATTACK_DMG + this.strengthModifier, MIN_ATTACK_DMG);
    }

    get critAttackDamage(): number {
        return Math.max((BASE_ATTACK_DMG + this.strengthModifier) * this.critMultiplier, MIN_ATTACK_DMG);
    }

    private get attackProgression(): number {
        return classFeatures.get(this._hero.class).attackProgression
    }

    private get attackAbility(): AbilityType {
        return classFeatures.get(this._hero.class).attackAbilityMod;
    }

    private get abiltiyModifier(): number {
        return this._hero.getModifierForAbility(this.attackAbility);
    }

    private get strengthModifier(): number {
        return this._hero.getModifierForAbility(AbilityType.Strength);
    }

    private get critMultiplier(): number {
        return classFeatures.get(this._hero.class).critMultiplier;
    }
}