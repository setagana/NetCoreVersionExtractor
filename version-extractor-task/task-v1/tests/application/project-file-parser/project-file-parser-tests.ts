import { expect } from 'chai';
import { ProjectFileParser } from '../../../application/project-file-parser/project-file-parser';

function ProjectFileParserTests() {
    it('should throw if the fileContents are not valid XML', () => {
        let projectFileParser = new ProjectFileParser();
        let input = 'Not valid XML';

        expect(projectFileParser.getVersion.bind(projectFileParser, input)).to.throw('The selected file does not appear to be valid XML.');
    });

    it('should throw if the fileContents are not a .NET Core / Standard 2.0+ csproj file', () => {
        let projectFileParser = new ProjectFileParser();
        let input = '<root>Hello world!</root>';

        expect(projectFileParser.getVersion.bind(projectFileParser, input)).to.throw('The selected file does not appear to be a .NET Core / Standard 2.0+ csproj file.');
    });

    it('should throw if the fileContents do not contain a Version element', () => {
        let projectFileParser = new ProjectFileParser();
        let input = '<Project><PropertyGroup><TargetFramework>netstandard2.0</TargetFramework></PropertyGroup></Project>';

        expect(projectFileParser.getVersion.bind(projectFileParser, input)).to.throw('No <Version> element was found in the selected csproj file.');
    });

    it('should return the value of the Version element if it is in the document' , () => {
        let projectFileParser = new ProjectFileParser();
        let input = '<Project><PropertyGroup><Version>3.6.2</Version></PropertyGroup></Project>';

        let result = projectFileParser.getVersion(input);

        expect(result).to.equal('3.6.2');
    });

    it('should return the value of the Version element even if there are multiple PropertyGroups' , () => {
        let projectFileParser = new ProjectFileParser();
        let input = '<Project><PropertyGroup><TargetFramework>netstandard2.0</TargetFramework></PropertyGroup><PropertyGroup><Version>3.6.2</Version></PropertyGroup></Project>';

        let result = projectFileParser.getVersion(input);

        expect(result).to.equal('3.6.2');
    });
}

export { ProjectFileParserTests };