import { useState } from "react";
import { ActionIcon, Pill, Select, TextInput } from "@mantine/core";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { addSkill, removeSkill, setCity } from "../../store/reducers/JobsSlice";
import Style from "./Filters.style.module.scss";

export const Filters = () => {
  const [skill, setSkill] = useState("");
  const { skills, city } = useTypedSelector((state) => state.jobs);
  const dispatch = useTypedDispatch();

  const handleAddSkill = () => {
    dispatch(addSkill(skill));
    setSkill("");
  };

  const handleRemoveSkill = (value: string) => {
    dispatch(removeSkill(value));
  };

  const handleChangeCity = (value: string | null) => {
    dispatch(setCity(value || ""));
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
