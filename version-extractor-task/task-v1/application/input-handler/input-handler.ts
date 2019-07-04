import { InputHandlerConstructor } from "./input-handler-constructor";
import { InputHandlerInterface } from "./input-handler-interface";
import { FileSystemInterface } from "../../infrastructure/file-system/file-system-interface";

const InputHandler: InputHandlerConstructor = class InputHandler implements InputHandlerInterface {
    private fileSystem: FileSystemInterface;

    constructor(fs: FileSystemInterface) {
        this.fileSystem = fs;
    }

    isValidProjectFilePath(path: string): boolean {
        return this.fileSystem.pathMatchesExactlyOnce(path);
    }
        
    isValidPrefix(prefix: string): boolean {
        // An empty string is a valid value for this optional input
        if (prefix === '') {
            return true;
        }
        let validPrefixPattern = new RegExp(/^[0-9a-zA-Z-]{1,25}$/);
        return validPrefixPattern.test(prefix);
    }
}

export { InputHandler };