import { useCallback, useContext, useState } from "react";
import { usePromise } from "../../../hooks/usePromise";
import { fetchSkills } from "../../../services/local/skills";
import { EmployeesContext } from "../../../contexts/EmployeesContext";
import { fetchEmployeeSkills } from "../../../services/local/employees/skills";
import { Spinner } from "../../../components/Spinner";
import { apiStoreEmployeeSkill } from "../../../services/local/employees/skills/store";
import { useForm } from "../../../hooks/useForm";
import { ShowErrors } from "../../../components/ShowErrors";

export const EmployeeSkills = ({ employeeId }) => {
  const [validationErrors, setValidationErrors] = useState(null);

  const {
    data: allSkills,
    error: allSkillsError,
    loading: loadingAllSkills,
  } = usePromise(fetchSkills);

  const {
    data: employeeSkills,
    error: employeeSkillsError,
    loading: loadingEmployeeSkills,
    mutateData,
  } = usePromise(
    useCallback(() => fetchEmployeeSkills(employeeId), [employeeId])
  );

  const {
    form: skill,
    handleInputChange,
    reset,
    setForm,
  } = useForm({
    skillId: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const skillId = skill?.skillId;

      const skillAlready = employeeSkills?.find((skill) => skill.id == skillId);

      if (!skillAlready) {
        if (skillId) {
          const data = await apiStoreEmployeeSkill(employeeId, skillId);

          if (data.skillEmployee) {
            const skill = allSkills.find((skill) => skill.id == skillId);
            if (!employeeSkills && employeeSkills.length === 0) {
              return mutateData([skill]);
            }
            document.querySelector("#btlCancelSaveSkill").click();
            document.querySelector("#btlCancelSaveSkill").blur();
            return mutateData([...employeeSkills, skill]);
          } else {
            return setValidationErrors(data.message);
          }
        }
      }
      return setValidationErrors(
        "La habilidad ya fue agregada a este empleado."
      );
    } catch (error) {
      console.log(error);
      setValidationErrors(error);
    }
  };

  return (
    <>
      <div className="rounded shadow p-2 mb-2">
        <div className="d-flex justify-content-between align-items-center ">
          <strong>Habilidades / Skills:</strong>
          <button
            type="button"
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#modalSkillCreate"
          >
            +
          </button>
        </div>
        <ul className="mx-3">
          {loadingEmployeeSkills && <Spinner />}
          {employeeSkills &&
            employeeSkills.length == 0 &&
            !loadingEmployeeSkills && (
              <li>Este empleado no tiene habilidades registradas.</li>
            )}
          {employeeSkillsError && <li>{employeeSkillsError.message}</li>}
          {employeeSkills &&
            employeeSkills.length > 0 &&
            !loadingEmployeeSkills &&
            employeeSkills.map((skill) => {
              return (
                <li key={`skill-employee-${skill.id}`}>{skill.nameSkill}</li>
              );
            })}
        </ul>
      </div>

      {/* Modal AddSkillsToEmployee */}
      <div
        className="modal fade"
        id="modalSkillCreate"
        tabIndex="-1"
        aria-labelledby="modalSkillCreateLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modalSkillCreateLabel">
                Habilidades
              </h1>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit} id="formSKills">
              <div className="modal-body">
                <div className="col-12">
                  <label htmlFor="selectSkills" className="form-label">
                    Seleccionar una Habilidad
                    <small className=" text-danger">(*)</small>
                  </label>
                  <select
                    className="form-select"
                    name="skillId"
                    id="selectSkills"
                    onChange={handleInputChange}
                    defaultValue={""}
                  >
                    <option value="">-- Seleccione --</option>
                    {allSkills &&
                      allSkills.map((skill) => {
                        return (
                          <option
                            key={`skill-all-${skill.id}`}
                            value={skill.id}
                          >
                            {skill.nameSkill}
                          </option>
                        );
                      })}
                  </select>
                  <div className="mt-2">
                    {validationErrors && (
                      <ShowErrors errors={validationErrors} />
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  id="btlCancelSaveSkill"
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={reset}
                >
                  Cancelar
                </button>

                <button
                  id="btnSaveSkill"
                  type="submit"
                  className="btn btn-primary"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
