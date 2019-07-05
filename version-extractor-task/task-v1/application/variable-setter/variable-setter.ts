import { VariableSetterConstructor } from './variable-setter-constructor';
import { VariableSetterInterface } from './variable-setter-interface';
import { TaskVariableRepoInterface } from '../../infrastructure/task-variables/task-variable-repo-interface';
import { LoggingInterface } from '../../infrastructure/logging/logging-interface';

const VariableSetter: VariableSetterConstructor = class VariableSetter implements VariableSetterInterface {
    taskVariableRepo: TaskVariableRepoInterface;
    logger: LoggingInterface;

    readonly variableName = 'ProjectVersion';

    constructor(variableRepo: TaskVariableRepoInterface, loggingService: LoggingInterface) {
        this.taskVariableRepo = variableRepo;
        this.logger = loggingService;
    }

    setTaskVariables(prefix: string, value: string, setBuildNumber: boolean): void {
        this.logger.log('Starting setting variables...');
        let prefixedVariableName = this.getPrefixedVariableName(prefix, this.variableName);
        this.logger.log('Prefixed variable name determined as: ' + prefixedVariableName);
        this.taskVariableRepo.setVariable(prefixedVariableName, value);
        if (setBuildNumber) {
            this.logger.log('Setting BuildNumber...')
            this.setBuildNumber(value);
        }
        this.logger.log('Finishing setting variables...')
    }

    private getPrefixedVariableName(prefix: string, variableName: string): string {
        this.logger.log('Determining prefixed variable name...');
        this.logger.log('Prefix value: ' + prefix);
        if (prefix !== '' && prefix !== null) {
            return prefix + '-' + variableName;
        }
        return variableName;
    }
    
    private setBuildNumber(value: string): void {
        this.taskVariableRepo.setVariable('Build.BuildNumber', value);
    }
}

export { VariableSetter }