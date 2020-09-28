import Hero from "./Hero";

export default class Attack {
    private _attacker: Hero;
    private _defender: Hero;

    constructor(attacker: Hero, defender: Hero) {
        this._attacker = attacker;
        this._defender = defender;
    }

    resolve(roll: number): boolean {
        const isHit = roll + this._attacker.attackModifier >= this._defender.armorClass;
        const isCriticalHit = isHit && roll === 20;

        if (isCriticalHit) {
            this._defender.damage(this._attacker.critAttackDamage);
        } else if (isHit) {
            this._defender.damage(this._attacker.attackDamage);
        }

        return isHit;
    }
}
