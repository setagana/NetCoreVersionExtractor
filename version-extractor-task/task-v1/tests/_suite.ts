import { InputHandlerTests } from './application/input-handler/input-handler-tests';
import { ProjectFileParserTests } from './application/project-file-parser/project-file-parser-tests';
import { VariableSetterTests } from './application/variable-setter/variable-setter-tests';

describe('Task version 1 tests', function() {
    describe('InputHandler', InputHandlerTests.bind(this));
    describe('ProjectFileParser', ProjectFileParserTests.bind(this));
    describe('VariableSetter', VariableSetterTests.bind(this));
});