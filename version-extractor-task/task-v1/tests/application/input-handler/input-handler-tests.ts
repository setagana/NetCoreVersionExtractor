import { expect } from 'chai';
import { InputHandler } from '../../../application/input-handler/input-handler';
import { FileSystemInterface } from '../../../infrastructure/file-system/file-system-interface';

function InputHandlerTests() {
    it('should validate the correct path', () => {
        let mockFileSystem = new MockFileSystem();
        let inputHandler = new InputHandler(mockFileSystem);
        let input = '/mock/file/location.exe';

        inputHandler.isValidProjectFilePath(input);

        expect(mockFileSystem.argument).to.equal(input);
    });

    it('should validate the path if it matches a single file', () => {
        let shouldMatchOnce = true;
        let mockFileSystem = new MockFileSystem(shouldMatchOnce);
        let inputHandler = new InputHandler(mockFileSystem);
        let input = '/mock/file/location.exe';

        let isValidPath = inputHandler.isValidProjectFilePath(input);

        expect(isValidPath).to.equal(true);
    });

    it('should validate prefixes which are an empty string', () => {
        let mockFileSystem = new MockFileSystem();
        let inputHandler = new InputHandler(mockFileSystem);
        let input = '';

        let isValidPrefix = inputHandler.isValidPrefix(input);

        expect(isValidPrefix).to.equal(true);
    });

    it('should validate prefixes containing only alphanumeric characters', () => {
        let mockFileSystem = new MockFileSystem();
        let inputHandler = new InputHandler(mockFileSystem);
        let input = 'Prefix01';

        let isValidPrefix = inputHandler.isValidPrefix(input);

        expect(isValidPrefix).to.equal(true);
    });

    it('should reject prefixes containing invalid characters', () => {
        let mockFileSystem = new MockFileSystem();
        let inputHandler = new InputHandler(mockFileSystem);
        let input = 'Bad;Prefix^';

        let isValidPrefix = inputHandler.isValidPrefix(input);

        expect(isValidPrefix).to.equal(false);
    });

    it('should reject prefixes longer than 25 characters', () => {
        let mockFileSystem = new MockFileSystem();
        let inputHandler = new InputHandler(mockFileSystem);
        let input = 'ReallyLongPrefixxxxxxxxxxx';

        let isValidPrefix = inputHandler.isValidPrefix(input);

        expect(isValidPrefix).to.equal(false);
    });
    
    class MockFileSystem implements FileSystemInterface {
        shouldMatchPath: boolean;
        devOpsAgentFilePath: string;
        fileContents: string;
        argument: string = '';

        constructor(shouldMatch: boolean = true, devOpsPath: string = '', contents: string = '') {
            this.shouldMatchPath = shouldMatch;
            this.devOpsAgentFilePath = devOpsPath;
            this.fileContents = contents;
        }

        pathMatchesExactlyOnce(path: string): boolean {
            this.argument = path;
            return this.shouldMatchPath;
        }

        getDevOpsAgentFilePath(path: string): string {
            this.argument = path;
            return this.devOpsAgentFilePath;
        }

        readFileSync(path: string): string {
            this.argument = path;
            return this.fileContents;
        }
    };
}

export { InputHandlerTests };