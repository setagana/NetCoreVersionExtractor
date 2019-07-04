import taskLibrary = require('azure-pipelines-task-lib/task');
import { VersionExtractor } from './application/version-extractor/version-extractor';
import { InputHandler } from './application/input-handler/input-handler';
import { MachineFileSystem } from './infrastructure/file-system/machine-file-system';
import { ProjectFileParser } from './application/project-file-parser/project-file-parser';

async function run() {
    let projectFilePath = taskLibrary.getPathInput('projectFileLocation', true, true);
    let variablePrefix = taskLibrary.getInput('prefix', false);

    let fileSystem = new MachineFileSystem();
    let inputHandler = new InputHandler(fileSystem);
    let projectFileParser = new ProjectFileParser();
    let versionExtractor = new VersionExtractor(inputHandler, projectFileParser, projectFilePath, variablePrefix);

    try {
        versionExtractor.run();
    } catch (error) {
        taskLibrary.setResult(taskLibrary.TaskResult.Failed, error.message);
    }
}

run();