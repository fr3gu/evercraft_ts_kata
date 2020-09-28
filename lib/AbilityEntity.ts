import { AbilityType } from "./Enums";
import Ability from "./Ability";


export default class AbilityEntity {
    private _abilities: Map<AbilityType, Ability>;

    constructor() {
        this._abilities = new Map([
            [AbilityType.Strength, new Ability(AbilityType.Strength)],
            [AbilityType.Dexterity, new Ability(AbilityType.Dexterity)],
            [AbilityType.Constitution, new Ability(AbilityType.Constitution)],
            [AbilityType.Wisdom, new Ability(AbilityType.Wisdom)],
            [AbilityType.Intelligence, new Ability(AbilityType.Intelligence)],
            [AbilityType.Charisma, new Ability(AbilityType.Charisma)]
        ]);
    }

    setAbility(abilityType: AbilityType, score: number) {
        const theAbility = this._abilities.get(abilityType);
        theAbility.score = score;
        this._abilities.set(abilityType, theAbility);
    }

    getModifierForAbility(abilityType: AbilityType): number {
        return this._abilities.get(abilityType).modifier;
    }
}
