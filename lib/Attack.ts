import Hero from "./Hero";

export default class Attack {
    private _defender: Hero;

    constructor(defender: Hero) {
        this._defender = defender;
    }

    resolve(roll: number): boolean {
        const didHit = roll >= this._defender.armorClass;
        const isCrit = roll === 20;

        if(didHit) {
            this._defender.damage(isCrit ? 2 : 1);
        }
        
        return didHit;
    }
}