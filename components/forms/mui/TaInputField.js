import { Box } from "@mui/material";
import { useField } from "@opentf/react-form";
import { TaInput } from "@opentf/react-ta-input";
import { useRef } from "react";

export default function TaInputField({ name, lang, ...otherProps }) {
  const { field } = useField(name);
  const inputRef = useRef();

  return (
    <Box
      lang={lang}
      component={TaInput}
      inputRef={inputRef}
      onChange={field.onChange}
      sx={{ width: { xs: '75%', md: '40%' } }}
    >
      <Box
        component="input"
        ref={inputRef}
        value={field.value}
        placeholder={otherProps.placeholder}
        type={otherProps.type}
        sx={(theme) => ({
          width: '100%',
          padding: '15px',
          borderRadius: '15px',
          border: '1px solid gray',
          outlineColor: theme.palette.primary.light,
        })}
      />
    </Box>
  );
}
