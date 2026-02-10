import { healthControllerGetHealthQueryResponseSchema } from "./healthControllerGetHealthSchema";
import { authControllerLoginMutationResponseSchema, authControllerLogin401Schema } from "./authControllerLoginSchema";
import { authControllerRegisterMutationResponseSchema, authControllerRegister409Schema } from "./authControllerRegisterSchema";
import { authControllerRefreshMutationResponseSchema } from "./authControllerRefreshSchema";
import { authControllerLogoutMutationResponseSchema } from "./authControllerLogoutSchema";
import { authControllerMeQueryResponseSchema } from "./authControllerMeSchema";
import { dashboardControllerGetStatsQueryResponseSchema } from "./dashboardControllerGetStatsSchema";
import { dashboardControllerGetDataQueryResponseSchema } from "./dashboardControllerGetDataSchema";

 export const operations = { "HealthController_getHealth": {
        request: undefined,
        parameters: {
            path: undefined,
            query: undefined,
            header: undefined
        },
        responses: {
            200: healthControllerGetHealthQueryResponseSchema,
            default: healthControllerGetHealthQueryResponseSchema
        },
        errors: {}
    }, "AuthController_login": {
        request: undefined,
        parameters: {
            path: undefined,
            query: undefined,
            header: undefined
        },
        responses: {
            200: authControllerLoginMutationResponseSchema,
            401: authControllerLogin401Schema,
            default: authControllerLoginMutationResponseSchema
        },
        errors: {
            401: authControllerLogin401Schema
        }
    }, "AuthController_register": {
        request: undefined,
        parameters: {
            path: undefined,
            query: undefined,
            header: undefined
        },
        responses: {
            201: authControllerRegisterMutationResponseSchema,
            409: authControllerRegister409Schema,
            default: authControllerRegisterMutationResponseSchema
        },
        errors: {
            409: authControllerRegister409Schema
        }
    }, "AuthController_refresh": {
        request: undefined,
        parameters: {
            path: undefined,
            query: undefined,
            header: undefined
        },
        responses: {
            200: authControllerRefreshMutationResponseSchema,
            default: authControllerRefreshMutationResponseSchema
        },
        errors: {}
    }, "AuthController_logout": {
        request: undefined,
        parameters: {
            path: undefined,
            query: undefined,
            header: undefined
        },
        responses: {
            200: authControllerLogoutMutationResponseSchema,
            default: authControllerLogoutMutationResponseSchema
        },
        errors: {}
    }, "AuthController_me": {
        request: undefined,
        parameters: {
            path: undefined,
            query: undefined,
            header: undefined
        },
        responses: {
            200: authControllerMeQueryResponseSchema,
            default: authControllerMeQueryResponseSchema
        },
        errors: {}
    }, "DashboardController_getStats": {
        request: undefined,
        parameters: {
            path: undefined,
            query: undefined,
            header: undefined
        },
        responses: {
            200: dashboardControllerGetStatsQueryResponseSchema,
            default: dashboardControllerGetStatsQueryResponseSchema
        },
        errors: {}
    }, "DashboardController_getData": {
        request: undefined,
        parameters: {
            path: undefined,
            query: undefined,
            header: undefined
        },
        responses: {
            200: dashboardControllerGetDataQueryResponseSchema,
            default: dashboardControllerGetDataQueryResponseSchema
        },
        errors: {}
    } } as const;
export const paths = { "/health": {
        get: operations["HealthController_getHealth"]
    }, "/auth/login": {
        post: operations["AuthController_login"]
    }, "/auth/register": {
        post: operations["AuthController_register"]
    }, "/auth/refresh": {
        post: operations["AuthController_refresh"]
    }, "/auth/logout": {
        post: operations["AuthController_logout"]
    }, "/auth/me": {
        get: operations["AuthController_me"]
    }, "/dashboard/stats": {
        get: operations["DashboardController_getStats"]
    }, "/dashboard/data": {
        get: operations["DashboardController_getData"]
    } } as const;