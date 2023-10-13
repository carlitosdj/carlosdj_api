import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './prisma/prisma.module';
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
import { LeademailModule } from './leademail/leademail.module';
import { WppcampModule } from './wppcamp/wppcamp.module';
import { WppgroupModule } from './wppgroup/wppgroup.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    //CategoriesModule,
    PrismaModule,
    //VideosModule,
    //StateModule,
    //CityModule,
    UserModule,
    AuthModule,
    AccessControlModule.forRoles(roles),
    ComponentModule,
    StateModule,
    CityModule,
    ComponentextraModule,
    ComponentavailableModule,
    ComponentcompletedModule,
    LeadModule,
    LeademailModule,
    WppcampModule,
    WppgroupModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
