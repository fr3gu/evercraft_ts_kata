import { AlignmentType, ClassType, Hero } from "../evercraft";

declare var global: any;

global.makeLevel = (hero: Hero, level: number) => {
    hero.addXp((level - 1) * 1000);
};

global.makeClass = (hero: Hero, classType: ClassType) => {
    if (classType === ClassType.Rogue) hero.alignment = AlignmentType.Neutral;
    if (classType === ClassType.Paladin) hero.alignment = AlignmentType.Good;    
    hero.class = classType;
};