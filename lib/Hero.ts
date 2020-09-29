import { AbilityType, AlignmentType as AlignmentType, ClassType } from "./Enums";
import Ability from "./Ability";
import XpSystem from "./XpSystem";
import HpSystem from "./HpSystem";
import ArmorClass from "./ArmorClass";
import AttackSystem from "./AttackSystem";
import Alignment from "./Alignment";
import CharClass from "./CharClass";

export default class Hero {
    private _alignment: Alignment;
    private _class: CharClass;
    private _abilities: Map<AbilityType, Ability>;
    private _xpSystem: XpSystem;
    private _hp: HpSystem;
    private _ac: ArmorClass;
    private _attack: AttackSystem;

    name: string;

    constructor() {
        this._abilities = new Map([
            [AbilityType.Strength, new Ability(AbilityType.Strength)],
            [AbilityType.Dexterity, new Ability(AbilityType.Dexterity)],
            [AbilityType.Constitution, new Ability(AbilityType.Constitution)],
            [AbilityType.Wisdom, new Ability(AbilityType.Wisdom)],
            [AbilityType.Intelligence, new Ability(AbilityType.Intelligence)],
            [AbilityType.Charisma, new Ability(AbilityType.Charisma)],
        ]);

        this._alignment = new Alignment(this);
        this._class = new CharClass(this);
        this._xpSystem = new XpSystem(this);
        this._hp = new HpSystem(this);
        this._ac = new ArmorClass(this);
        this._attack = new AttackSystem(this);

        this.name = "";
    }

    get alignment(): AlignmentType {
        return this._alignment.value;
    }

    set alignment(v: AlignmentType) {
        this._alignment.value = v;
    }

    get class(): ClassType {
        return this._class.value;
    }

    set class(v: ClassType) {
        this._class.value = v;
    }

    get xp(): number {
        return this._xpSystem.xp;
    }

    get level(): number {
        return this._xpSystem.level;
    }

    get armorClass(): number {
        return this._ac.value;
    }

    get hitPoints(): number {
        return this._hp.maxHp;
    }

    get currentHitPoints(): number {
        return this._hp.currentHp;
    }

    get isAlive(): boolean {
        return this._hp.isAlive;
    }

    get attackModifier(): number {
        return this._attack.attackModifier;
    }

    get attackDamage(): number {
        return this._attack.attackDamage;
    }

    get critAttackDamage(): number {
        return this._attack.critAttackDamage;
    }

    addXp = (amount: number): void => this._xpSystem.addXp(amount);

    doDamage = (points: number): void => this._hp.doDamage(points);

    setAbility(abilityType: AbilityType, score: number) {
        const theAbility = this._abilities.get(abilityType);
        theAbility.score = score;
        this._abilities.set(abilityType, theAbility);
    }

    getModifierForAbility = (abilityType: AbilityType): number => this._abilities.get(abilityType).modifier;
}
