import { DatePicker } from "antd";
import dayjs from "dayjs";

// Extract DatePicker component
const CustomDatePicker = ({ field, errors, disabledDate }) => (
  <>
    <DatePicker
      ref={field.ref}
      name={field.name}
      onBlur={field.onBlur}
      onChange={(date) => {
        field.onChange(date ? dayjs(date) : null);
      }}
      disabledDate={disabledDate}
      format="DD/MM/YYYY"
      locale={{ format: "DD/MM/YYYY", lang: { locale: "en-gb" } }}
      placeholder="Select a date"
      value={field.value ? dayjs(field.value) : null}
    />
    {errors.selectedDate && (
      <p style={{ color: "red" }}>{errors.selectedDate.message}</p>
    )}
  </>
);

export default CustomDatePicker;
