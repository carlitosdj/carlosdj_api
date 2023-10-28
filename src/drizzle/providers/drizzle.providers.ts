import { FactoryProvider, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { DefaultLogger, LogWriter } from 'drizzle-orm';
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import * as schema from '../../_schemas/schema';
import { DbConfig } from 'src/config';

export const DB = Symbol('DB_SERVICE');
export type DbType = MySql2Database<typeof schema>;

export const DbProvider: FactoryProvider = {
  provide: DB,
  inject: [DbConfig.KEY],
  useFactory: async (dbConfig: ConfigType<typeof DbConfig>) => {
    const logger = new Logger('DB');

    logger.debug('Connecting to Mysql...');

    const connection = await mysql.createConnection({
      host: 'ftp.institutodefelicibus.com.br',
      user: 'wwinst_carlitos',
      password: 'carlosdj123',
      database: 'wwinst_nestjs',
    });

    logger.debug('Connected to Mysql!');

    class CustomDbLogWriter implements LogWriter {
      write(message: string) {
        logger.verbose(message); 
      }
    }

    return drizzle(connection, {
      schema,
      mode: 'default',
      logger: new DefaultLogger({ writer: new CustomDbLogWriter() }),
    });
  },
};
