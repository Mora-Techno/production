import { t } from "elysia";

export const RegisterCompanyDto = t.Object({
  companyName: t.String({ minLength: 1, description: "Nama company" }),
  email: t.String({ format: "email", description: "Email leader" }),
  fullName: t.String({ minLength: 1, description: "Nama lengkap leader" }),
  password: t.String({ minLength: 6, description: "Password leader" }),
  tier: t.Optional(
    t.Union([t.Literal("free"), t.Literal("pro"), t.Literal("enterprise")], {
      description: "Tier langganan (default: free)",
    }),
  ),
});

export const CreateAdminDto = t.Object({
  email: t.String({ format: "email", description: "Email admin" }),
  fullName: t.String({ minLength: 1, description: "Nama lengkap admin" }),
  password: t.String({ minLength: 6, description: "Password admin" }),
});

export const UpdateSubscriptionDto = t.Object({
  tier: t.Union([t.Literal("free"), t.Literal("pro"), t.Literal("enterprise")]),
  billingCycle: t.Optional(
    t.Union([t.Literal("monthly"), t.Literal("yearly")]),
  ),
});

export const CompanyParamsDto = t.Object({
  id: t.String({ format: "uuid", description: "ID company" }),
});
