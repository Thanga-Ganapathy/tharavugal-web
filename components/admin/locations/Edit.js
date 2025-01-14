import APIClient from "@/utils/APIClient";
import Form from "./Form";
import useAlert from "@/hooks/useAlert";
import { eventLocationsSchema } from "@/schema";
import { useEffect } from "react";
import { useState } from "react";

export default function Edit({ record }) {
  const [loading, setLoading] = useState('true')
  const [location, setLocation] = useState(null)

  useEffect(() => {
    fetchRecord()
  }, [])

  const fetchRecord = async () => {
    try {
      const res = await APIClient.get(
        "/api/admin/locations/" + record.id,
      );
  
      const loc = {...res.data, parentId: res.data.parent}
      
      setLocation(loc)
      setLoading(false)
    } catch (error) {
      console.log(error);      
    }    
  }

  const showAlert = useAlert();

  const handleSubmit = async (values) => {
    const result = await APIClient.post(
      "/api/admin/event-locations",
      eventLocationsSchema.safeParse(values).data,
      true
    );
    if (result.ok) {
      showAlert("success", result.data.message);
    } else {
      showAlert("error", result.data ? result.data.message : "Failed!");
    }
  };

  if (loading) {
    return 'Loading...'
  }

  return <Form initialValues={location} onSubmit={handleSubmit} update />;
}
