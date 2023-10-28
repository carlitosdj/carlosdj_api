import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { CategoriesModule } from './categories/categories.module';
//import { PrismaModule } from './prisma/prisma.module';
//import { VideosModule } from './videos/videos.module';
//import { StateModule } from './state/state.module';
//import { CityModule } from './city/city.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './auth/user.roles';
import { ComponentModule } from './component/component.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { ComponentextraModule } from './componentextra/componentextra.module';
import { ComponentavailableModule } from './componentavailable/componentavailable.module';
import { ComponentcompletedModule } from './componentcompleted/componentcompleted.module';
import { LeadModule } from './lead/lead.module';
import { WppcampModule } from './wppcamp/wppcamp.module';
import { WppgroupModule } from './wppgroup/wppgroup.module';
import { PaymentModule } from './payment/payment.module';
import { MassmailModule } from './massmail/massmail.module';
import { MailModule } from './mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerMiddleware } from './logger.middleware';
import { ComponentController } from './component/component.controller';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { DbConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [DbConfig],
    }),
    DrizzleModule,
    //PrismaModule,
    //CategoriesModule,
    //VideosModule,
    //StateModule,
    //CityModule,


    UserModule,
    AuthModule,
    AccessControlModule.forRoles(roles),
    ComponentModule,
    ComponentextraModule,
    LeadModule,
    
    // StateModule,
    // CityModule,
    // ComponentavailableModule,
    // ComponentcompletedModule,
    
    // WppcampModule,
    // WppgroupModule,
    // PaymentModule,
    // MassmailModule,
    // MailModule,

    ScheduleModule.forRoot(),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
    .forRoutes(ComponentController)
  }
}
