import { AbilityType, Alignment, ClassType } from "./Enums";
import AbilityEntity from "./AbilityEntity";

const LEVEL_XP = 1000;
const BASE_ARMOR_CLASS = 10;
const BASE_HITPOINTS = 5;
const BASE_ATTACK_DMG = 1;

export default class Hero extends AbilityEntity {
    private _xp: number;
    private _alignment: Alignment;
    private _class: ClassType;
    private _currentDamage: number;
    
    name: string;
    
    constructor() {
        super();
        this._xp = 0;
        this._alignment = Alignment.Neutral;
        this._class = ClassType.None;
        this._currentDamage = 0;
        
        this.name = "";
    }

    public get xp(): number {
        return this._xp;
    }

    public get level(): number {
        return Math.floor(this._xp / LEVEL_XP) + 1;
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

    
    public get class() : ClassType {
        return this._class;
    }

    
    public set class(v : ClassType) {
        const vals = Object.values(ClassType);
        const found = !!vals.find((u) => u === v);
        if (!found) {
            throw `Invalid class (${v})!`;
        }

        this._class = v;
    }
    
    

    public get armorClass(): number {
        return BASE_ARMOR_CLASS + this.getModifierForAbility(AbilityType.Dexterity);
    }

    public get hitPoints(): number {
        return Math.max(BASE_HITPOINTS + this.getModifierForAbility(AbilityType.Constitution), 1) * this.level;
    }

    public get currentHitPoints(): number {
        return this.hitPoints - this._currentDamage;
    }

    public get isAlive(): boolean {
        return this.currentHitPoints > 0;
    }

    public get attackModifier(): number {
        return this.getModifierForAbility(AbilityType.Strength) + Math.floor(this.level / 2);
    }

    public get attackDamage(): number {
        return Math.max(BASE_ATTACK_DMG + this.getModifierForAbility(AbilityType.Strength), 1);
    }

    public get critAttackDamage(): number {
        return Math.max(BASE_ATTACK_DMG * 2 + this.getModifierForAbility(AbilityType.Strength) * 2, 1);
    }

    setXp(experience: number) {
        this._xp = experience;
    }

    addXp(experience: number) {
        this._xp += experience;
    }

    doDamage(points: number): void {
        this._currentDamage += points;
    }
}
