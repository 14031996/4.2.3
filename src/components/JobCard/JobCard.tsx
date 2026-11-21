import { Badge, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import type { Job } from "../../types/Job";
import Style from "./JobCard.style.module.scss";

type JobCardProps = {
  job: Job;
};

export const JobCard = ({ job }: JobCardProps) => {
  let workFormat = "";

  if (job.space === "remote") {
    workFormat = "Можно удалённо";
  } else if (job.space === "office") {
    workFormat = "Офис";
  } else if (job.space === "hybrid") {
    workFormat = "Гибрид";
  }

  return (
    <article className={Style.card}>
      <h2>{job.name}</h2>

      <div className={Style.info}>
        <span>
          {job.salary
            ? `${Number(job.salary).toLocaleString("ru-RU")} ₽`
            : "Зарплата не указана"}
        </span>
        <span className={Style.muted}>{job.experience}</span>
      </div>

      <p className={Style.muted}>{job.company_name}</p>

      {workFormat && (
        <Badge color={job.space === "remote" ? "indigo" : "gray"} size="sm">
          {workFormat}
        </Badge>
      )}

      <p>{job.city}</p>

      <Button
        component={Link}
        to={`/vacancies/${job.id}`}
        color="dark"
        size="sm"
      >
        Смотреть вакансию
      </Button>
    </article>
  );
};
