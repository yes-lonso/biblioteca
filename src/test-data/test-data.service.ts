import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Libro } from 'src/libros/entities/libro.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {usuarios,libros} from './test-data';


@Injectable()
export class TestDataService {
  
  constructor(
    @InjectModel(Usuario.name)
    private readonly usuariosModel:Model<Usuario>,
 
    @InjectModel(Libro.name)
    private readonly librosModel:Model<Libro>
  ){}
  
  async loadData(): Promise<string> {
    try {
      await this.usuariosModel.deleteMany({});
      await this.librosModel.deleteMany({});      
      await this.usuariosModel.insertMany(usuarios);
      await this.librosModel.insertMany(libros);
      return `Datos cargados...`;
    } catch (error) {
      throw new Error(`Error al cargar los datos: ${error.message}`);
    }
  }

  
}
