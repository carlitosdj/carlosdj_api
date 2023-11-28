import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  async upload(file: Express.Multer.File) {
    // console.log("File", file)
    return file;
  }
}
