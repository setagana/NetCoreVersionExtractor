import { VersionExtractorConstructor } from './version-extractor-constructor';
import { VersionExtractorInterface } from './version-extractor-interface';
import { InputHandlerInterface } from '../input-handler/input-handler-interface';
import { ProjectFileParserInterface } from '../project-file-parser/project-file-parser-interface';
import { VariableSetterInterface } from '../variable-setter/variable-setter-interface';
import { LoggingInterface } from '../../infrastructure/logging/logging-interface';

const VersionExtractor: VersionExtractorConstructor = class VersionExtractor implements VersionExtractorInterface {
    private inputHandler: InputHandlerInterface;
    private projectFileParser: ProjectFileParserInterface;
    private variableSetter: VariableSetterInterface;
    private logger: LoggingInterface;

    private filePath: string;
    private prefix: string;
    private setBuildNumber: boolean;

    constructor(inputHandlerService: InputHandlerInterface, projectFileParserService: ProjectFileParserInterface, 
        variableSetterService: VariableSetterInterface, loggingService: LoggingInterface, 
        projectFilePath: string, variablePrefix: string, setBuildNumber: boolean) {
            this.inputHandler = inputHandlerService;
            this.projectFileParser = projectFileParserService;
            this.variableSetter = variableSetterService;
            this.logger = loggingService;
            
            this.filePath = projectFilePath;
            this.prefix = variablePrefix;
            this.setBuildNumber = setBuildNumber;
    }

    run(): void {
        this.logger.log('Validating inputs...');
        this.validateInputs();
        this.logger.log('Retrieving project file contents: ' + this.filePath);
        let fileContents = this.inputHandler.getProjectFileContents(this.filePath);
        this.logger.log('Parsing version from project file...');
        let version = this.projectFileParser.getVersion(fileContents);
        this.logger.log('Setting variable with version: ' + version);
        this.variableSetter.setTaskVariables(this.prefix, version, this.setBuildNumber);
        this.logger.log('Work complete!');
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