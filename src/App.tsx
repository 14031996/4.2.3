import { Header } from "./components/Header/Header";
import { Search } from "./components/Search/Search";
import { Filters } from "./components/Filters/Filters";
import { JobList } from "./components/JobList/JobList";
import Style from "./App.style.module.scss";

const App = () => {
  return (
    <>
      <Header />

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
    </>
  );
};

export default App;
