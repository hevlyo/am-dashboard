import type { AuthResponseDto } from "./AuthResponseDto";

 /**
 * @description Token renovado com sucesso
*/
export type AuthControllerRefresh200 = AuthResponseDto;
/**
 * @description Token renovado com sucesso
*/
export type AuthControllerRefreshMutationResponse = AuthResponseDto;
export type AuthControllerRefreshMutation = {
    Response: AuthControllerRefreshMutationResponse;
};