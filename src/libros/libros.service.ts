import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { Libro } from './entities/libro.entity';
import { FindOneLibroDto } from './dto/findone-libro.dto';

@Injectable()
export class LibrosService {
  constructor(
    @InjectModel(Libro.name)
    private readonly librosModel: Model<Libro>
  ) {}

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
    return this.librosModel.find().exec();
  }

  async findOne(findOneLibroDto: FindOneLibroDto): Promise<Libro> {
    const { isbn, titulo, autor } = findOneLibroDto;

    // Verificar que solo un criterio de búsqueda esté presente
    const criteria = [isbn, titulo, autor].filter(Boolean);
    if (criteria.length !== 1) {
      throw new BadRequestException('Debes proporcionar exactamente un criterio de búsqueda: isbn, titulo o autor');
    }

    try {
      const query: any = {};

      if (isbn) {
        query['isbn'] = isbn;
      }

      if (titulo) {
        query['titulo'] = { $regex: titulo, $options: 'i' };
      }

      if (autor) {
        query['autor'] = { $regex: autor, $options: 'i' };
      }

      const libro = await this.librosModel.findOne(query).exec();
      if (!libro) {
        throw new BadRequestException('No se encontró ningún libro con los criterios proporcionados');
      }
      return libro;
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar el libro');
    }
  }

  async findById(id: string): Promise<Libro> {
    return this.librosModel.findById(id).exec();
  }

  update(id: number, updateLibroDto: UpdateLibroDto) {
    return `This action updates a #${id} libro`;
  }

  remove(id: number) {
    return `This action removes a #${id} libro`;
  }
}
