import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
    ) { }

    async create(createLibroDto: CreateLibroDto): Promise<Libro> {
        try {
            return await this.librosModel.create(createLibroDto);
        } catch (error) {
            this.handleError(error);
        }
    }

    async findAll(): Promise<Libro[]> {
        return await this.librosModel.find().exec();
    }

    async findOne(findOneLibroDto: FindOneLibroDto): Promise<Libro> {
        const { isbn, titulo, autor } = findOneLibroDto;

        // Verificar que solo un criterio de búsqueda esté presente
        const criteria = [isbn, titulo, autor].filter(Boolean);
        if (criteria.length !== 1) {
            throw new BadRequestException('Debes proporcionar exactamente un criterio de búsqueda: isbn, titulo o autor');
        }

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
        
        let libro: Libro | null;
        try {
            libro = await this.librosModel.findOne(query).exec();                        
        } catch (error) {
            throw new InternalServerErrorException('Error al buscar el libro');
        }
        if (!libro) {
            throw new BadRequestException('No se encontró ningún libro con los criterios proporcionados');
        }
        return libro;
    }

    async update(isbn: string, updateLibroDto: UpdateLibroDto): Promise<Libro> {

        const libroBD = await this.findOne({isbn});
        if (libroBD) {
            try {
                return await this.librosModel.findOneAndUpdate({ isbn }, updateLibroDto, { new: true }).exec();
            } catch (error) {
                this.handleError(error);      
            }
        } 
    }

    async remove(isbn: string): Promise<Libro> {

        const libroBD = await this.findOne({isbn});
        if (libroBD) {
            try {
                return await this.librosModel.findOneAndDelete({ isbn }).exec();
            } catch (error) {
                this.handleError(error);
            }
        } 
    }

    private handleError(error: any): void {
        if (error.code === 11000) {
            throw new ConflictException(`Ya existe un libro con el ISBN ${JSON.stringify(error.keyValue)}`);
        }
        console.log(error);
        throw new InternalServerErrorException('Error al procesar la solicitud');
    }
}
