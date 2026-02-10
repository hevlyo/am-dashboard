import { userDtoSchema } from "./userDtoSchema";
import { tokensDtoSchema } from "./tokensDtoSchema";
import { z } from "zod";


export const authResponseDtoSchema = z.object({ "user": z.lazy(() => userDtoSchema), "tokens": z.lazy(() => tokensDtoSchema) });