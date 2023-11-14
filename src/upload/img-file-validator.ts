import { FileValidator } from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';

export class ImageFileValidator extends FileValidator {
  isValid(file?: IFile): boolean | Promise<boolean> {
    //console.log('IsValid', file);
    //console.log(file, this.validationOptions);
    return (
      file.mimetype === this.validationOptions.mimetype &&
      file.size < this.validationOptions.maxSize
    );
  }

  buildErrorMessage(file: any): string {
    if (!file) {
      return 'File is required';
    }
    if (file.mimetype !== this.validationOptions.mimetype) {
      return `File must be ${this.validationOptions.mimetype}`;
    }
    if (file.size > this.validationOptions.maxSize) {
      return `File must be smaller than ${this.validationOptions.maxSize}`;
    }
  }
}
