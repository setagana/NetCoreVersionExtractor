export interface InputHandlerInterface {
    isValidProjectFilePath(path: string): boolean;
    isValidPrefix(prefix: string): boolean;
}