import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from '../config/typeorm';
import { CategoriesModule } from 'src/categories/categories.module';
import { OrderModule } from 'src/order/order.module';
import { cloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    load: [typeOrmConfig],
  }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(ConfigService: ConfigService) => ConfigService.get('typeorm'),
      }),
  ProductsModule,
  OrderModule,
  UsersModule,
  CategoriesModule,
  AuthModule,
  cloudinaryModule,
  JwtModule.register({global:true, secret: process.env.JWT_SECRET, signOptions:{expiresIn:'24h'}},),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
