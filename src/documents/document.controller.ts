import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
  } from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './document.service';
import { UploadDocumentDto } from './dto/create.documents.dto';
import { multerOptions } from './uploads';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UserRole } from '../enums/UserRole';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
  @Controller('documents')
  export class DocumentsController {
    constructor(
      private readonly documentsService: DocumentsService,
    ) {}
  
    @Post('upload')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
    @Post('upload')
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads/documents',
          filename: (
            req,
            file,
            callback,
          ) => {
            callback(
              null,
              `${Date.now()}-${file.originalname}`,
            );
          },
        }),
      }),
    )
    upload(
      @UploadedFile() file: Express.Multer.File,
      @Body() dto: UploadDocumentDto,
    ) {
      return this.documentsService.upload(
        dto,
        file,
      );
    }
  
    @Get()
    findAll() {
      return this.documentsService.findAll("");
    }
  
    @Get(':ownerType/:ownerId')
    findByOwner(
      @Param('ownerType') ownerType: string,
      @Param('ownerId') ownerId: string,
    ) {
      return this.documentsService.findByOwner(
        ownerType,
        ownerId,
      );
    }
  
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.documentsService.delete(id);
    }
    
  }