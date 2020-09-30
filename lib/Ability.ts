import { Hero } from "../evercraft";
import { AbilityType, RaceType } from "./Enums";

const defaults = new Map<AbilityType, number>([
    [AbilityType.Unknown, 0],
    [AbilityType.Strength, 0],
    [AbilityType.Dexterity, 0],
    [AbilityType.Constitution, 0],
    [AbilityType.Intelligence, 0],
    [AbilityType.Wisdom, 0],
    [AbilityType.Charisma, 0],
]);

const raceAbilityMultipliersMap = new Map<RaceType, Map<AbilityType, number>>([
    [RaceType.Human, new Map(defaults)],
    [RaceType.Orc, new Map(defaults).set(AbilityType.Strength, +2).set(AbilityType.Intelligence, -1).set(AbilityType.Wisdom, -1).set(AbilityType.Charisma, -1)],
]);

export default class Ability {
    private _score: number;
    private _type: AbilityType;
    private _hero: Hero;

    constructor(hero: Hero, type: AbilityType = AbilityType.Unknown, score = 10) {
        this._hero = hero;
        this._type = type;
        this._score = score;
    }

    get score(): number {
        return this._score;
    }

    set score(v: number) {
        if (v < 1 || v > 20) {
            throw new Error(`Invalid score (${v})!`);
        }
        this._score = v;
    }

    public get modifier(): number {
        let modifier = Math.floor((this._score - 10) / 2);

        const raceAbilityMultipliers = raceAbilityMultipliersMap.get(this._hero.race);

        if(!raceAbilityMultipliers) {
            throw new Error("Race's ability modifiers are not defined");
        }

        modifier += raceAbilityMultipliers.get(this._type);

        return modifier;
    }
}
