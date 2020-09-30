import Hero from "./Hero";

const XP_PER_ATTACK = 10;
const CRITICAL_ROLL = 20;

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

    private isCriticalHit(roll: number): boolean {
        return this.isHit(roll) && roll === CRITICAL_ROLL;
    }

    private isHit(roll: number): boolean {
        return roll + this._attacker.getAttackModifier(this._defender) >= this.getDefenderArmorClass();
    }

    private getDefenderArmorClass(): number {
        return this._defender.getArmorClass(this._attacker);
    }

    private applyDamage(isHit: boolean, isCrit: boolean): void {
        if (isCrit) {
            this._defender.doDamage(this._attacker.getCritAttackDamage(this._defender));
        } else if (isHit) {
            this._defender.doDamage(this._attacker.getAttackDamage(this._defender));
        }
    }

    private applyExperience(): void {
        this._attacker.addXp(XP_PER_ATTACK);
    }
}
