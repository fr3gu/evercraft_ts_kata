/**
 * @jest-environment node
 */

import { Attack, Hero } from "../evercraft";
import { AbilityType } from "../lib/Enums";

describe("Attack", () => {
    let sut: Attack, attacker: Hero, defender: Hero;

    beforeEach(() => {
        attacker = new Hero();
        defender = new Hero();
        sut = new Attack(attacker, defender);
    });

    describe.each([
        ["when a roll is less than armor class", 9, false, 0],
        ["hits when roll meets armor class", 10, true, 1],
        ["when a roll beats armor class", 11, true, 1],
        ["when a roll is a natural 20", 20, true, 2],
    ])("%s", (_msg, roll, hits, points) => {
        let previousHitPoints: number, didHit: boolean;

        beforeEach(() => {
            previousHitPoints = defender.currentHitPoints;
            didHit = sut.resolve(roll);
        });

        it("hits", () => {
            expect(didHit).toBe(hits);
        });

        it("damages the defender for for the given damage", () => {
            console.log(attacker.attackDamage, points);
            expect(defender.currentHitPoints).toBe(previousHitPoints - points);
        });
    });

    describe("when hero is beefy", () => {
        let previousHitPoints: number, didHit: boolean;
        beforeEach(() => attacker.setAbility(AbilityType.Strength, 14));

        it("hits more easily", () => {
            didHit = sut.resolve(8);

            expect(didHit).toBe(true);
        });

        it("misses less easily", () => {
            didHit = sut.resolve(7);

            expect(didHit).toBe(false);
        });

        it("does more damage", () => {
            previousHitPoints = defender.currentHitPoints;
            sut.resolve(8);
            
            expect(defender.currentHitPoints).toBe(previousHitPoints - attacker.attackDamage);
        });

        it("does even more damage", () => {
            previousHitPoints = defender.currentHitPoints;
            sut.resolve(20);
            
            expect(defender.currentHitPoints).toBe(previousHitPoints - attacker.critAttackDamage);
        });
    });
});