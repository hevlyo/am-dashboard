import { z } from "zod";


export const userDtoSchema = z.object({ "id": z.string(), "name": z.string(), "email": z.string(), "role": z.enum(["USER", "ADMIN"]), "avatar": z.string().optional(), "createdAt": z.string() });