import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";
import TelephoneField from "./TelephoneField";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MiniMapComponent from "./MiniMapComponent/MiniMapComponent";
import "./AddNewAnnouncement.css";

const AnnouncementSchema = Yup.object().shape({
  announcement: Yup.string().min(3).required("Введіть назву оголошення"),
  description: Yup.string().min(3).required("Детальний опис квартири"),
  price: Yup.number().min(3).required("Введіть ціну оренди квартири в гривні"),
  firstName: Yup.string().min(3).required("Введіть своє ім'я"),
  lastName: Yup.string().min(3).required("Введіть своє прізвище"),
  mobile: Yup.string()
    .matches(
      /^(\+38)?\s?\(?\d{3}\)?\s?\d{3}(-|\s)?\d{2}(-|\s)?\d{2}$/,
      "Неправильний номер телефону"
    )
    .required("Введіть свій номер телефону"),
  email: Yup.string()
    .email("Неправильний e-mail")
    .required("Введіть свій e-mail"),
  imgUrl: Yup.string().min(3),
});

const AddNewAnnouncement = () => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setOpen(true);
    setTimeout(() => {
      navigate("/");
    }, 2500);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setAge(e.target.value);
  };
  return (
    <div>
      <Formik
        initialValues={{
          category: "Оренда квартири",
          announcement: "",
          description: "",
          price: "",
          firstName: "",
          lastName: "",
          mobile: "",
          email: "",
          imgUrl: "",
          objectLocation: "",
        }}
        validationSchema={AnnouncementSchema}
        onSubmit={(values, { setSubmitting }) => {
          const fullData = { ...values, coordinates };
          axios
            .post("http://localhost:3001/save-data", fullData)
            .then((response) => {
              setSubmitting(false);
            })
            .catch((error) => {
              console.error("There was an error saving the data:", error);
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="form__container">
            <div className="form">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Категорія *
                </InputLabel>
                <Select
                  type="object"
                  label="Виберіть категорію"
                  className="select"
                  onChange={handleChange}
                  value={age}
                >
                  <MenuItem value={10}>Оренда квартири</MenuItem>
                </Select>
              </FormControl>
              <Field
                fullWidth
                component={TextField}
                name="announcement"
                type="announcement"
                label="Введіть назву оголошення *"
                className="input"
              />

              <Field
                fullWidth
                component={TextField}
                name="description"
                type="description"
                label="Детальний опис квартири *"
                className="description"
              />

              <Field
                fullWidth
                component={TextField}
                name="price"
                type="price"
                label="Ціна в гривні *"
                className="input"
              />

              <Field
                fullWidth
                component={TextField}
                name="firstName"
                type="text"
                label="Введіть ім'я *"
                className="input"
              />

              <Field
                fullWidth
                component={TextField}
                name="lastName"
                type="text"
                label="Введіть прізвище *"
                className="input"
              />

              <TelephoneField variant="outlined" className="input" />

              <Field
                fullWidth
                component={TextField}
                name="email"
                type="email"
                label="Введіть свій email *"
                className="input"
              />

              <Field
                fullWidth
                component={TextField}
                name="imgUrl"
                type="imgUrl"
                label="Введіть посилання на фото *"
                className="input"
              />

              <MiniMapComponent onCoordinatesChange={setCoordinates} />

              <div className="buttons__wrapper">
                <a
                  href="/"
                  className="miniMap__btn"
                  style={{
                    backgroundColor: "#fff",
                    color: "#283149",
                    textDecoration: "none",
                  }}
                >
                  Скасувати
                </a>
                <button
                  onClick={handleClick}
                  className="miniMap__btn"
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  Зберегти
                </button>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    Оголошення додано!
                  </Alert>
                </Snackbar>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNewAnnouncement;
