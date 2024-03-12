import { Select } from "antd";
import useGetProfile from "../CustomHooks/useGetProfile";

const { Option } = Select;

// Extract Select component
const SelectChild = ({ field, errors }) => {
  const { userDetails } = useGetProfile();

  // console.log(userDetails.length, userDetails);

  let userChildDetails = [];

  if (userDetails.length > 0) {
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
        <p style={{ color: "red" }}>{errors.selectedName.message}</p>
      )}

      <>
        {userDetails.length > 0 && (
          <>
            {field.value === userDetails[0].FirstChildFirstName && (
              <p>{userDetails[0].FirstChildFirstName}</p>
            )}
            {userDetails[0].SecondChildFirstName &&
              field.value === userDetails[0].SecondChildFirstName && (
                <p>{userDetails[0].SecondChildFirstName}</p>
              )}

            {userDetails[0].SecondChildFirstName &&
              field.value.includes(" and ") && <p>2 children = discount</p>}
          </>
        )}
      </>
    </>
  );
};
export default SelectChild;
