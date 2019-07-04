import { FileSystemConstructor } from "./file-system-constructor";
import { FileSystemInterface } from "./file-system-interface";
import taskLibrary = require('azure-pipelines-task-lib/task');
import fs = require('fs');

const MachineFileSystem: FileSystemConstructor = class MachineFileSystem implements FileSystemInterface {
    private workingDir: string;

    constructor() {
        this.workingDir = taskLibrary.getVariable('System.DefaultWorkingDirectory');
    }

    pathMatchesExactlyOnce(path: string): boolean {
        let foundFiles = taskLibrary.findMatch(this.workingDir, path);
        return foundFiles.length === 1;
    }

    private getDevOpsAgentFilePath(path: string): string {
        let foundFiles = taskLibrary.findMatch(this.workingDir, path);
        return foundFiles[0];
    }

    readFileSync(path: string): string {
        return fs.readFileSync(this.getDevOpsAgentFilePath(path), { encoding: 'utf8' });
    }
}

export { MachineFileSystem };