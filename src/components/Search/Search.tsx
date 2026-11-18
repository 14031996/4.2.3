import { useState } from "react";
import { Button, TextInput } from "@mantine/core";
import { useTypedDispatch } from "../../hooks/redux";
import { setSearch } from "../../store/reducers/JobsSlice";
import Style from "./Search.style.module.scss";

export const Search = () => {
  const [value, setValue] = useState("");
  const dispatch = useTypedDispatch();

  const handleSearch = () => {
    dispatch(setSearch(value.trim()));
  };

  return (
    <form
      className={Style.search}
      onSubmit={(event) => {
        event.preventDefault();
        handleSearch();
      }}
    >
      <TextInput
        className={Style.input}
        placeholder="Должность или название компании"
        aria-label="Поиск вакансий"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />

      <Button type="submit">Найти</Button>
    </form>
  );
};
