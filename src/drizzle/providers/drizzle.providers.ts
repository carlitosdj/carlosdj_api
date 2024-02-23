import { FactoryProvider, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { DefaultLogger, LogWriter } from 'drizzle-orm';
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import * as schema from '../../_schemas/schema';
import { DbConfig } from '../../config';

//export const DB_SERVICE = Symbol('DB_SERVICE');
export const DB_SERVICE = 'DB_SERVICE';
export type DbType = MySql2Database<typeof schema>;

export const DbProvider: FactoryProvider = {
  provide: DB_SERVICE,
  inject: [DbConfig.KEY],
  useFactory: async (dbConfig: ConfigType<typeof DbConfig>) => {
    const logger = new Logger('DB');

    logger.debug('Connecting to Mysql...');

    // const connection = await mysql.createPool({
    //   //host: 'localhost',
    //   host: '0.0.0.0',
    //   database: 'carlos_database',
    //   user: 'root',
    //   password: 'pass',
    //   //port: 3306,
      
    // });
    const connection = await mysql.createPool({
      host: '89.116.186.124',
      database: 'carlosdj_ead_project',
      user: 'carlosdj_adm',
      password: 'carlitosJamaica',
      //port: 3306,
      
    });

    logger.debug('Connected to Mysql!');

    //instantiate the connection
    // connection.connect();
    // connection.destroy();

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
