import taskLibrary = require('azure-pipelines-task-lib/task');
import { VersionExtractor } from './application/version-extractor/version-extractor';
import { InputHandler } from './application/input-handler/input-handler';
import { MachineFileSystem } from './infrastructure/file-system/machine-file-system';
import { ProjectFileParser } from './application/project-file-parser/project-file-parser';
import { DevopsPipelineVariableRepo } from './infrastructure/task-variables/devops-pipeline-variable-repo';
import { VariableSetter } from './application/variable-setter/variable-setter';
import { DevopsPipelineLogger } from './infrastructure/logging/devops-pipeline-logger';

async function run() {
    let projectFilePath = taskLibrary.getPathInput('projectFileLocation', true, true);
    let variablePrefix = taskLibrary.getInput('prefix', false);
    let setBuildNumber = taskLibrary.getBoolInput('setBuildNumber', false);

    let fileSystem = new MachineFileSystem();
    let inputHandler = new InputHandler(fileSystem);
    let projectFileParser = new ProjectFileParser();
    let taskVariableRepo = new DevopsPipelineVariableRepo();
    let loggingService = new DevopsPipelineLogger();
    let variableSetter = new VariableSetter(taskVariableRepo, loggingService);

    let versionExtractor = new VersionExtractor(inputHandler, projectFileParser, variableSetter, loggingService, 
        projectFilePath, variablePrefix, setBuildNumber);

    try {
        versionExtractor.run();
    } catch (error) {
        taskLibrary.setResult(taskLibrary.TaskResult.Failed, error.message);
    }
}

run();