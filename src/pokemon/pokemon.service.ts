import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PagintionDto } from '../common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  private defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = configService.get('DEFAULT_LIMIT');
  }

  private formatJsonStringify(value: string) {
    const unquoted = value.replace(/"([^"]+)":/g, '$1: ');
    return unquoted.replace(/\"/g, `'`);
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      const keyValue = JSON.stringify(error.keyValue);
      throw new BadRequestException(
        `Pokemon exist in DB ${this.formatJsonStringify(keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Unexpected error - Check server logs`,
    );
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(pagintionDto: PagintionDto) {
    const { limit = this.defaultLimit, page = 1 } = pagintionDto;
    const pokemons = await this.pokemonModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ no: 1 })
      .select('-__v');

    const total = await this.pokemonModel.estimatedDocumentCount();
    const totalPages = Math.ceil(total / limit);

    return {
      total,
      totalPages,
      page,
      pokemons,
    };
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    } else if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    } else {
      pokemon = await this.pokemonModel.findOne({ name: term });
    }

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, name or no '${term}' not found`,
      );

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
    //or
    /*const updatePokemon = await this.pokemonModel.findByIdAndUpdate(
      pokemon._id,
      updatePokemonDto,
      { new: true },
    );
    return updatePokemon
    */
  }

  async remove(id: string) {
    //const pokemon = await this.findOne(id);
    //await pokemon.deleteOne();
    const result = await this.pokemonModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Pokemon with id '${id}' not found`);
    }

    return result;
  }

  async fillPokemonWithSeedData(pokemons: Pokemon[], deleteType: string) {
    try {
      if (deleteType.toLowerCase() === 'hard') {
        await this.pokemonModel.deleteMany({});
      } else {
        const names = [];
        pokemons.forEach(({ name }) => names.push(name));
        await this.pokemonModel.deleteMany({ name: { $in: names } });
      }
      const result = await this.pokemonModel.insertMany(pokemons);
      return result;
    } catch (error) {
      this.handleExceptions(error);
    }
  }
}
