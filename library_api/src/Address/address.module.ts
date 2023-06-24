import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//controller
import { Address } from './address.entity';
import { AddressService } from './address.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [],
  providers: [AddressService],
})
export class AddressModule {}
