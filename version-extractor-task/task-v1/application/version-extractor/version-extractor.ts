import { VersionExtractorConstructor } from './version-extractor-constructor';
import { VersionExtractorInterface } from './version-extractor-interface';
import { InputHandlerInterface } from '../input-handler/input-handler-interface';
import { ProjectFileParserInterface } from '../project-file-parser/project-file-parser-interface';
import { VariableSetterInterface } from '../variable-setter/variable-setter-interface';

const VersionExtractor: VersionExtractorConstructor = class VersionExtractor implements VersionExtractorInterface {
    private inputHandler: InputHandlerInterface;
    private projectFileParser: ProjectFileParserInterface;
    private variableSetter: VariableSetterInterface;

    private filePath: string;
    private prefix: string;

    constructor(inputHandlerService: InputHandlerInterface, projectFileParserService: ProjectFileParserInterface, 
        variableSetterService: VariableSetterInterface, projectFilePath: string, variablePrefix: string) {
            this.inputHandler = inputHandlerService;
            this.projectFileParser = projectFileParserService;
            this.variableSetter = variableSetterService;
            
            this.filePath = projectFilePath;
            this.prefix = variablePrefix;
    }

    run(): void {
        this.validateInputs();
        let fileContents = this.inputHandler.getProjectFileContents(this.filePath);
        let version = this.projectFileParser.getVersion(fileContents);
        this.variableSetter.setTaskVariables(this.prefix, version);
    }

    private validateInputs(): void {
        let isValidPath = this.inputHandler.isValidProjectFilePath(this.filePath);
        if (!isValidPath) {
            throw new Error('A csproj file could not be found at the given path: ' + this.filePath);
        }

        let isValidPrefix = this.inputHandler.isValidPrefix(this.prefix);
        if (!isValidPrefix) {
            throw new Error('The entered prefix appears to contain non-alphanumeric characters or is too long (more than 25 characters): ' + this.prefix);
        }
    }
}

export { VersionExtractor };