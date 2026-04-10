import { lazy } from "react";
import { LayoutDashboard, Users, Package, Tags, Car } from "lucide-react";

export const authRoutes = [
    {
        path: "/login",
        component: lazy(() => import("../features/auth/pages/Login"))
    }
]

export const privateRoutes = [
    {
        path: "/",
        title: "Dashboard",
        icon: LayoutDashboard,
        component: lazy(() => import("../features/dashboard/pages/DashboardPage")),
        roles: ["ADMIN"]

    },
    {
        path: "/users",
        title: "Users",
        icon:Users,
        component: lazy(() => import("../features/users/pages/UsersPage")),
        roles: ["ADMIN", "hr"]

    },
    {
        path: "/products",
        title: "Products",
        icon:Package,
        component: lazy(() => import("../features/products/pages/ProductsPage")),
        roles: ["ADMIN", "hr"]

    },
    {
        path: "/brands",
        title: "Brands",
        icon:Tags,
        component: lazy(() => import("../features/brands/pages/BrandsPage")),
        roles: ["ADMIN", "hr"]

    },
    {
        path: "/models",
        title: "Models",
        icon:Car,
        component: lazy(() => import("../features/models/pages/ModelsPage")),
        roles: ["ADMIN", "hr"]

    }
]