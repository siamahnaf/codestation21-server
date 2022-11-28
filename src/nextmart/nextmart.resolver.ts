import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";

//Service
import { NextmartService } from "./nextmart.service";

//Dto
import { NextmartInput } from "./dto/nextmart.dto";

//Entity
import { SuccessInfo } from "./entities/success.entity";


@Resolver()
export class NextmartResolver {
    //Constructor
    constructor(
        private readonly nextmartService: NextmartService
    ) { }

    //Get
    @Query(() => SuccessInfo, { name: "checkNextmartPurchase" })
    get(
        @Args("domain", { type: () => String }) domain: string
    ) {
        return this.nextmartService.get(domain);
    }

    //Verify purchase
    @Mutation(() => SuccessInfo, { name: "verifyNextmartPurchase" })
    verifyPurchase(
        @Args("nextmartInput") nextmartInput: NextmartInput
    ) {
        return this.nextmartService.verifyPurchase(nextmartInput);
    }
}