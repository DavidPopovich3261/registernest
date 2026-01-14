import { IsString } from "class-validator";

export class Userdto {

    @IsString()
    username:string
    password:string
}