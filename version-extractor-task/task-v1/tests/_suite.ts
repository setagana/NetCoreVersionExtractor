import { InputHandlerTests } from './application/input-handler/input-handler-tests';
import { ProjectFileParserTests } from './application/project-file-parser/project-file-parser-tests';

describe('Task version 1 tests', function() {
    describe('InputHandler', InputHandlerTests.bind(this));
    describe('ProjectFileParser', ProjectFileParserTests.bind(this));
});