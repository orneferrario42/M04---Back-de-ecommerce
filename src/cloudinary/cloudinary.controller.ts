import { Controller, Post, UseInterceptors, Param, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseGuards } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { cloudinaryService} from "../cloudinary/cloudinary.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { UploadImageProductDto } from "src/dto/cloudinary.dto";


@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Update Image Product')
@Controller('files')
export class cloudinaryController {
constructor(private readonly cloudinaryService: cloudinaryService) {}


@Post('uploadImage/:id')
@UseInterceptors(FileInterceptor('imgUrl'))
@ApiConsumes('multipart/form-data')
@ApiBody({type: UploadImageProductDto})
async uploadImagen(@Param('id') id: string,@UploadedFile(new ParseFilePipe({
            validators:[new MaxFileSizeValidator({maxSize:200000,
                message: 'Supera el peso maximo permitido'}),
                new FileTypeValidator({
            fileType:/(jpg|jpeg|png|webp|svg)/,}),],}),) 
    file: Express.Multer.File,
) {
    return this.cloudinaryService.uploadImage(file, id);
}
}