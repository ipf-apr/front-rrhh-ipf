import { createContext } from "react";
import { fetchSkills } from "../services/local/skills";
import { usePromise } from "../hooks/usePromise";
import { apiStoreSkill } from "../services/local/skills/create";
import { apiUpdateSkill } from "../services/local/skills/update";

export const SkillsContext = createContext({});

export const SkillsContextProvider = ({ children }) => {
  const { data: skills, error, loading, mutateData } = usePromise(fetchSkills);

  const storeSkill = async (skill) => {
    try {
      const data = await apiStoreSkill(skill);
      if (!skills && skills?.length === 0) {
        return mutateData([data]);
      }
      mutateData([...skills, data.skill]);
    } catch (error) {
      console.log("error on category store");
      throw error;
    }
  };

  const updateSkill = async (skill, skillId) => {
    try {
      const data = await apiUpdateSkill(skill, skillId);

      if (skills && skills.length !== 0) {
        const newSkills = skills.map((sk) => {
          if (sk.id == skillId) {
            return data.skill;
          }
          return sk;
        });
        console.log("newSkills", newSkills);
        return mutateData(newSkills);
      }
    } catch (error) {
      console.log("error on category update");
      throw error;
    }
  };

  return (
    <SkillsContext.Provider
      value={{ storeSkill, updateSkill, skills, error, loading }}
    >
      {children}
    </SkillsContext.Provider>
  );
};
