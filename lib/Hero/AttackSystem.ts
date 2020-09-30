import Hero from "../Hero";
import { AbilityType, AlignmentType, ClassType } from "../Enums";

const BASE_ATTACK_DMG = 1;
const MIN_ATTACK_DMG = 1;
const CRIT_MODIFIER = 2;
const ATTACK_PROGRESSION = 1 / 2;

interface IClassFeatures {
    baseDamage: number;
    attackProgression: number;
    attackAbilityMod: AbilityType;
    critMultiplier: number;
}

const defaults: IClassFeatures = { baseDamage: BASE_ATTACK_DMG, attackProgression: ATTACK_PROGRESSION, attackAbilityMod: AbilityType.Strength, critMultiplier: CRIT_MODIFIER };

const classFeatures = new Map<ClassType, IClassFeatures>([
    [ClassType.None, { ...defaults }],
    [ClassType.Fighter, { ...defaults, attackProgression: 1 }],
    [ClassType.Rogue, { ...defaults, attackAbilityMod: AbilityType.Dexterity, critMultiplier: 3 }],
    [ClassType.Monk, { ...defaults, baseDamage: 3, attackProgression: 2 / 3 }],
    [ClassType.Paladin, { ...defaults, attackProgression: 1 }],
]);

function isAlignedWith(hero: Hero, alignment: AlignmentType) {
    return hero.alignment === alignment;
}

export default class AttackSystem {
    private _hero: Hero;

    constructor(hero: Hero) {
        this._hero = hero;
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

    private get level(): ClassType {
        return this._hero.level;
    }

    getAttackModifier(defender: Hero): number {
        const result = Math.floor(this.attackProgression * this.level) + this.abiltiyModifier;

        if (isAlignedWith(defender, AlignmentType.Evil) && this.isClass(ClassType.Paladin)) {
            return result + 2;
        }
        return result;
    }

    getAttackDamage(defender: Hero): number {
        return Math.max(this.getTotalAttackDamage(defender), MIN_ATTACK_DMG);
    }

    getCriticalDamage(defender: Hero): number {
        return Math.max(this.getTotalCritDamage(defender), MIN_ATTACK_DMG);
    }

    private isClass(classType: ClassType) {
        return this.class === classType;
    }

    private getTotalAttackDamage(defender: Hero) {
        const result = this.baseDamage + this.strengthModifier;

        if (isAlignedWith(defender, AlignmentType.Evil) && this.isClass(ClassType.Paladin)) {
            return result + 2;
        }
        return result;
    }

    private getTotalCritDamage(defender: Hero) {
        const result = this.getTotalAttackDamage(defender);

        if (isAlignedWith(defender, AlignmentType.Evil) && this.isClass(ClassType.Paladin)) {
            return result * 3;
        }
        return result * this.critMultiplier;
    }
}
