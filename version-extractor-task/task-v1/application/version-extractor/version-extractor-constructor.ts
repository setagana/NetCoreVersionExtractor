import { VersionExtractorInterface } from './version-extractor-interface';
import { InputHandlerInterface } from '../input-handler/input-handler-interface';
import { ProjectFileParserInterface } from '../project-file-parser/project-file-parser-interface';

export interface VersionExtractorConstructor {
    new (inputHandlerService: InputHandlerInterface, projectFileParserService: ProjectFileParserInterface, 
        projectFilePath: string, variablePrefix: string): VersionExtractorInterface;
}