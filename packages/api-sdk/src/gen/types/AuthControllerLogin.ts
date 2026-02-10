import type { AuthResponseDto } from "./AuthResponseDto";

 /**
 * @description Login realizado com sucesso
*/
export type AuthControllerLogin200 = AuthResponseDto;
/**
 * @description Credenciais inválidas
*/
export type AuthControllerLogin401 = any;
/**
 * @description Login realizado com sucesso
*/
export type AuthControllerLoginMutationResponse = AuthResponseDto;
export type AuthControllerLoginMutation = {
    Response: AuthControllerLoginMutationResponse;
    Errors: AuthControllerLogin401;
};