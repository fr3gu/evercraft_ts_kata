import { AbilityType, AlignmentType, ClassType } from "./Enums";
import HeroAbility from "./Ability";
import HeroXpSystem from "./Hero/XpSystem";
import HeroHpSystem from "./Hero/HpSystem";
import HeroArmorClass from "./Hero/ArmorClass";
import HeroAttackSystem from "./Hero/AttackSystem";
import HeroAlignment from "./Hero/Alignment";
import HeroCharClass from "./Hero/CharClass";

export default class Hero {
    private _alignment: HeroAlignment;
    private _class: HeroCharClass;
    private _abilities: Map<AbilityType, HeroAbility>;
    private _xpSystem: HeroXpSystem;
    private _hp: HeroHpSystem;
    private _ac: HeroArmorClass;
    private _attack: HeroAttackSystem;

    name: string;

    constructor() {
        this._abilities = new Map([
            [AbilityType.Strength, new HeroAbility(AbilityType.Strength)],
            [AbilityType.Dexterity, new HeroAbility(AbilityType.Dexterity)],
            [AbilityType.Constitution, new HeroAbility(AbilityType.Constitution)],
            [AbilityType.Wisdom, new HeroAbility(AbilityType.Wisdom)],
            [AbilityType.Intelligence, new HeroAbility(AbilityType.Intelligence)],
            [AbilityType.Charisma, new HeroAbility(AbilityType.Charisma)],
        ]);

        this._alignment = new HeroAlignment(this);
        this._class = new HeroCharClass(this);
        this._xpSystem = new HeroXpSystem(this);
        this._hp = new HeroHpSystem(this);
        this._ac = new HeroArmorClass(this);
        this._attack = new HeroAttackSystem(this);

        this.name = "";
    }

    get alignment(): AlignmentType { return this._alignment.value; }

    set alignment(v: AlignmentType) { this._alignment.value = v; }

    get class(): ClassType { return this._class.value; }

    set class(v: ClassType) { this._class.value = v; }

    get xp(): number { return this._xpSystem.xp; }

    get level(): number { return this._xpSystem.level; }

    get hitPoints(): number { return this._hp.maxHp; }

    get currentHitPoints(): number { return this._hp.currentHp; }

    get isAlive(): boolean { return this._hp.isAlive; }

    get attackModifier(): number { return this._attack.attackModifier; }

    get attackDamage(): number { return this._attack.attackDamage; }

    get critAttackDamage(): number { return this._attack.critAttackDamage; }

    addXp = (amount: number): void => this._xpSystem.addXp(amount);

    doDamage = (points: number): void => this._hp.doDamage(points);

    getArmorClass = (attacker: Hero): number => this._ac.getValue(attacker);

    getModifierForAbility = (abilityType: AbilityType): number => this._abilities.get(abilityType).modifier;

    setAbility = (abilityType: AbilityType, score: number) => {
        const theAbility = this._abilities.get(abilityType);
        theAbility.score = score;
        this._abilities.set(abilityType, theAbility);
    };
}
