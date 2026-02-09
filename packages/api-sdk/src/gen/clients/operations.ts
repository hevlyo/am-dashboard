export const operations = {
    "HealthController_getHealth": {
        "path": "/health",
        "method": "get"
    },
    "AuthController_login": {
        "path": "/auth/login",
        "method": "post"
    },
    "AuthController_register": {
        "path": "/auth/register",
        "method": "post"
    },
    "AuthController_refresh": {
        "path": "/auth/refresh",
        "method": "post"
    },
    "AuthController_logout": {
        "path": "/auth/logout",
        "method": "post"
    },
    "AuthController_me": {
        "path": "/auth/me",
        "method": "get"
    },
    "DashboardController_getStats": {
        "path": "/dashboard/stats",
        "method": "get"
    },
    "DashboardController_getData": {
        "path": "/dashboard/data",
        "method": "get"
    }
} as const;