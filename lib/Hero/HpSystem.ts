import Hero from "../Hero";
import { AbilityType, ClassType } from "../Enums";

const MIN_HP = 1;
const BASE_HITPOINTS = 5;
const BASE_FIGHTER_HITPOINTS = 10;

const HP_PER_LEVEL = new Map<ClassType, { hpPerLevel: number }>([
    [ClassType.None, { hpPerLevel: BASE_HITPOINTS }],
    [ClassType.Fighter, { hpPerLevel: BASE_FIGHTER_HITPOINTS }],
    [ClassType.Rogue, { hpPerLevel: BASE_HITPOINTS }],
]);

export default class HpSystem {
    private _hero: Hero;
    private _damage: number;

    constructor(hero: Hero) {
        this._hero = hero;
        this._damage = 0;
    }

    get maxHp(): number {
        return Math.max(this.hpPerLevel + this._hero.getModifierForAbility(AbilityType.Constitution), MIN_HP) * this._hero.level;
    }

    get currentHp(): number {
        return this.maxHp - this._damage;
    }

    get isAlive(): boolean {
        return this.currentHp > 0;
    }

    private get hpPerLevel(): number {
        return HP_PER_LEVEL.get(this.class).hpPerLevel;
    }

    private get class(): ClassType {
        return this._hero.class
    }

    doDamage(points: number): void {
        this._damage += points;
    }
}