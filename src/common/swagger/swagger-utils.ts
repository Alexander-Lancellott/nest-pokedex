import { ApiBodyOptions, ApiParamOptions } from '@nestjs/swagger';

export const termParamDefinition: ApiParamOptions = {
  description: `Can be 'id', 'name' or 'no'`,
  name: 'term',
};

export const pokemonBodyExample = (type: any) => {
  const example: ApiBodyOptions = {
    examples: {
      Bulbasaur: { value: { no: 1, name: 'bulbasaur' } },
      Pikachu: { value: { no: 25, name: 'pikachu' } },
    },
    type,
  };
  return example;
};
