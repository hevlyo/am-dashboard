import { z } from "zod";


export const tokensDtoSchema = z.object({ "accessToken": z.string(), "refreshToken": z.string() });