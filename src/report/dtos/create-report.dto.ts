import { IsString, IsNumber, Min, Max, isLongitude, isLatitude, IsLongitude, IsLatitude } from 'class-validator'

export class CreateReportDto {

    id: number

    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number;


    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

    @IsNumber()
    @Min(1930)
    @Max(2050)
    year: number

    @IsNumber()
    @IsLongitude()
    lng: number

    @IsNumber()
    @IsLatitude()
    lat: number
}