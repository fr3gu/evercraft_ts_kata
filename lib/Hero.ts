import { Alignment } from "./Enums";
import Ability from "./Ability";

type AbilityTableRow = { key: Ability, value: number };

export default class Hero {
    private _alignment: Alignment;
    private _damage: number;
    private _hitPoints: number;
    private _abilities: AbilityTableRow[];
    
    name: string;
    armorClass: number;

    constructor() {
        this._alignment = Alignment.Neutral;
        this._hitPoints = 5
        this._damage = 0;

        this.name = "";
        this.armorClass = 10;

        this._abilities = [
            { key: Ability.Strength, value: 10 },
            { key: Ability.Dexterity, value: 10 },
            { key: Ability.Constitution, value: 10 },
            { key: Ability.Wisdom, value: 10 },
            { key: Ability.Intelligence, value: 10 },
            { key: Ability.Charisma, value: 10 }
        ];
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

    public get maxHitPoints(): number {
        return this._hitPoints;
    }

    public get availableHitPoints(): number {
        return this._hitPoints - this._damage;
    }

    public get isAlive(): boolean {
        return this.availableHitPoints > 0;
    }

    damage(points: number): void {
        this._damage += points;
    }
    
}
