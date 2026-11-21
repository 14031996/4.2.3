import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Search } from "./components/Search/Search";
import { Filters } from "./components/Filters/Filters";
import { JobList } from "./components/JobList/JobList";
import { VacancyPage } from "./pages/VacancyPage";
import Style from "./App.style.module.scss";

const VacanciesPage = () => {
  return (
    <main className={Style.page}>
      <div className={Style.top}>
        <div className={Style.title}>
          <h1>Список вакансий</h1>
          <p>по профессии Frontend-разработчик</p>
        </div>

        <Search />
      </div>

      <div className={Style.content}>
        <Filters />
        <JobList />
      </div>
    </main>
  );
};

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Navigate to="/vacancies" replace />} />
        <Route path="/vacancies" element={<VacanciesPage />} />
        <Route path="/vacancies/:id" element={<VacancyPage />} />
      </Routes>
    </>
  );
};

export default App;
