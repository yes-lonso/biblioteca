import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { Libro } from './entities/libro.entity';

@Injectable()
export class LibrosService {

  constructor(
    @InjectModel(Libro.name)
    private readonly librosModel: Model<Libro>
  ) { }

  async create(createLibroDto: CreateLibroDto): Promise<Libro> {
    try {
      const libro = await this.librosModel.create(createLibroDto);
      return libro;      
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`El libro ya existe con ese ISBN ${JSON.stringify(error.keyValue)}`);
      }
      throw new InternalServerErrorException('Error al crear el libro');      
    }
    
  }

  findAll() {
    return `This action returns all libros`;
  }

  async findOne(isbn: string):Promise<boolean> {    
    try {
      const libro = await this.librosModel.findOne({ isbn });
      if (libro) {
        throw new Error('El libro ya existe');
      }
      return false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  update(id: number, updateLibroDto: UpdateLibroDto) {
    return `This action updates a #${id} libro`;
  }

  remove(id: number) {
    return `This action removes a #${id} libro`;
  }
}
