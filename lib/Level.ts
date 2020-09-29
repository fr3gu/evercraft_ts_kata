import Hero from "./Hero";

const LEVEL_XP = 1000;

export default class Level {
    private _hero: Hero;
    
    constructor(hero: Hero) {
        this._hero = hero;
    }

    public get level(): number {
        return Math.floor(this._hero.xp / LEVEL_XP) + 1;
    }
}