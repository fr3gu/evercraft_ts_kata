export class Hero {
    private _alignment: Alignment;
    name: string;
    armorClass: any;
    hitPoints: any;
    constructor() {
        this.name = "";
        this._alignment = Alignment.Neutral;
        this.armorClass = 10;
        this.hitPoints = 5;
    }
    
    public get alignment() : Alignment {
        return this._alignment;
    }
    
    public set alignment(v : Alignment) {
        const vals = Object.values(Alignment);
        const found = !!vals.find(u => u === v);
        if(!found) {
            throw `Invalid value (${v})!`;
        }
        
        this._alignment = v;
    }
}

export enum Alignment {
    Neutral = 1,
    Good = 2,
    Evil = 3
}