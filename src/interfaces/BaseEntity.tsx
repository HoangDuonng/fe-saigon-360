interface BaseEntity {
    id: string;
    name: string;
    created_at?: Date;
    updated_at?: Date;
    created_by?: string;
    updated_by?: string;
}