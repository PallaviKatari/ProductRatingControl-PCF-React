/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    sampleProperty: ComponentFramework.PropertyTypes.StringProperty;
    commentsHtml: ComponentFramework.PropertyTypes.StringProperty;
    ratingValue: ComponentFramework.PropertyTypes.WholeNumberProperty;
}
export interface IOutputs {
    sampleProperty?: string;
    commentsHtml?: string;
    ratingValue?: number;
}
