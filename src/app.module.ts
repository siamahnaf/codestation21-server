import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { MongooseModule } from '@nestjs/mongoose';

//Path
import { join } from "path";

//Using Apollo Studio
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

//Modules
import { NextmartModule } from "./nextmart/nextmart.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      persistedQueries: false,
      path: "codestation21",
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    NextmartModule
  ]
})
export class AppModule { }
