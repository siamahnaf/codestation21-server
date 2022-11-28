export interface EnvatoResponse {
    amount: string;
    sold_at: Date;
    license: string;
    support_amount: string;
    supported_until: Date;
    item: {
        id: number;
        name: string;
        description: string;
        author_username: string;
        updated_at: Date,
        site: string;
        price_cents: number;
        published_at: Date;
    },
    buyer: string;
    purchase_count: number;
}
export interface EnvatoError {
    error: number;
    description: string;
}