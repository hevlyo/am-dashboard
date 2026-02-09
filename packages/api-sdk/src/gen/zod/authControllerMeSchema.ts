import { z } from "zod";
import { userDtoSchema } from "./userDtoSchema";

 /**
 * @description Dados do usuário
 */
export const authControllerMe200Schema = z.lazy(() => userDtoSchema);
/**
 * @description Dados do usuário
 */
export const authControllerMeQueryResponseSchema = z.lazy(() => userDtoSchema);