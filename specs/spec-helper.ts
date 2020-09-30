/* eslint no-param-reassign: 0 */

import { AlignmentType, ClassType, Hero, RaceType } from "../evercraft";
import { ISpecHelperGlobal } from "./Declarations";

declare const global: ISpecHelperGlobal;

global.makeLevel = (hero: Hero, level: number) => {
    hero.addXp((level - 1) * 1000);
};

global.makeClass = (hero: Hero, classType: ClassType) => {
    if (classType === ClassType.Rogue) hero.alignment = AlignmentType.Neutral;
    if (classType === ClassType.Paladin) hero.alignment = AlignmentType.Good;
    hero.class = classType;
};

global.makeRace = (hero: Hero, race: RaceType) => {
    hero.race = race;
}
