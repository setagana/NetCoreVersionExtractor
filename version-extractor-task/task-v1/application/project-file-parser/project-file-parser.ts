import parser = require('fast-xml-parser');
import get = require('lodash/get');
import has = require('lodash/has');
import { ProjectFileParserInterface } from './project-file-parser-interface';


export class ProjectFileParser implements ProjectFileParserInterface {

    readonly versionElementTag = 'Version';
    readonly propertyGroupElementPath = 'Project.PropertyGroup';
    readonly versionElementPath = this.propertyGroupElementPath + '.' + this.versionElementTag;

    getVersion(fileContents: string): string {
        let parserValidationResult = parser.validate(fileContents);
        if (has(parserValidationResult, 'err')) {
            throw new Error('The selected file does not appear to be valid XML.');
        }

        let fileObj = parser.parse(fileContents, { ignoreAttributes: true });
        
        if(!this.fileIsValidNetCoreProject(fileObj))
        {
            throw new Error('The selected file does not appear to be a .NET Core / Standard 2.0+ csproj file.');
        }

        let version = this.parseVersionFromFile(fileObj);
        
        if (!version) {
            throw new Error('No <Version> element was found in the selected csproj file.');
        }

        return version;
    }

    private fileIsValidNetCoreProject(fileObj: any): boolean {
        return has(fileObj, this.propertyGroupElementPath);
    }

    private parseVersionFromFile(fileObj: any): string {
        // Get the PropertyGroup property from the fileObj, which could be an array of objects or a single object
        let fileObjectPropertyGroup = get(fileObj, this.propertyGroupElementPath);
        
        // If the PropertyGroup property is an array, search each one for a Version property
        if (fileObjectPropertyGroup instanceof Array) {
            let version = '';
            fileObjectPropertyGroup.forEach((propertyGroup: any) => {
                if (has(propertyGroup, this.versionElementTag)) {
                    version = get(propertyGroup, this.versionElementTag);
                }
            });
            return version;
        }

        // If we haven't returned a value yet, the PropertyGroup property on the fileObj is itself a single object, and we get the Version from there
        return get(fileObj, this.versionElementPath, '');
    }
}