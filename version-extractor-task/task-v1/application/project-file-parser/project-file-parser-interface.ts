export interface ProjectFileParserInterface {
    getVersion(fileContents: string): string;
}