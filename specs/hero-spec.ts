import { Hero } from "../evercraft";

describe("Hero", () => {

    let sub: Hero;

    beforeEach(() => sub = new Hero());

    describe("#name", () => {
        it("defaults to empty string", () => {
            expect(sub.name).toBe("");
        });

        it("can be changed", () => {
            sub.name = "Alvar";
            expect(sub.name).toBe("Alvar");
        });
    });
});