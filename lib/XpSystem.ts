import Hero from "./Hero";

const LEVEL_XP = 1000;

export default class XpSystem {
    private _hero: Hero;
    private _xp: number;
    
    constructor(hero: Hero) {
        this._hero = hero;
        this._xp = 0;
    }

    get level(): number {
        return Math.floor(this._hero.xp / LEVEL_XP) + 1;
    }
    
    get xp() : number {
        return this._xp;
    }
    
    setXp(amount: number) {
        this._xp = amount;
    }

    addXp(amount: number) {
        this._xp += amount;
    }
}