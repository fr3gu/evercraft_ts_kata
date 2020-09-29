import { AbilityType, ClassType } from "./Enums";

const BASE_HITPOINTS = 5;
const BASE_FIGHTER_HITPOINTS = 10;
const CRIT_MODIFIER = 2;

interface IClassData {
    hpPerLevel: number;
    rollModForEveryNLevel: number;
    critModifier: number;
    attackAbilityMod: AbilityType;
}

const defaultData: IClassData = { hpPerLevel: BASE_HITPOINTS, rollModForEveryNLevel: 2, critModifier: CRIT_MODIFIER, attackAbilityMod: AbilityType.Strength };

export const classFeatures = new Map<ClassType, IClassData>([
    [ClassType.None, { ...defaultData }],
    [ClassType.Fighter, { ...defaultData, hpPerLevel: BASE_FIGHTER_HITPOINTS, rollModForEveryNLevel: 1 }],
    [ClassType.Rogue, { ...defaultData, critModifier: 3, attackAbilityMod: AbilityType.Dexterity }],
]);
