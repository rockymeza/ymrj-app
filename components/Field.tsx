import * as React from "react";
import { useField } from "formik";
import { Box, Input, InputProps, Label } from "@theme-ui/components";

interface FieldProps extends InputProps {
  label: string;
  required?: boolean;
}

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  (
    { id, label, name, type, multiple, required, ...props }: FieldProps,
    ref
  ) => {
    const [field, meta, helpers] = useField({
      name,
      type,
      multiple
    });

    return (
      <Box>
        <Label htmlFor={id}>
          {label}
          {!required && "(optional)"}
        </Label>
        <Input
          {...field}
          {...props}
          id={id}
          type={type}
          name={name}
          multiple={multiple}
          ref={ref}
        />
        {meta.touched && meta.error ? (
          <Box color="error">{meta.error}</Box>
        ) : null}
      </Box>
    );
  }
);

export default Field;
