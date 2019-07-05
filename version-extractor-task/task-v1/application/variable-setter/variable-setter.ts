import { VariableSetterConstructor } from './variable-setter-constructor';
import { VariableSetterInterface } from './variable-setter-interface';
import { TaskVariableRepoInterface } from '../../infrastructure/task-variables/task-variable-repo-interface';

const VariableSetter: VariableSetterConstructor = class VariableSetter implements VariableSetterInterface {
    taskVariableRepo: TaskVariableRepoInterface;

    readonly variableName = 'ProjectVersion';

    constructor(variableRepo: TaskVariableRepoInterface) {
        this.taskVariableRepo = variableRepo;
    }

    setTaskVariables(prefix: string, value: string): void {
        let prefixedVariableName = this.getPrefixedVariableName(prefix, this.variableName);
        this.taskVariableRepo.setVariable(prefixedVariableName, value);
    }

    private getPrefixedVariableName(prefix: string, variableName: string): string {
        if (prefix !== '' && prefix !== null) {
            return prefix.concat('-',variableName);
        }
        return variableName;
    }
}

export { VariableSetter }