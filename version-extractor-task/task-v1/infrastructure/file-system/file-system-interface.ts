export interface FileSystemInterface {
    pathMatchesExactlyOnce(path: string): boolean;
    readFileSync(path: string, ): string;
}