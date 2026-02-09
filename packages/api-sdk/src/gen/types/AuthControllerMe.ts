import type { UserDto } from "./UserDto";

 /**
 * @description Dados do usuário
*/
export type AuthControllerMe200 = UserDto;
/**
 * @description Dados do usuário
*/
export type AuthControllerMeQueryResponse = UserDto;
export type AuthControllerMeQuery = {
    Response: AuthControllerMeQueryResponse;
};