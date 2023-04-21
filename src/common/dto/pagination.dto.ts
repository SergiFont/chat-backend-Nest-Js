import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Type( () => Number)
    limit?: number;

    @IsOptional()
    @Min(0)
    @Type( () => Number)
    offset?: number;
}

/** COMO USARLO:
 * En el controlador del módulo donde queramos aplicar esta paginación, añadimos como parámetro en el GET all 
 * `paginationDto: PaginationDto`, junto a un decorador @Query para que recoja la información necesaria en la request.
 */