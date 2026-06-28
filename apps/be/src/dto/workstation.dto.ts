import { t } from "elysia";

export const CreateWorkstationDto = t.Object({
  name: t.String({ minLength: 1, description: "Nama workstation" }),
});

export const UpdateWorkstationDto = t.Object({
  name: t.Optional(t.String({ minLength: 1, description: "Nama workstation" })),
});

export const WorkstationParamsDto = t.Object({
  id: t.String({ format: "uuid", description: "ID workstation" }),
});

export const InviteMemberDto = t.Object({
  email: t.String({ format: "email", description: "Email karyawan" }),
  fullName: t.String({ minLength: 1, description: "Nama lengkap karyawan" }),
  password: t.String({ minLength: 6, description: "Password karyawan" }),
  role: t.Optional(
    t.Union([t.Literal("admin"), t.Literal("member")], {
      description: "Role di workstation (default: member)",
    }),
  ),
});

export const MemberParamsDto = t.Object({
  id: t.String({ format: "uuid", description: "ID workstation" }),
  userId: t.String({ format: "uuid", description: "ID user anggota" }),
});
