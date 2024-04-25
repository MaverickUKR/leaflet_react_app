import { useField } from "formik";
import { PatternFormat } from "react-number-format";
import { TextField } from "@mui/material";

const TelephoneField = (props) => {
  const [field, meta, helpers] = useField("mobile");

  const handleChange = (event) => {
    field.onChange(event);
    helpers.setValue(event.target.value);
  };

  return (
    <PatternFormat
      fullWidth
      customInput={TextField}
      variant="standard"
      format="+38 (###) ###-##-##"
      mask="_"
      allowEmptyFormatting
      {...field}
      {...props}
      onChange={handleChange}
      label="Номер телефону *"
      error={!!meta.touched && !!meta.error}
      helperText={meta.touched && meta.error ? meta.error : ""}
    />
  );
};

export default TelephoneField;
