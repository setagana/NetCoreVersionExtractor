import { InputHandlerInterface } from "./input-handler-interface";
import { FileSystemInterface } from "../../infrastructure/file-system/file-system-interface";

export interface InputHandlerConstructor {
    new (fileSystem: FileSystemInterface) : InputHandlerInterface;
}