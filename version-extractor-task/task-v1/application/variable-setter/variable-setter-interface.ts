export interface VariableSetterInterface {
    setTaskVariables(prefix: string, value: string, setBuildNumber: boolean): void;
}