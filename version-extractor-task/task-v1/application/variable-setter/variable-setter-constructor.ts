import { TaskVariableRepoInterface } from '../../infrastructure/task-variables/task-variable-repo-interface';
import { VariableSetterInterface } from './variable-setter-interface';

export interface VariableSetterConstructor {
    new (taskVariableRepo: TaskVariableRepoInterface): VariableSetterInterface;
}