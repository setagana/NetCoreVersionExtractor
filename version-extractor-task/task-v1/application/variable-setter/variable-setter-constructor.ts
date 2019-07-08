import { TaskVariableRepoInterface } from '../../infrastructure/task-variables/task-variable-repo-interface';
import { VariableSetterInterface } from './variable-setter-interface';
import { LoggingInterface } from '../../infrastructure/logging/logging-interface';

export interface VariableSetterConstructor {
    new (taskVariableRepo: TaskVariableRepoInterface, loggingService: LoggingInterface): VariableSetterInterface;
}