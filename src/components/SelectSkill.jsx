import { useEffect } from "react";
import { usePromise } from "../hooks/usePromise";
import { fetchSkills } from "../services/local/skills";
import { ShowErrors } from "./ShowErrors";
import { Spinner } from "./Spinner";

export const SelectSkill = ({handleInputChange, value, setSkillName}) => {
  const {
    data: allSkills,
    error,
    loading: loadingAllSkills,
  } = usePromise(fetchSkills);

  useEffect(() => {
    if (allSkills && allSkills.length > 0) {
      const skill = allSkills.find(
        (skill) => skill.id == value
        );
        if (skill) {
          setSkillName(skill.nameSkill);
        }
      }
    }, [value])

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
        <option value="">-- Seleccione la habilidad --</option>
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
