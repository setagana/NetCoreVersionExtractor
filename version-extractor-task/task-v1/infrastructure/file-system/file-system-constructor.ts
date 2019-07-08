import { FileSystemInterface } from './file-system-interface';

export interface FileSystemConstructor {
    new () : FileSystemInterface;
}