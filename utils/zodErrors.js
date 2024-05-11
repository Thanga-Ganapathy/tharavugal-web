import { set } from '@opentf/std';

export default function zodErrors(schema, values) {
  const errors = {};
  const result = schema.safeParse(values);
  if (!result.success) {
    result.error.issues.forEach((i) =>
      set(errors, i.path.join('.'), i.message)
    );
  }
  return errors;
}
