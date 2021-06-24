export interface IDimensions {
    length?: number;
    width?: number;
    height?: number;
    perimeter?: number;
    area?: number;
    volume?: number;
}

export interface IMaterial {
    name?: string;
    cost?: number;
}

export interface ISelectedProperties {
    dimensions: IDimensions;
    material: IMaterial;
}

export type SelectedPropertiesState = {
    properties?: ISelectedProperties;
};

export type SelectedPropertiesAction = {
    type: string;
    properties?: ISelectedProperties;
};

export type DispatchType = (
    args: SelectedPropertiesAction
) => SelectedPropertiesAction;

// ForgeViewer Model interfaces. Used for grabbing properties from forge model.
export interface IModelPropertiesData {
    attributeName: string;
    displayValue: any;
    units: string;
}

export interface IModelProperties {
    category: string;
    data: IModelPropertiesData[];
}
