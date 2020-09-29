import Hero from "../Hero";
import { AbilityType, ClassType } from "../Enums";

const BASE_ATTACK_DMG = 1;
const MIN_ATTACK_DMG = 1;
const CRIT_MODIFIER = 2;
const ATTACK_PROGRESSION = 1/2;

const classFeatures = new Map<ClassType, { baseDamage: number; attackProgression: number; attackAbilityMod: AbilityType; critMultiplier: number }>([
    [ClassType.None, { baseDamage: BASE_ATTACK_DMG, attackProgression: ATTACK_PROGRESSION, attackAbilityMod: AbilityType.Strength, critMultiplier: CRIT_MODIFIER }],
    [ClassType.Fighter, { baseDamage: BASE_ATTACK_DMG, attackProgression: 1, attackAbilityMod: AbilityType.Strength, critMultiplier: CRIT_MODIFIER }],
    [ClassType.Rogue, { baseDamage: BASE_ATTACK_DMG, attackProgression: ATTACK_PROGRESSION, attackAbilityMod: AbilityType.Dexterity, critMultiplier: 3 }],
    [ClassType.Monk, { baseDamage: 3, attackProgression: 2/3, attackAbilityMod: AbilityType.Strength, critMultiplier: CRIT_MODIFIER }],
    [ClassType.Paladin, { baseDamage: 2, attackProgression: 1, attackAbilityMod: AbilityType.Strength, critMultiplier: CRIT_MODIFIER }],
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
        return Math.max(this.getAttackDamage(), MIN_ATTACK_DMG);
    }

    get critAttackDamage(): number {
        return Math.max(this.getAttackDamage() * this.critMultiplier, MIN_ATTACK_DMG);
    }

    private get baseDamage(): number {
        return classFeatures.get(this.class).baseDamage;
    }

    private get attackProgression(): number {
        return classFeatures.get(this.class).attackProgression;
    }

    private get attackAbility(): AbilityType {
        return classFeatures.get(this.class).attackAbilityMod;
    }

    private get abiltiyModifier(): number {
        return this._hero.getModifierForAbility(this.attackAbility);
    }

    private get strengthModifier(): number {
        return this._hero.getModifierForAbility(AbilityType.Strength);
    }

    private get critMultiplier(): number {
        return classFeatures.get(this.class).critMultiplier;
    }

    private get class(): ClassType {
        return this._hero.class;
    }

    private getAttackDamage() {
        return this.baseDamage + this.strengthModifier;
    }
}
