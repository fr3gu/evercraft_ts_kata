import { AbilityType, Alignment } from "./Enums";
import Ability from "./Ability";

export default class Hero {
    private _alignment: Alignment;
    private _baseDamage: number;
    private _baseHitPoints: number;
    private _abilities: Map<AbilityType, Ability>;
    private _baseArmorClass: number;
    private _baseAttackDamage: number;
    
    name: string;
    
    constructor() {
        this._alignment = Alignment.Neutral;
        this._baseHitPoints = 5
        this._baseDamage = 0;
        this._baseArmorClass = 10;
        this._baseAttackDamage = 1;

        this.name = "";

        this._abilities = new Map([
            [ AbilityType.Strength, new Ability(AbilityType.Strength) ],
            [ AbilityType.Dexterity, new Ability(AbilityType.Dexterity) ],
            [ AbilityType.Constitution, new Ability(AbilityType.Constitution) ],
            [ AbilityType.Wisdom, new Ability(AbilityType.Wisdom) ],
            [ AbilityType.Intelligence, new Ability(AbilityType.Intelligence) ],
            [ AbilityType.Charisma, new Ability(AbilityType.Charisma) ]
        ]);
    }

    public get alignment(): Alignment {
        return this._alignment;
    }

    public set alignment(v: Alignment) {
        const vals = Object.values(Alignment);
        const found = !!vals.find(u => u === v);
        if (!found) {
            throw `Invalid value (${v})!`;
        }

        this._alignment = v;
    }

    
    public get armorClass() : number {
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

    
    public get attackModifier() : number {
        return this.getModifierForAbility(AbilityType.Strength);
    }
    
    
    public get attackDamage() : number {
        return Math.max(this._baseAttackDamage + this.getModifierForAbility(AbilityType.Strength), 1);
    }

    public get critAttackDamage() : number {
        return Math.max((this._baseAttackDamage * 2) + (this.getModifierForAbility(AbilityType.Strength) * 2), 1);
    }
    

    damage(points: number): void {
        this._baseDamage += points;
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
