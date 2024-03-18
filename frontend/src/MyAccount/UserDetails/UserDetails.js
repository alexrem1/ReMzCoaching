import { Link } from "react-router-dom";
import useGetProfile from "../../CustomHooks/useGetProfile";

function UserDetails() {
  const { userDetails, maskPassword } = useGetProfile();

  return (
    <>
      {userDetails.map((details) => (
        <div key={details.id}>
          <h3>Your details</h3>
          <p>
            Name: {details.CarerFirstName} {details.CarerLastName}
          </p>
          <p>Email: {details.Email}</p>
          <p>Contact number: {details.ContactNumber}</p>
          <p>Emergency contact number: {details.EmergencyContactNumber}</p>
          <p>Password: {maskPassword(details.password)}</p>
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
          {details.SecondChildFirstName && (
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

          {details.Permission === 1 ? (
            <p>Permission: Yes</p>
          ) : (
            <p>Permission: No</p>
          )}
          {details.PupilPremium === 1 ? (
            <p>Pupil Premium: Yes</p>
          ) : (
            <p>Pupil Premium: No</p>
          )}

          <button className="primary-cta">
            <Link to={`/profile/update/${details.id}`}> Update Details</Link>
          </button>
        </div>
      ))}
    </>
  );
}

export default UserDetails;