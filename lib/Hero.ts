import { AbilityType, Alignment } from "./Enums";
import AbilityEntity from "./AbilityEntity";

export default class Hero extends AbilityEntity {
    private _alignment: Alignment;
    private _baseDamage: number;
    private _baseHitPoints: number;
    private _baseArmorClass: number;
    private _baseAttackDamage: number;
    private _xp: number;

    name: string;

    constructor() {
        super();
        this._alignment = Alignment.Neutral;
        this._baseHitPoints = 5;
        this._baseDamage = 0;
        this._baseArmorClass = 10;
        this._baseAttackDamage = 1;
        this._xp = 0;

        this.name = "";
    }

    public get alignment(): Alignment {
        return this._alignment;
    }

    public set alignment(v: Alignment) {
        const vals = Object.values(Alignment);
        const found = !!vals.find((u) => u === v);
        if (!found) {
            throw `Invalid value (${v})!`;
        }

        this._alignment = v;
    }

    public get armorClass(): number {
        return this._baseArmorClass + this.getModifierForAbility(AbilityType.Dexterity);
    }

    public get hitPoints(): number {
        return Math.max(this._baseHitPoints + this.getModifierForAbility(AbilityType.Constitution), 1);
    }

    public get currentHitPoints(): number {
        return this.hitPoints - this._baseDamage;
    }

    public get isAlive(): boolean {
        return this.currentHitPoints > 0;
    }

    public get attackModifier(): number {
        return this.getModifierForAbility(AbilityType.Strength);
    }

    public get attackDamage(): number {
        return Math.max(this._baseAttackDamage + this.getModifierForAbility(AbilityType.Strength), 1);
    }

    public get critAttackDamage(): number {
        return Math.max(this._baseAttackDamage * 2 + this.getModifierForAbility(AbilityType.Strength) * 2, 1);
    }

    public get xp(): number {
        return this._xp;
    }

    damage(points: number): void {
        this._baseDamage += points;
    }

    addXp(experience: number) {
        this._xp += experience;
    }
}
