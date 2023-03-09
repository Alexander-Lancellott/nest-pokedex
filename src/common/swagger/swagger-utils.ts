import { ApiBodyOptions, ApiParamOptions } from '@nestjs/swagger';
import { createWriteStream } from 'fs';
import { get } from 'http';
import { join } from 'path';

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

export const updateDocs = () => {
  if (true) {
    get(
      `http://localhost:${process.env.PORT}/doc/swagger-ui-bundle.js`,
      function (response) {
        response.pipe(
          createWriteStream(
            join(process.cwd(), 'public/docs/swagger-ui-bundle.js'),
          ),
        );
        console.log(
          `Swagger UI bundle file written to: '/public/docs/swagger-ui-bundle.js'`,
        );
      },
    );

    get(
      `http://localhost:${process.env.PORT}/doc/swagger-ui-init.js`,
      function (response) {
        response.pipe(
          createWriteStream(
            join(process.cwd(), 'public/docs/swagger-ui-bundle.js'),
          ),
        );
        console.log(
          `Swagger UI init file written to: '/public/docs/swagger-ui-init.js'`,
        );
      },
    );

    get(
      `http://localhost:${process.env.PORT}/doc/swagger-ui-standalone-preset.js`,
      function (response) {
        response.pipe(
          createWriteStream(
            join(process.cwd(), 'public/docs/swagger-ui-bundle.js'),
          ),
        );
        console.log(
          `Swagger UI standalone preset file written to: '/public/docs/swagger-ui-standalone-preset.js'`,
        );
      },
    );

    get(
      `http://localhost:${process.env.PORT}/doc/swagger-ui.css`,
      function (response) {
        response.pipe(
          createWriteStream(
            join(process.cwd(), 'public/docs/swagger-ui-bundle.js'),
          ),
        );
        console.log(
          `Swagger UI css file written to: '/public/docs/swagger-ui.css'`,
        );
      },
    );
  }
};
