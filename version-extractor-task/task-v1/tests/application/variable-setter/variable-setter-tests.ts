import { expect } from 'chai';
import { VariableSetter } from '../../../application/variable-setter/variable-setter';
import { TaskVariableRepoInterface } from '../../../infrastructure/task-variables/task-variable-repo-interface';
import { LoggingInterface } from '../../../infrastructure/logging/logging-interface';

function VariableSetterTests() {
    it('should prefix the variable name appropriately', () => {
        let variableRepo = new MockTaskVariableRepo();
        let loggingService = new MockLoggingService();
        let variableSetter = new VariableSetter(variableRepo, loggingService);
        let prefix = 'TestPrefix';

        variableSetter.setTaskVariables(prefix, '');

        expect(variableRepo.variableName).to.equal('TestPrefix-ProjectVersion');
    });

    it('should set the given value on the variable', () => {
        let variableRepo = new MockTaskVariableRepo();
        let loggingService = new MockLoggingService();
        let variableSetter = new VariableSetter(variableRepo, loggingService);
        let value = 'TestValue';

        variableSetter.setTaskVariables('', value);

        expect(variableRepo.variableValue).to.equal(value);
    });

    class MockTaskVariableRepo implements TaskVariableRepoInterface {
        variableName: string = '';
        variableValue: string = '';

        setVariable(variableName: string, variableValue: string): void {
            this.variableName = variableName;
            this.variableValue = variableValue;
        }

    }
    
    class MockLoggingService implements LoggingInterface {
        log(text: string): void {
            return;
        }

    }
}

export { VariableSetterTests };