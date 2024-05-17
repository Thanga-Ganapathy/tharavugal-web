import APIClient from "@/utils/APIClient";
import Form from "./Form";
import useAlert from "@/hooks/useAlert";
import { eventCategoriesSchema } from "@/schema";

export default function Edit({ record }) {
  const initialValues = {
    ...record,
  };
  const showAlert = useAlert();

  const handleSubmit = async (values) => {
    const result = await APIClient.post(
      "/api/admin/event-categories",
      eventCategoriesSchema.safeParse(values).data,
      true
    );
    if (result.ok) {
      showAlert("success", result.data.message);
    } else {
      showAlert("error", result.data ? result.data.message : "Failed!");
    }
  };

  return <Form initialValues={initialValues} onSubmit={handleSubmit} update />;
}
