import { useState } from "react";
import { Button, TextInput } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { useTypedDispatch } from "../../hooks/redux";
import { setPage } from "../../store/reducers/JobsSlice";
import Style from "./Search.style.module.scss";

type SearchFormProps = {
  search: string;
  onSearch: (value: string) => void;
};

const SearchForm = ({ search, onSearch }: SearchFormProps) => {
  const [value, setValue] = useState(search);

  return (
    <form
      className={Style.search}
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(value.trim());
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

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useTypedDispatch();
  const search = searchParams.get("search") ?? "";

  const handleSearch = (value: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set("search", value);
    } else {
      nextParams.delete("search");
    }

    dispatch(setPage(1));
    setSearchParams(nextParams);
  };

  return <SearchForm key={search} search={search} onSearch={handleSearch} />;
};
