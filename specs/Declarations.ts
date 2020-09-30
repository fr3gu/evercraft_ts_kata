import { ClassType, Hero, RaceType } from "../evercraft";

export interface ISpecHelperGlobal {
        makeRace: (sut: Hero, defenderRace: RaceType) => void;
        makeLevel: (hero: Hero, level: number) => void;
        makeClass: (hero: Hero, classType: ClassType) => void;
}
