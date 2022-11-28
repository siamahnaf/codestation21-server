import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HttpModule } from "@nestjs/axios";

//Service and Resolver
import { NextmartService } from "./nextmart.service";
import { NextmartResolver } from "./nextmart.resolver";

//Schema
import { Nextmart, NextmartSchema } from "./model/nextmart.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Nextmart.name,
            schema: NextmartSchema
        }]),
        HttpModule,
    ],
    providers: [NextmartService, NextmartResolver]
})
export class NextmartModule { }