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
        let setBuildNumber = false;

        variableSetter.setTaskVariables(prefix, '', setBuildNumber);

        expect(variableRepo.variableNames[0]).to.equal('TestPrefix-ProjectVersion');
    });

    it('should set the given value on the variable', () => {
        let variableRepo = new MockTaskVariableRepo();
        let loggingService = new MockLoggingService();
        let variableSetter = new VariableSetter(variableRepo, loggingService);
        let value = 'TestValue';
        let setBuildNumber = false;

        variableSetter.setTaskVariables('', value, setBuildNumber);

        expect(variableRepo.variableValues[0]).to.equal(value);
    });

    it('should set the build number if requested', () => {
        let variableRepo = new MockTaskVariableRepo();
        let loggingService = new MockLoggingService();
        let variableSetter = new VariableSetter(variableRepo, loggingService);
        let value = 'TestValue';
        let setBuildNumber = true;

        variableSetter.setTaskVariables('', value, setBuildNumber);

        expect(variableRepo.newBuildNumber).to.equal(value)
    });

    class MockTaskVariableRepo implements TaskVariableRepoInterface {
        variableNames: string[] = new Array();
        variableValues: string[] = new Array();
        newBuildNumber: string = '';

        setVariable(variableName: string, variableValue: string): void {
            this.variableNames.push(variableName);
            this.variableValues.push(variableValue);
        }

        updateBuildNumber(buildNumber: string): void {
            this.newBuildNumber = buildNumber;
        }

    }
    
    class MockLoggingService implements LoggingInterface {
        log(text: string): void {
            return;
        }

    }
}

export { VariableSetterTests };