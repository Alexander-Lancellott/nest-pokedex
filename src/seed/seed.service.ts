import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';
import { AxiosAdapter } from '../common/adapters/axios.adapter';
import { SeedDto } from './dto/seed.dto';

@Injectable()
export class SeedService {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly http: AxiosAdapter,
  ) {}

  private readonly axios: AxiosInstance = axios;

  async executeSeed(seedDto: SeedDto) {
    const { deleteType = '' } = seedDto;
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const transformedData = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      transformedData.push({ name, no });
    });

    const insertedPokemons = await this.pokemonService.fillPokemonWithSeedData(
      transformedData,
      deleteType,
    );

    return {
      message:
        deleteType.toLocaleLowerCase() === 'hard'
          ? 'Hard seed executed'
          : 'Seed executed',
      insertedPokemons,
    };
  }
}
