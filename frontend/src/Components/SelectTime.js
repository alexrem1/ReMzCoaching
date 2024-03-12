import { Select } from "antd";

const { Option } = Select;

// Extract Select component
const CustomSelect = ({ field, defaultTimes, errors }) => (
  <>
    <Select
      {...field}
      defaultValue="Select A Time"
      onChange={(value) => {
        // setDefaultTime(value);
        field.onChange(value);
      }}
    >
      {defaultTimes.map((time) => (
        <Option key={time.label} value={time.value.format("HH:mm")}>
          {time.label}
        </Option>
      ))}
    </Select>
    {errors.selectedTime && (
      <p style={{ color: "red" }}>{errors.selectedTime.message}</p>
    )}
  </>
);

export default CustomSelect;
