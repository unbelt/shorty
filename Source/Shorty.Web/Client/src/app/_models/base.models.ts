export interface IDictionary<T> {
    [key: string]: T;
}

export interface IEntity {
    id: string;
    name: string;
}

export interface INavigationLink {
    path: string;
    label: string;
    hasBadge?: boolean;
}
