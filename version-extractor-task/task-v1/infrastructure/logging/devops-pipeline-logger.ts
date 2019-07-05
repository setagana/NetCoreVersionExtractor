import taskLibrary = require('azure-pipelines-task-lib/task');
import { LoggingInterface } from './logging-interface';

export class DevopsPipelineLogger implements LoggingInterface {
    log(text: string): void {
        taskLibrary.debug('Version Extractor: ' + text);
    }
}