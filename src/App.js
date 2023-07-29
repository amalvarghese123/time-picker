import "./App.css";
import Input from "./ui-components/forms/Input";
import TimePickerLatest from "./ui-components/time-picker";
import { useFormik } from "formik";
import * as Yup from "yup";

function App() {
  const initialValues = {
    // time: "00:00",
    time: "09:30",
  };
  const validationSchema = Yup.object().shape({
    time: Yup.string().required("Time required"),
  });
  const onSubmit = (values) => {
    console.log("values:", values);
  };
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues,
    onSubmit,
  });
  const { setFieldValue, values, errors, touched, handleBlur, handleChange } =
    formik;
  const handleTime = (e) => {
    setFieldValue("time", e, true);
  };
  return (
    <div className="App">
      <div className="container">
        <TimePickerLatest
          customInput={Input}
          // type="time"
          label="Select Time"
          onChange={handleTime}
          onBlur={handleBlur("time")}
          error={touched.time && errors.time}
          value={values.time}
          listItemHeight={"20px"}
          visibleItemsLimit={15}
          // disabled={true}
        />
      </div>
    </div>
  );
}

export default App;
