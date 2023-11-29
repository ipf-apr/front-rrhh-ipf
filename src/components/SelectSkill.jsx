import { usePromise } from "../hooks/usePromise";
import { fetchSkills } from "../services/local/skills";
import { ShowErrors } from "./ShowErrors";
import { Spinner } from "./Spinner";

export const SelectSkill = ({handleInputChange, value}) => {
  const {
    data: allSkills,
    error,
    loading: loadingAllSkills,
  } = usePromise(fetchSkills);

  console.log(value)
  return (
    <>
      {error && <ShowErrors error={error} />}

      {loadingAllSkills && <Spinner />}
      <select
        className="form-select"
        name="selectedSkill"
        id="selectSkills"
        onChange={handleInputChange}
        value={value}
      >
        <option value="">-- Seleccione --</option>
        {allSkills &&
          allSkills.map((skill) => {
            return (
              <option key={`skill-all-${skill.id}`} value={skill.id}>
                {skill.nameSkill}
              </option>
            );
          })}
      </select>
    </>
  );
};