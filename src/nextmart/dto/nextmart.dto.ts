import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class NextmartInput {
    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    purchaseCode: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    domain: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    ip: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    city: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    region: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    latitude: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    longitude: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    country: string;
}