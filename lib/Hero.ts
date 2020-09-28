import { AbilityType, Alignment } from "./Enums";
import AbilityEntity from "./AbilityEntity";

export default class Hero extends AbilityEntity {
    private _xp: number;
    private _alignment: Alignment;
    private _baseArmorClass: number;
    private _baseHitPoints: number;
    private _baseDamage: number;
    private _baseAttackDamage: number;

    name: string;

    constructor() {
        super();
        this._xp = 0;
        this._alignment = Alignment.Neutral;
        this._baseArmorClass = 10;
        this._baseHitPoints = 5;
        this._baseDamage = 0;
        this._baseAttackDamage = 1;

        this.name = "";
    }

    public get xp(): number {
        return this._xp;
    }

    public get level(): number {
        return Math.floor(this._xp / 1000) + 1;
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
        return Math.max(this._baseHitPoints + this.getModifierForAbility(AbilityType.Constitution), 1) * this.level;
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

    setXp(experience: number) {
        this._xp = experience;
    }

    addXp(experience: number) {
        this._xp += experience;
    }

    doDamage(points: number): void {
        this._baseDamage += points;
    }

    
}
