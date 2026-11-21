import { useState } from "react";
import { ActionIcon, Pill, Select, TextInput } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { useTypedDispatch } from "../../hooks/redux";
import { setPage } from "../../store/reducers/JobsSlice";
import Style from "./Filters.style.module.scss";

const defaultSkills = "JavaScript,React,Redux,Python";

export const Filters = () => {
  const [skill, setSkill] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useTypedDispatch();

  const city = searchParams.get("city") ?? "";
  const skills = (searchParams.get("skills") ?? defaultSkills)
    .split(",")
    .filter(Boolean);

  const handleChangeSkills = (nextSkills: string[]) => {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.set("skills", nextSkills.join(","));
    dispatch(setPage(1));
    setSearchParams(nextParams);
  };

  const handleAddSkill = () => {
    const value = skill.trim();

    if (!value || value.includes(",") || skills.includes(value)) {
      return;
    }

    handleChangeSkills([...skills, value]);
    setSkill("");
  };

  const handleRemoveSkill = (value: string) => {
    handleChangeSkills(skills.filter((item) => item !== value));
  };

  const handleChangeCity = (value: string | null) => {
    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set("city", value);
    } else {
      nextParams.delete("city");
    }

    dispatch(setPage(1));
    setSearchParams(nextParams);
  };

  return (
    <aside className={Style.filters}>
      <div className={Style.block}>
        <h3>Ключевые навыки</h3>

        <form
          className={Style["skill-input"]}
          onSubmit={(event) => {
            event.preventDefault();
            handleAddSkill();
          }}
        >
          <TextInput
            className={Style.input}
            placeholder="Навык"
            aria-label="Новый навык"
            value={skill}
            onChange={(event) => setSkill(event.currentTarget.value)}
          />

          <ActionIcon
            type="submit"
            size={36}
            aria-label="Добавить навык"
            disabled={!skill.trim()}
          >
            +
          </ActionIcon>
        </form>

        <Pill.Group>
          {skills.map((item) => (
            <Pill
              key={item}
              className={Style.pill}
              withRemoveButton
              onRemove={() => handleRemoveSkill(item)}
            >
              {item}
            </Pill>
          ))}
        </Pill.Group>
      </div>

      <div className={Style.block}>
        <Select
          aria-label="Город"
          value={city}
          onChange={handleChangeCity}
          data={[
            { value: "", label: "Все города" },
            { value: "Москва", label: "Москва" },
            { value: "Санкт-Петербург", label: "Санкт-Петербург" },
          ]}
          allowDeselect={false}
        />
      </div>
    </aside>
  );
};
