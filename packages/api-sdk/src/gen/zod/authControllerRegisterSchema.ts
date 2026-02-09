import { z } from "zod";
import { authResponseDtoSchema } from "./authResponseDtoSchema";

 /**
 * @description Usuário criado com sucesso
 */
export const authControllerRegister201Schema = z.lazy(() => authResponseDtoSchema);
/**
 * @description Email já cadastrado
 */
export const authControllerRegister409Schema = z.any();
/**
 * @description Usuário criado com sucesso
 */
export const authControllerRegisterMutationResponseSchema = z.lazy(() => authResponseDtoSchema);