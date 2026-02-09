import type { AuthResponseDto } from "./AuthResponseDto";

 /**
 * @description Usuário criado com sucesso
*/
export type AuthControllerRegister201 = AuthResponseDto;
/**
 * @description Email já cadastrado
*/
export type AuthControllerRegister409 = any;
/**
 * @description Usuário criado com sucesso
*/
export type AuthControllerRegisterMutationResponse = AuthResponseDto;
export type AuthControllerRegisterMutation = {
    Response: AuthControllerRegisterMutationResponse;
    Errors: AuthControllerRegister409;
};