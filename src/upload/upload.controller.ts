import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseFilePipeBuilder,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageFileValidator } from './img-file-validator';
import { ApiConsumes } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { SkipAuth } from '../auth/auth.public.decorator';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile(
      // new ParseFilePipeBuilder()
      //   .addFileTypeValidator({
      //     fileType: 'jpeg',
      //   })
      //   .addMaxSizeValidator({
      //     maxSize: 1024 * 1024 * 100,
      //   })
      //   .build({
      //     errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      //   }),
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 100 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|pdf|mp4|zip|rar)' }),
        ],
      }),
      // new ParseFilePipe({
      //   validators: [
      //     new ImageFileValidator({
      //       maxSize: 1024 * 1024 * 100,
      //       mimetype: 'image/jpeg',
      //     }),
      //   ],
      //   errorHttpStatusCode: 422,
      // }),
    )
    file: Express.Multer.File,
  ) {
    console.log("trying to upload file...")
    return this.uploadService.upload(file);
  }

  @SkipAuth()
  @Get('file/:file')
  file(@Param('file') file: string, @Res() res: Response) {
    // console.log('Getting file', file);
    try {
      // console.log('Entrando no try..');
      const fileStream = createReadStream(join(process.cwd(), '../../../../www/files', file));
      //return new StreamableFile(fileStream);
      fileStream.pipe(res);
      fileStream.on('error', (err) => {
        console.log('ERRO...', err);
        //throw new Error('blablala')
        const fileStream = createReadStream(
          join(process.cwd(), '../../../../www/files', 'notfound.jpg'),
        );
        fileStream.pipe(res);
      });
    } catch (error) {
      console.log('ERRO');
    }
  }
}
