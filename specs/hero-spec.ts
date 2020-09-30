/**
 * @jest-environment node
 */

import { Hero } from "../evercraft";

describe("Hero", () => {
    let sut: Hero;

    beforeEach(() => {
        sut = new Hero();
    });

    describe("#name", () => {
        it("defaults to empty string", () => {
            expect(sut.name).toBe("");
        });

        it("can be changed", () => {
            sut.name = "Alvar";
            expect(sut.name).toBe("Alvar");
        });
    });
});
