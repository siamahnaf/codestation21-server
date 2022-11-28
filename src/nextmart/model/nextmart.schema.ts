import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type NextmartDocument = Document & Nextmart;

@Schema({ timestamps: true })
export class Nextmart {
    @Prop({ type: String, required: true })
    purchaseCode: string;
    @Prop({ type: String, required: true })
    domain: string;
    @Prop({ type: String })
    ip: string;
    @Prop({ type: String })
    city: string;
    @Prop({ type: String })
    region: string;
    @Prop({ type: String })
    latitude: string;
    @Prop({ type: String })
    longitude: string;
    @Prop({ type: String })
    country: string;
    @Prop({ type: Date })
    supportedUntil: Date;
    @Prop({ type: Number })
    itemId: number;
    @Prop({ type: String })
    itemName: string;
    @Prop({ type: String })
    buyer: string;
}

export const NextmartSchema = SchemaFactory.createForClass(Nextmart);