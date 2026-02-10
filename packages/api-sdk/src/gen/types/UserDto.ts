export const userDtoRole = {
    "USER": "USER",
    "ADMIN": "ADMIN"
} as const;
export type UserDtoRole = (typeof userDtoRole)[keyof typeof userDtoRole];
export type UserDto = {
    /**
     * @type string
    */
    id: string;
    /**
     * @type string
    */
    name: string;
    /**
     * @type string
    */
    email: string;
    /**
     * @type string
    */
    role: UserDtoRole;
    /**
     * @type string | undefined
    */
    avatar?: string;
    /**
     * @type string
    */
    createdAt: string;
};