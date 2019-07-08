import taskLibrary = require('azure-pipelines-task-lib/task');
import { TaskVariableRepoInterface } from './task-variable-repo-interface';

export class DevopsPipelineVariableRepo implements TaskVariableRepoInterface {
    setVariable(variableName: string, variableValue: string): void {
        taskLibrary.setVariable(variableName, variableValue);
    }

    updateBuildNumber(buildNumber: string): void {
        taskLibrary.updateBuildNumber(buildNumber);
    }
}