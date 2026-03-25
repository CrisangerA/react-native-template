import Config from 'react-native-config';

export type ServiceProvider = 'http' | 'firebase' | 'mock';

interface Config {
  SERVICE_PROVIDER: ServiceProvider;
  ROOT_CREDENTIALS: {
    USERNAME: string;
    PASSWORD: string;
  };
}

const SERVICE_PROVIDER = Config.SERVICE_PROVIDER as ServiceProvider;

export const CONFIG: Config = {
  SERVICE_PROVIDER: SERVICE_PROVIDER || 'firebase',
  ROOT_CREDENTIALS: {
    // Root credentials for mock service
    USERNAME: 'user@example.com',
    PASSWORD: 'example123',
  },
};
