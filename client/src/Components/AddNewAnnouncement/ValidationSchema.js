import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  category: Yup.string().required("Виберіть категорію"),
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

  //   paymentMethod: Yup.string().required("Спосіб оплати"),
  //   district: Yup.object().nullable().required("Select a district"),
  //   city: Yup.object().nullable().required("Select a city"),
  //   postOffice: Yup.string().required("Enter a post office"),
  //   postOfficeBranch: Yup.object()
  //     .nullable()
  //     .required("Select a post office branch"),
  //   deliveryDetails: Yup.string().required("Enter delivery details"),
});
