import { AbilityType, Alignment, ClassType } from "./Enums";
import Ability from "./Ability";
import XpSystem from "./XpSystem";
import HpSystem from "./HpSystem";
import ArmorClass from "./ArmorClass";
import AttackSystem from "./AttackSystem";

export default class Hero {
    validateClassAndAlignment(charClass: ClassType, alignment: Alignment, errMsg: string) {
        if (alignment === Alignment.Good && charClass === ClassType.Rogue) {
            throw errMsg;
        }
    }
    private validateIsInList(list: unknown[], v: Alignment | ClassType, errMsg: string) {
        const found = !!list.find((u: string | number) => u === v);

        if (!found) {
            throw errMsg;
        }
    }
    private _alignment: Alignment;
    private _class: ClassType;
    private _abilities: Map<AbilityType, Ability>;
    private _xpSystem: XpSystem;
    private _hp: HpSystem;
    private _ac: ArmorClass;
    private _attack: AttackSystem;

    name: string;

    constructor() {
        this._alignment = Alignment.Neutral;
        this._class = ClassType.None;
        this._abilities = new Map([
            [AbilityType.Strength, new Ability(AbilityType.Strength)],
            [AbilityType.Dexterity, new Ability(AbilityType.Dexterity)],
            [AbilityType.Constitution, new Ability(AbilityType.Constitution)],
            [AbilityType.Wisdom, new Ability(AbilityType.Wisdom)],
            [AbilityType.Intelligence, new Ability(AbilityType.Intelligence)],
            [AbilityType.Charisma, new Ability(AbilityType.Charisma)],
        ]);

        this.name = "";
        this._xpSystem = new XpSystem(this);
        this._hp = new HpSystem(this);
        this._ac = new ArmorClass(this);
        this._attack = new AttackSystem(this);
    }

    public get xp(): number {
        return this._xpSystem.xp;
    }

    public get level(): number {
        return this._xpSystem.level;
    }

    public get alignment(): Alignment {
        return this._alignment;
    }

    public set alignment(v: Alignment) {
        this.validateIsInList(Object.values(Alignment), v, `Invalid alignment (${v})!`);
        this.validateClassAndAlignment(this.class, v, `'GOOD' cannot be 'Rogue'!`);

        this._alignment = v;
    }

    public get class(): ClassType {
        return this._class;
    }

    public set class(v: ClassType) {
        this.validateIsInList(Object.values(ClassType), v, `Invalid class (${v})!`);
        this.validateClassAndAlignment(v, this.alignment, `'GOOD' cannot be 'Rogue'!`);
        
        this._class = v;
    }

    public get armorClass(): number {
        return this._ac.value;
    }

    public get hitPoints(): number {
        return this._hp.maxHp;
    }

    public get currentHitPoints(): number {
        return this._hp.currentHp;
    }

    public get isAlive(): boolean {
        return this._hp.isAlive;
    }

    public get attackModifier(): number {
        return this._attack.attackModifier;
    }

    public get attackDamage(): number {
        return this._attack.attackDamage;
    }

    public get critAttackDamage(): number {
        return this._attack.critAttackDamage;
    }

    addXp(amount: number) {
        this._xpSystem.addXp(amount);
    }

    doDamage(points: number): void {
        this._hp.doDamage(points);
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
