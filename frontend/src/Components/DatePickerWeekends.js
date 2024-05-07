import { DatePicker } from "antd";
import dayjs from "dayjs";

// Extract DatePicker component
const CustomDatePicker = ({ field, errors, disabledDate, placeholder }) => {
  const handleChange = (date) => {
    field.onChange(date && dayjs(date)); // Update form value
    if (date === null) {
      // If date is cleared, clear the error message
      field.onChange(undefined);
      // console.log(errors, date);
      // console.log(date, dayjs(date), dayjs(date)?.format("DD/MM/YYYY"));
    }
    // console.log(errors, date);
    // console.log(date, dayjs(date), dayjs(date)?.format("DD/MM/YYYY"));
  };

  return (
    <>
      <DatePicker
        ref={field.ref}
        name={field.name}
        onBlur={field.onBlur}
        onChange={handleChange} // Use handleChange function
        disabledDate={disabledDate}
        format="DD/MM/YYYY"
        locale={{ format: "DD/MM/YYYY", lang: { locale: "en-gb" } }}
        placeholder={placeholder}
        value={field.value && dayjs(field.value)}
      />
    </>
  );
};

export default CustomDatePicker;
