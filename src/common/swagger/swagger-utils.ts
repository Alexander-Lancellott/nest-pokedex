import { ApiBodyOptions, ApiParamOptions } from '@nestjs/swagger';
import { createWriteStream } from 'fs';
import { get } from 'http';

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

export const updateDoc = (trigger: boolean, port: number) => {
  if (trigger) {
    get(
      `http://localhost:${port}/doc/swagger-ui-bundle.js`,
      function (response) {
        response.pipe(createWriteStream('public/doc/swagger-ui-bundle.js'));
        console.log(
          `Swagger UI bundle file written to: '/public/doc/swagger-ui-bundle.js'`,
        );
      },
    );

    get(`http://localhost:${port}/doc/swagger-ui-init.js`, function (response) {
      response.pipe(createWriteStream('public/doc/swagger-ui-init.js'));
      console.log(
        `Swagger UI init file written to: '/public/doc/swagger-ui-init.js'`,
      );
    });

    get(
      `http://localhost:${port}/doc/swagger-ui-standalone-preset.js`,
      function (response) {
        response.pipe(
          createWriteStream('public/doc/swagger-ui-standalone-preset.js'),
        );
        console.log(
          `Swagger UI standalone preset file written to: '/public/doc/swagger-ui-standalone-preset.js'`,
        );
      },
    );

    get(`http://localhost:${port}/doc/swagger-ui.css`, function (response) {
      response.pipe(createWriteStream('public/doc/swagger-ui.css'));
      console.log(
        `Swagger UI css file written to: '/public/doc/swagger-ui.css'`,
      );
    });
  }
};
