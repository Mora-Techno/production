import { t } from "elysia";

export const CreateCheckoutDto = t.Object({
  tier: t.Union([t.Literal("free"), t.Literal("pro"), t.Literal("enterprise")]),
  billingCycle: t.Union([t.Literal("monthly"), t.Literal("yearly")]),
  provider: t.Union([t.Literal("stripe"), t.Literal("xendit")]),
});
