export interface IPokeData {
    count: number;
    next: string;
    previous: string | null;
    results: IPoke[];
}

export interface IPoke {
    url: string;
    name: string;
    slot: number;
}

export interface IPokeDetailed {
    name: string;
    moves: IMove[];
    sprites: {
        front_default: string;
        other: {
            home: {
                front_shiny: string;
                front_default: string;
            }
        }
    }
    types: IType[];
}

export interface IMove {
    move: {
        name: string;
    }
}

export interface IType {
    slot: number;
    hovered: boolean;
    type: {
        name: string;
        url: string;
    }
}

export interface ITypeData {
    count: number;
    results: ITypeResult[];
}

export interface ITypeResult {
    name: string;
    url: string;
}


export interface ISorted {
    pokemon: ISortedPoke[];
}

export interface ISortedPoke {
    pokemon: IPoke;
}
