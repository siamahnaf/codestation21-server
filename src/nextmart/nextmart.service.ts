import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from "axios";

//Schema
import { Nextmart, NextmartDocument } from "./model/nextmart.schema";

//Dto
import { NextmartInput } from "./dto/nextmart.dto";

//Entity
import { SuccessInfo } from "./entities/success.entity";

//Types import
import { EnvatoResponse, EnvatoError } from "./types/envato.types";


@Injectable()
export class NextmartService {
    //constructor
    constructor(
        @InjectModel(Nextmart.name) private nextmartModel: Model<NextmartDocument>,
        private readonly httpService: HttpService
    ) { }

    //Get
    async get(domain: string): Promise<SuccessInfo> {
        const nextmart = await this.nextmartModel.findOne({
            domain: domain
        });
        if (!nextmart) {
            return {
                success: false,
                message: "Domain is not verified!"
            }
        }
        return {
            success: true,
            message: "Domain is verified!"
        }
    }

    //Verify nextmart purchase
    async verifyPurchase(nextmartInput: NextmartInput): Promise<SuccessInfo> {
        const nextmart = await this.nextmartModel.findOne({
            purchaseCode: nextmartInput.purchaseCode,
            domain: nextmartInput.domain
        });
        const { data } = await firstValueFrom(
            this.httpService.get<EnvatoResponse>(process.env.ENVATO_CODE_VERIFY_URL + nextmartInput.purchaseCode, {
                headers: {
                    'Authorization': `Bearer ${process.env.ENVATO_ACCESS_TOKEN}`
                }
            }).pipe(
                catchError((error: AxiosError<EnvatoError>) => {
                    throw new NotFoundException(error.response.data.description);
                })
            )
        );
        if (!nextmart) {
            await this.nextmartModel.create({
                ...nextmartInput,
                supportedUntil: data.supported_until,
                itemId: data.item.id,
                itemName: data.item.name,
                buyer: data.buyer
            })
        }
        return {
            success: true,
            message: "Purchase code verified successfully!"
        }
    }
}