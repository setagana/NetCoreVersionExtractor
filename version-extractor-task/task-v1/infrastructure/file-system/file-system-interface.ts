export interface FileSystemInterface {
    pathMatchesExactlyOnce(path: string): boolean;
    getDevOpsAgentFilePath(path: string): string;
    readFileSync(path: string, ): string;
}