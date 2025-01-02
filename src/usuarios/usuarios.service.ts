import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {

    constructor(
        @InjectModel(Usuario.name)
        private readonly usuariosModel: Model<Usuario>
    ) {


    }
    async create(createUsuarioDto: CreateUsuarioDto) {
        try {
            return await this.usuariosModel.create(createUsuarioDto);
        } catch (error) {
            this.handleError(error);
        }
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuariosModel.find().exec();
    }

    async findOne(email: string): Promise<Usuario> {
        let usuario: Usuario | null;

        try {
            usuario = await this.usuariosModel.findOne({ email }).exec();
        } catch (error) {
            throw new InternalServerErrorException('Error al buscar el usuario');
        }

        if (!usuario) {
            throw new BadRequestException('No se encontró ningún usuario con el email proporcionado');
        }

        return usuario;
    }

    async update(email: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
        const usuarioBD = await this.findOne(email);
        if (usuarioBD) {
            try {
                return await this.usuariosModel.findOneAndUpdate({ email }, updateUsuarioDto, { new: true }).exec();
            } catch (error) {
                this.handleError(error);
            }
        }
    }

    async remove(email: string): Promise<Usuario> {
        const usuarioBD = await this.findOne(email);
        if (usuarioBD) {
            try {
                return await this.usuariosModel.findOneAndDelete({ email }).exec();
            } catch (error) {
                this.handleError(error);
            }
        }
    }


    private handleError(error: any): void {
        if (error.code === 11000) {
            throw new ConflictException(`Ya existe un usuario con el email ${JSON.stringify(error.keyValue)}`);
        }
        throw new InternalServerErrorException('Error al procesar la solicitud');
    }
}

