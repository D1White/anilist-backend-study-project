import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '2h' },
    };
  },
};
