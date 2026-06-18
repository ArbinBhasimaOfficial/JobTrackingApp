import pkgClient from "@prisma/client";
declare const prisma: import("@prisma/client/runtime/client").DynamicClientExtensionThis<pkgClient.Prisma.TypeMap<import("@prisma/client/runtime/client").InternalArgs & {
    result: {};
    model: {
        $allModels: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "groupBy">>;
        };
        application: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "groupBy">>;
        };
    };
    query: {};
    client: {
        $accelerate: () => {
            invalidate: (input: import("@prisma/extension-accelerate").AccelerateInvalidateInput) => Promise<{
                requestId: string;
            }>;
            invalidateAll: () => Promise<{
                requestId: string;
            }>;
        };
    };
}, {}>, pkgClient.Prisma.TypeMapCb<pkgClient.Prisma.PrismaClientOptions>, {
    result: {};
    model: {
        $allModels: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "groupBy">>;
        };
        application: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/client").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/client").Result<This, ActualArgs, "groupBy">>;
        };
    };
    query: {};
    client: {
        $accelerate: () => {
            invalidate: (input: import("@prisma/extension-accelerate").AccelerateInvalidateInput) => Promise<{
                requestId: string;
            }>;
            invalidateAll: () => Promise<{
                requestId: string;
            }>;
        };
    };
}>;
export declare function connectDB(): Promise<void>;
export default prisma;
//# sourceMappingURL=db.d.ts.map