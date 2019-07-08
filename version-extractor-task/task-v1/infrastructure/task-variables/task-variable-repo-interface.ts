export interface TaskVariableRepoInterface {
    setVariable(variableName: string, variableValue: string): void;
    updateBuildNumber(buildNumber: string): void;
}