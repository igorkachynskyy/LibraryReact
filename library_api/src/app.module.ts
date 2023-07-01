import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { AuthenticateController } from './Authentication/authenticate.controller';
import { AuthenticateService } from './Authentication/authenticate.service';
import { AuthenticateModule } from './Authentication/authenticate.module';
import { UserModule } from './User/user.module';
import { User } from './User/user.entity';
import { JwtStrategy } from './Authentication/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { SeasonTicket } from './SeasonTicket/seasonticket.entity';
import { SeasonTicketNodule } from './SeasonTicket/seasonticket.module';
import { PublicationItemModule } from './PublicationItem/publicatiobitem.module';
import { LibraryItemModule } from './LibraryItem/libraryitem.module';
import { PublisherModule } from './Publisher/publisher.module';
import { BookModule } from './Book/book.module';
import { EBookModule } from './EBook/ebook.module';
import { PublicationModule } from './Publication/publication.module';
import { JournalModule } from './Journal/journal.module';
import { TagModule } from './Tag/tag.module';
import { ReviewModule } from './Review/review.module';
import { AuthorModule } from './Author/author.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TypeOrmModule.forFeature([User, SeasonTicket]),
    JwtModule.register({
      secret: process.env.SECRET_KEY as string,
      signOptions: { expiresIn: process.env.EXPIRES_IN as string },
    }),
    AuthenticateModule,
    AuthorModule,
    BookModule,
    EBookModule,
    JournalModule,
    LibraryItemModule,
    PublicationModule,
    PublicationItemModule,
    PublisherModule,
    ReviewModule,
    SeasonTicketNodule,
    TagModule,
    UserModule,
  ],
  controllers: [AuthenticateController],
  providers: [AuthenticateService, JwtStrategy],
})
export class AppModule {}
