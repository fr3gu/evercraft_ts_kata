/**
 * @jest-environment node
 */

import { Attack, Hero } from "../evercraft";

describe("Attack", () => {
    let sut: Attack, defender: Hero;

    beforeEach(() => {
        defender = new Hero();
        sut = new Attack(defender);
    });

    describe.each([
        ["when a roll is less than armor class", 9, false, 0],
        ["hits when roll meets armor class", 10, true, 1],
        ["when a roll beats armor class", 11, true, 1],
        ["when a roll is a natural 20", 20, true, 2]
        ])("%s", (_msg, roll, hits, points) => {

        let previousHitPoints: number, didHit: boolean;
        
        beforeEach(() => {
            previousHitPoints = defender.availableHitPoints;
            didHit = sut.resolve(roll);
        });

        it("hits", () => {
            expect(didHit).toBe(hits);
        });

        it("damages the defender for for the given damage", () => {
            expect(defender.availableHitPoints).toBe(previousHitPoints - points);
        });
    });
});
