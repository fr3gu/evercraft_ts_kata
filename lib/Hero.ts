import { AbilityType, Alignment, ClassType } from "./Enums";
import Ability from "./Ability";
import Level from "./Level";
import { classFeatures } from "./Data";

const BASE_ARMOR_CLASS = 10;
const BASE_ATTACK_DMG = 1;
const MIN_HP = 1;
const MIN_ATTACK_DMG = 1;

export default class Hero {
    private _xp: number;
    private _alignment: Alignment;
    private _class: ClassType;
    private _currentDamage: number;
    private _abilities: Map<AbilityType, Ability>;
    private _level = new Level(this);

    name: string;

    constructor() {
        this._xp = 0;
        this._alignment = Alignment.Neutral;
        this._class = ClassType.None;
        this._currentDamage = 0;
        this._abilities = new Map([
            [AbilityType.Strength, new Ability(AbilityType.Strength)],
            [AbilityType.Dexterity, new Ability(AbilityType.Dexterity)],
            [AbilityType.Constitution, new Ability(AbilityType.Constitution)],
            [AbilityType.Wisdom, new Ability(AbilityType.Wisdom)],
            [AbilityType.Intelligence, new Ability(AbilityType.Intelligence)],
            [AbilityType.Charisma, new Ability(AbilityType.Charisma)],
        ]);

        this.name = "";
    }

    public get xp(): number {
        return this._xp;
    }

    
    public get level() : number {
        return this._level.level;
    }
    

    public get alignment(): Alignment {
        return this._alignment;
    }

    public set alignment(v: Alignment) {
        const vals = Object.values(Alignment);
        const found = !!vals.find((u) => u === v);

        if (!found) {
            throw `Invalid alignment (${v})!`;
        }

        if (this.class === ClassType.Rogue && v === Alignment.Good) {
            throw `'Rogue' cannot be 'GOOD'!`;
        }

        this._alignment = v;
    }

    public get class(): ClassType {
        return this._class;
    }

    public set class(v: ClassType) {
        const vals = Object.values(ClassType);
        const found = !!vals.find((u) => u === v);

        if (!found) {
            throw `Invalid class (${v})!`;
        }

        if (this.alignment === Alignment.Good && v === ClassType.Rogue) {
            throw `'GOOD' cannot be 'Rogue'!`;
        }

        this._class = v;
    }

    public get armorClass(): number {
        return BASE_ARMOR_CLASS + this.getModifierForAbility(AbilityType.Dexterity);
    }

    public get hitPoints(): number {
        return Math.max(classFeatures.get(this._class).hpPerLevel + this.getModifierForAbility(AbilityType.Constitution), MIN_HP) * this.level;
    }

    public get currentHitPoints(): number {
        return this.hitPoints - this._currentDamage;
    }

    public get isAlive(): boolean {
        return this.currentHitPoints > 0;
    }

    public get attackModifier(): number {
        const myClassData = classFeatures.get(this._class);
        const attackAbilityMod = this.getModifierForAbility(myClassData.attackAbilityMod);

        return attackAbilityMod + Math.floor(this.level / classFeatures.get(this._class).rollModForEveryNLevel);
    }

    public get attackDamage(): number {
        return Math.max(BASE_ATTACK_DMG + this.getModifierForAbility(AbilityType.Strength), MIN_ATTACK_DMG);
    }

    public get critAttackDamage(): number {
        const myClassData = classFeatures.get(this._class);
        const attackAbilityMod = this.getModifierForAbility(AbilityType.Strength);

        return Math.max((BASE_ATTACK_DMG + attackAbilityMod) * myClassData.critModifier, MIN_ATTACK_DMG);
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

    setAbility(abilityType: AbilityType, score: number) {
        const theAbility = this._abilities.get(abilityType);
        theAbility.score = score;
        this._abilities.set(abilityType, theAbility);
    }

    getModifierForAbility(abilityType: AbilityType): number {
        return this._abilities.get(abilityType).modifier;
    }
}
