export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3002,
  // This is unnecessary, but it is done to test how to introduce ENV inside a module or service.
  defaultLimit: process.env.DEFAULT_LIMIT || 10,
});
