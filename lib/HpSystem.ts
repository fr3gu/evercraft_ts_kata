import Hero from "./Hero";
import { AbilityType } from "./Enums";
import { classFeatures } from "./Data";

const MIN_HP = 1;

export default class HpSystem {
    private _hero: Hero;
    private _damage: number;

    constructor(hero: Hero) {
        this._hero = hero;
        this._damage = 0;
    }

    public get maxHp(): number {
        return Math.max(classFeatures.get(this._hero.class).hpPerLevel + this._hero.getModifierForAbility(AbilityType.Constitution), MIN_HP) * this._hero.level;
    }

    public get currentHp(): number {
        return this.maxHp - this._damage;
    }

    public get isAlive(): boolean {
        return this.currentHp > 0;
    }

    doDamage(points: number): void {
        this._damage += points;
    }
}