import { AbilityType } from "./Enums";

export default class Ability {
    private _score: number;
    private _type: AbilityType;
    
    constructor(type: AbilityType = AbilityType.Unknown, score: number = 10) {
        this._type = type;
        this._score = score;
    }

    get score(): number {
        return this._score;
    }

    
    set score(v : number) {
        if(v < 1 || v > 20) {
            throw `Invalid score (${v})!`
        }
        this._score = v;
    }
    
    public get modifier(): number {
        return Math.floor((this._score - 10) / 2);
    }
}
