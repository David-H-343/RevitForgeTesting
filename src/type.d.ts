export interface IDimensions {
    length?: number;
    area?: number;
}

export interface IMaterial {
    name: string;
    cost: number;
}

export interface ISelectedProperties {
    dimensions?: IDimensions;
    material: IMaterial;
}

export type SelectedPropertiesState = {
    properties: ISelectedProperties;
};

export type SelectedPropertiesAction = {
    type: string;
    properties: ISelectedProperties;
};

export type DispatchType = (
    args: SelectedPropertiesAction
) => SelectedPropertiesAction;

// Extra
export interface IModelPropertiesData {
    attributeName: string;
    displayValue: any;
    units: string;
}

export interface IModelProperties {
    category: string;
    data: IModelPropertiesData[];
}
