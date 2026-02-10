import { z } from "zod";
import { authResponseDtoSchema } from "./authResponseDtoSchema";

 /**
 * @description Token renovado com sucesso
 */
export const authControllerRefresh200Schema = z.lazy(() => authResponseDtoSchema);
/**
 * @description Token renovado com sucesso
 */
export const authControllerRefreshMutationResponseSchema = z.lazy(() => authResponseDtoSchema);