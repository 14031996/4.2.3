import { useEffect, useState } from "react";
import {
  Badge,
  Container,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import type { Job } from "../types/Job";

type Vacancy = Job & {
  description: string;
  about_company: string;
};

const workFormats: Record<string, string> = {
  remote: "Можно удалённо",
  office: "Офис",
  hybrid: "Гибрид",
};

const VacancyDetails = ({ id }: { id: string }) => {
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://kata-jobs.onrender.com/api/jobs/${id}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Не удалось загрузить вакансию");
        }

        return response.json();
      })
      .then((data: { job?: Vacancy }) => {
        if (data.job) {
          setVacancy(data.job);
        } else {
          setError("Вакансия не найдена");
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setError("Не удалось загрузить вакансию");
        }
      });

    return () => controller.abort();
  }, [id]);

  if (error) {
    return <Text role="alert">{error}</Text>;
  }

  if (!vacancy) {
    return <Loader aria-label="Загрузка вакансии" />;
  }

  return (
    <Stack gap="lg">
      <Paper p="lg" radius="md">
        <Stack gap="xs">
          <Title order={1} size="h3" c="indigo.7">
            {vacancy.name}
          </Title>

          <Group gap="md">
            {vacancy.salary && (
              <Text>{Number(vacancy.salary).toLocaleString("ru-RU")} ₽</Text>
            )}
            <Text size="sm" c="dimmed">
              {vacancy.experience}
            </Text>
          </Group>

          <Text size="sm" c="dimmed" mt="xs">
            {vacancy.company_name}
          </Text>

          {workFormats[vacancy.space] && (
            <Badge
              color={vacancy.space === "remote" ? "indigo" : "gray"}
              size="sm"
            >
              {workFormats[vacancy.space]}
            </Badge>
          )}

          <Text>{vacancy.city}</Text>
        </Stack>
      </Paper>

      <Paper p="lg" radius="md">
        <Stack gap="md">
          <div>
            <Title order={2} size="h3" mb="xs">
              Компания
            </Title>
            <Text style={{ whiteSpace: "pre-wrap" }}>
              {vacancy.about_company}
            </Text>
          </div>

          <div>
            <Title order={2} size="h4" mb="xs">
              О вакансии:
            </Title>
            <Text style={{ whiteSpace: "pre-wrap" }}>
              {vacancy.description}
            </Text>
          </div>
        </Stack>
      </Paper>
    </Stack>
  );
};

export const VacancyPage = () => {
  const { id } = useParams();

  return (
    <Container component="main" size={700} py="lg">
      {id && <VacancyDetails key={id} id={id} />}
    </Container>
  );
};
