import { expect } from 'chai';
import { VariableSetter } from '../../../application/variable-setter/variable-setter';
import { TaskVariableRepoInterface } from '../../../infrastructure/task-variables/task-variable-repo-interface';

function VariableSetterTests() {
    it('should prefix the variable name appropriately', () => {
        let variableRepo = new MockTaskVariableRepo();
        let variableSetter = new VariableSetter(variableRepo);
        let prefix = 'TestPrefix';

        variableSetter.setTaskVariables(prefix, '');

        expect(variableRepo.variableName).to.equal('TestPrefix-ProjectVersion');
    });

    it('should set the given value on the variable', () => {
        let variableRepo = new MockTaskVariableRepo();
        let variableSetter = new VariableSetter(variableRepo);
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
}

export { VariableSetterTests };