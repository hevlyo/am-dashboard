import type { UserDto } from "./UserDto";
import type { TokensDto } from "./TokensDto";

 export type AuthResponseDto = {
    /**
     * @type object
    */
    user: UserDto;
    /**
     * @type object
    */
    tokens: TokensDto;
};