import { ClassType, Hero } from "../evercraft";

export interface ISpecHelperGlobal {
        makeLevel: (hero: Hero, level: number) => void;
        makeClass: (hero: Hero, classType: ClassType) => void;
}
