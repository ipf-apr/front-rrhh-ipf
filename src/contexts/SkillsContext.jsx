import { createContext } from "react";
import { fetchSkills } from "../services/local/skills";
import { usePromise } from "../hooks/usePromise";
import { apiStoreSkill } from "../services/local/skills/create";
import { apiUpdateSkill } from "../services/local/skills/update";
import { apiDeleteSkill } from "../services/local/skills/delete";

export const SkillsContext = createContext({});

export const SkillsContextProvider = ({ children }) => {
  const { data: skills, error, loading, mutateData } = usePromise(fetchSkills);

  const storeSkill = async (skill) => {
    try {
      const data = await apiStoreSkill(skill);

      console.log("skills", skills);
      if (!skills || skills?.length === 0) {
        return mutateData([data.skill]);
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

  const deleteSkill = async (skillId) => {
    try {
      const data = await apiDeleteSkill(skillId);
      console.log(data);

      if (skills && skills.length !== 0) {
        const newSkills = skills.filter((skill) => {
          if (skill.id != skillId) {
            return skill;
          }
          return;
        });
        return mutateData(newSkills);
      }
    } catch (error) {
      console.log("error on deleteJobPosition");
      throw error;
    }
  };

  return (
    <SkillsContext.Provider
      value={{ storeSkill, updateSkill, deleteSkill, skills, error, loading }}
    >
      {children}
    </SkillsContext.Provider>
  );
};
