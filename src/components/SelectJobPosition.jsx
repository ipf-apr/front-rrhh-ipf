import { usePromise } from "../hooks/usePromise";
import { fetchJobPositions } from "../services/local/jobPositions";
import { ShowErrors } from "./ShowErrors";
import { Spinner } from "./Spinner";

export const SelectJobPosition = ({ handleInputChange }) => {
  const {
    data: allJobPositions,
    error,
    loading: loadingJobPositions,
  } = usePromise(fetchJobPositions);
  return (
    <>
      <ShowErrors error={error} />

      {loadingJobPositions && <Spinner />}

      <select
        className="form-select"
        name="selectedJobPosition"
        id="selectedJobPosition"
        onChange={handleInputChange}
        defaultValue={""}
      >
        <option value="">-- Seleccione --</option>
        {allJobPositions &&
          allJobPositions.map((jobPosition) => {
            return (
              <option
                key={`job-position-all-${jobPosition.id}`}
                value={jobPosition.id}
              >
                {jobPosition.position}
              </option>
            );
          })}
      </select>
    </>
  );
};
