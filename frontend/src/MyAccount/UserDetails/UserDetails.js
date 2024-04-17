import { useNavigate } from "react-router-dom";
import useGetProfile from "../../CustomHooks/useGetProfile";
import useLogout from "../../CustomHooks/useLogout";
import useDeleteUser from "../../CustomHooks/useDeleteUser";
import { CircleUser } from "lucide-react";

function UserDetails() {
  const { userDetails, maskPassword } = useGetProfile();

  const { handleLogout } = useLogout();

  const { deleteUser } = useDeleteUser();

  function handleUserDelete(userId) {
    deleteUser(userId);

    handleLogout();
  }

  const navigate = useNavigate();

  return (
    <>
      {userDetails.length > 0 &&
        userDetails.map((details) => (
          <div className="form-container profile" key={details.id}>
            <div className="form-container-form">
              <div className="content">
                <p>
                  Name: {details.CarerFirstName} {details.CarerLastName}
                </p>
                <p>Email: {details.Email}</p>
                <p>Contact number: {details.ContactNumber}</p>
                <p>
                  Emergency contact number: {details.EmergencyContactNumber}
                </p>
                <p>Password: {maskPassword(details.password)}</p>
                <br />
                <p>Address Line 1: {details.AddressLine1}</p>
                {details.AddressLine2 && (
                  <p>Address Line 2: {details.AddressLine2}</p>
                )}
                <p>City or Town: {details.AddressCityTown}</p>
                <p>Postcode: {details.AddressPostcode}</p>
                <br />
                <p>
                  First child name: {details.FirstChildFirstName}{" "}
                  {details.FirstChildLastName}
                </p>
                <p>
                  First child DOB:
                  {details.FirstChildDOB}
                </p>
                <p>
                  First child year group:
                  {details.FirstChildYearGroup}
                </p>
                <p>First child medical info: {details.FirstChildMedical}</p>
                <br />
                {details.SecondChildFirstName &&
                  details.SecondChildLastName && (
                    <>
                      <p>
                        Second child name: {details.SecondChildFirstName}{" "}
                        {details.SecondChildLastName}
                      </p>
                      <p>
                        Second child DOB:
                        {details.SecondChildDOB}
                      </p>
                      <p>
                        Second child year group:
                        {details.SecondChildYearGroup}
                      </p>
                      <p>
                        Second child medical info:
                        {details.SecondChildMedical}
                      </p>
                    </>
                  )}
              </div>
              <button
                className="primary-cta"
                onClick={() => {
                  navigate(`/profile/update/${details.id}`);
                }}
              >
                <p>Update Details</p>
              </button>
            </div>
            <button
              type="button"
              className="secondary-cta"
              onClick={() => {
                handleUserDelete(details.id);
              }}
            >
              <CircleUser /> <p>Delete account</p>
            </button>
          </div>
        ))}
    </>
  );
}

export default UserDetails;
