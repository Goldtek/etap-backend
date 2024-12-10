export interface Profile {
    id?: string;
    name?: string;
    gender?: string;
    location?: string;
    website?: string;
    picture?: string;
    _json?: Json;
}

export interface Json {
    email?: string;
    gender?: string;
    location?: Location;
}

export interface Location {
    name: string;
}
