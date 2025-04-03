import { APP_URL } from '@/constants';
import { Dia, Semana, useData, WEEK_DAY_MAP } from '@/contexts/DataContext';
import { Share } from 'react-native';

const buildMessage = (week: Semana, day: Dia) =>
  `Campanha de Louvor

${week.id}ª Semana: ${week.tema}

${WEEK_DAY_MAP[Number(day.id)]}
Deus Pai, ${day.atributo}

${day.textos}

${day.livros
  .map(
    (book) => `${book.nome}
${book.capitulos
  .map(
    (chapter) => `Capítulo ${chapter.id}
${chapter.versiculos.map((verse) => `${verse.id} ${verse.texto}`).join('\n')}`,
  )
  .join('\n')}
`,
  )
  .join('\n')}
Baixe o app: ${APP_URL}
`.trim();

export const useShare = () => {
  const { allData } = useData();
  const share = async (weekId: number, dayId: number) => {
    const week = allData[weekId - 1] as Semana;
    const day = week.dias[dayId - 1] as Dia;

    const message = buildMessage(week, day);

    try {
      await Share.share({ message });
    } catch (error) {
      console.error(error);
    }
  };

  return { share };
};
