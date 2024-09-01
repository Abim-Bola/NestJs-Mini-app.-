import { IsString, IsNumber, Min, Max, isLongitude, isLatitude, IsLongitude, IsLatitude } from 'class-validator'
import { Transform } from 'class-transformer'

export class GetEstimateDto {

    id: number

    @IsString()
    make: string;


    @IsString()
    model: string;

    // We need to transform the value especially when passing it as a query string. This is because nest does not do this by default.
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(1930)
    @Max(2050)
    year: number

    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    @IsLongitude()
    lng: number

    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    @IsLatitude()
    lat: number

}