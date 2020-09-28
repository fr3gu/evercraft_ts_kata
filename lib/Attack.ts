import Hero from "./Hero";

export default class Attack {
    private _attacker: Hero;
    private _defender: Hero;

    constructor(attacker: Hero, defender: Hero) {
        this._attacker = attacker;
        this._defender = defender;
    }

    resolve(roll: number): boolean {
        const isCrit = this.isCriticalHit(roll);
        const isHit = this.isHit(roll);

        this.applyDamage(isHit, isCrit);

        this.applyExperience();

        return isHit;
    }

    private isCriticalHit(roll: number) {
        return this.isHit(roll) && roll === 20;
    }

    private isHit(roll: number) {
        return roll + this._attacker.attackModifier >= this._defender.armorClass;
    }

    private applyDamage(isHit: boolean, isCrit: boolean) {
        if (isCrit) {
            this._defender.doDamage(this._attacker.critAttackDamage);
        } else if (isHit) {
            this._defender.doDamage(this._attacker.attackDamage);
        }
    }

    private applyExperience() {
        this._attacker.addXp(10);
    }
}
