interface Ability {
    ability: {
        name: string;
    };
}

interface Move {
    move: {
        name: string;
    };
}

interface Stat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
    };
}

export interface Type {
    type: {
        name: string;
    };
}

export interface ApiResponse {
    name: string
    id: number
    abilities: Ability[];
    moves: Move[];
    stats: Stat[];
    types: Type[];
    base_experience: number;
    height: number;
    weight: number;
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
}