import { VersionExtractorInterface } from './version-extractor-interface';
import { InputHandlerInterface } from '../input-handler/input-handler-interface';
import { ProjectFileParserInterface } from '../project-file-parser/project-file-parser-interface';
import { VariableSetterInterface } from '../variable-setter/variable-setter-interface';

export interface VersionExtractorConstructor {
    new (inputHandlerService: InputHandlerInterface, projectFileParserService: ProjectFileParserInterface, 
        variableSetterService: VariableSetterInterface,projectFilePath: string, variablePrefix: string): VersionExtractorInterface;
}