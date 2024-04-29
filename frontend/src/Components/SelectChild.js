import { Select } from "antd";
import useGetProfile from "../CustomHooks/useGetProfile";

const { Option } = Select;

// Extract Select component
const SelectChild = ({ field, errors, prod }) => {
  const { userDetails } = useGetProfile();
  let userChildDetails = [];

  // console.log(userDetails.length, userDetails);
  if (userDetails.length > 0) {
    if (prod.product_activity_duration < 10) {
      if (prod.product_activity.includes("Discounted")) {
        if (
          userDetails[0].FirstChildFirstName &&
          userDetails[0].SecondChildFirstName
        ) {
          userChildDetails = [
            {
              label:
                userDetails[0].FirstChildFirstName +
                " and " +
                userDetails[0].SecondChildFirstName,
              value:
                userDetails[0].FirstChildFirstName +
                " and " +
                userDetails[0].SecondChildFirstName,
            },
          ];
        }
      } else if (!prod.product_activity.includes("Discounted")) {
        if (
          userDetails[0].FirstChildFirstName &&
          !userDetails[0].SecondChildFirstName
        ) {
          userChildDetails = [
            {
              label: userDetails[0].FirstChildFirstName,
              value: userDetails[0].FirstChildFirstName,
            },
          ];
        } else if (
          userDetails[0].FirstChildFirstName &&
          userDetails[0].SecondChildFirstName
        ) {
          userChildDetails = [
            {
              label: userDetails[0].FirstChildFirstName,
              value: userDetails[0].FirstChildFirstName,
            },
            {
              label: userDetails[0].SecondChildFirstName,
              value: userDetails[0].SecondChildFirstName,
            },
          ];
        }
      }
    }
    if (prod.product_activity_duration >= 10) {
      if (
        userDetails[0].FirstChildFirstName &&
        !userDetails[0].SecondChildFirstName
      ) {
        userChildDetails = [
          {
            label: userDetails[0].FirstChildFirstName,
            value: userDetails[0].FirstChildFirstName,
          },
        ];
      } else if (
        userDetails[0].FirstChildFirstName &&
        userDetails[0].SecondChildFirstName
      ) {
        userChildDetails = [
          {
            label: userDetails[0].FirstChildFirstName,
            value: userDetails[0].FirstChildFirstName,
          },
          {
            label: userDetails[0].SecondChildFirstName,
            value: userDetails[0].SecondChildFirstName,
          },
        ];
      }
    }
  }

  return (
    <>
      <Select
        {...field}
        defaultValue="Select your child"
        onChange={(value) => {
          field.onChange(value);
          console.log(value, "child selected");
        }}
      >
        {userDetails.length > 0 &&
          userChildDetails.map((child) => (
            <Option key={child.label} value={child.value}>
              {child.label}
            </Option>
          ))}
      </Select>
      {errors.selectedName && (
        <p className="error">{errors.selectedName.message}</p>
      )}
    </>
  );
};
export default SelectChild;
