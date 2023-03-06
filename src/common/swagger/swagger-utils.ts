import { ApiBodyOptions, ApiParamOptions } from '@nestjs/swagger';

export const termParamDefinition: ApiParamOptions = {
  description: `Can be 'id', 'name' or 'no'`,
  name: 'term',
};

export const pokemonBodyExample = (type: any) => {
  const example: ApiBodyOptions = {
    examples: {
      Bulbasaur: { value: { name: 'bulbasaur', no: 1 } },
      Pikachu: { value: { name: 'pikachu', no: 25 } },
    },
    type,
  };
  return example;
};
