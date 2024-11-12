import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import storage = require('../util/cloud_storage');

@Injectable()
export class UsersService {
   
    constructor(
@InjectRepository(User) private userRepository: Repository<User>
){}

create(user: CreateUserDto) {
    // Validar que se pasaron todos los campos requeridos
    if (!user.name || !user.lastname || !user.phone || !user.fechaNacimiento || !user.dni) {
        throw new HttpException('Todos los campos son obligatorios', HttpStatus.BAD_REQUEST);
    }

    console.log('Datos del nuevo usuario:', user);

    // Crear el nuevo usuario
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
}


findAll() {
    return this.userRepository.find({ relations: ['roles'] });
}

async update(id: number, user: UpdateUserDto) {
    const userFound = await this.userRepository.findOneBy({id: id});

    if (!userFound) {
        throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }

    console.log('User:', user);
    

    const updatedUser = Object.assign(userFound, user);
    return this.userRepository.save(updatedUser);
}

async updateWithImage(file: Express.Multer.File, id: number, user: UpdateUserDto) {
    const url = await storage(file, file.originalname);
    console.log('URL: ' + url);
    console.log('UserURL: ', user);
    
    if (url === undefined && url === null) {
        throw new HttpException('La imagen no se pudo guardar', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const userFound = await this.userRepository.findOneBy({id: id});

    if (!userFound) {
        throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }
    user.image = url;
    const updatedUser = Object.assign(userFound, user);
    return this.userRepository.save(updatedUser);
}

}
