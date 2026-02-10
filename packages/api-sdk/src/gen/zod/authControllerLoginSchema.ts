import { z } from "zod";
import { authResponseDtoSchema } from "./authResponseDtoSchema";

 /**
 * @description Login realizado com sucesso
 */
export const authControllerLogin200Schema = z.lazy(() => authResponseDtoSchema);
/**
 * @description Credenciais inválidas
 */
export const authControllerLogin401Schema = z.any();
/**
 * @description Login realizado com sucesso
 */
export const authControllerLoginMutationResponseSchema = z.lazy(() => authResponseDtoSchema);