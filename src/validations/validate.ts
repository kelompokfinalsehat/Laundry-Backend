import { ZodType } from "zod";

export type userPayload = {
  sub: string;
};

export function validate<T>(
  schema: ZodType<T>,
  data: unknown,
  useSafeParse: boolean = false,
): T {
  if (useSafeParse) {
    const result = schema.safeParse(data);
    if (!result.success) {
      throw result.error;
    }
    return result.data;
  }
  return schema.parse(data);
}
