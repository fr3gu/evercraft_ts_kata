import { AbilityType, ClassType } from "./Enums";
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

    private isCriticalHit(roll: number) {
        return this.isHit(roll) && roll === CRITICAL_ROLL;
    }

    private isHit(roll: number) {
        return roll + this._attacker.attackModifier >= this.getDefenderArmorClass();
    }

    private getDefenderArmorClass() {
        switch (this._attacker.class) {
            case ClassType.Rogue:
                return this._defender.dexLessArmorClass;
            default:
                return this._defender.armorClass;
        }
    }

    private applyDamage(isHit: boolean, isCrit: boolean) {
        if (isCrit) {
            this._defender.doDamage(this._attacker.critAttackDamage);
        } else if (isHit) {
            this._defender.doDamage(this._attacker.attackDamage);
        }
    }

    private applyExperience() {
        this._attacker.addXp(XP_PER_ATTACK);
    }
}
