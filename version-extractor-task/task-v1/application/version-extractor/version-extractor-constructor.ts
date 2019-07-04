import { VersionExtractorInterface } from './version-extractor-interface';
import { InputHandlerInterface } from '../input-handler/input-handler-interface';

export interface VersionExtractorConstructor {
    new (inputHandlerService: InputHandlerInterface, projectFilePath: string, variablePrefix: string): VersionExtractorInterface;
}