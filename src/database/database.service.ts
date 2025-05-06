import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from './../../prisma/app/generated/prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
    async onModuleInit (){
        await this.$connect()
    }
     
}
