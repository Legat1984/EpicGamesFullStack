import React from 'react';
import styled from 'styled-components';

// Styled components for News
const NewsContainer = styled.section`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
`;

const NewsTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.text};
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const NewsCard = styled.div`
  background-color: ${props => props.theme.cardBackground};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }
`;

const NewsImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const NewsContent = styled.div`
  padding: 1rem;
`;

const NewsCardTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const NewsDate = styled.p`
  font-size: 0.8rem;
  color: ${props => props.theme.secondaryText};
  margin-bottom: 0.5rem;
`;

const NewsDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.secondaryText};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const ReadMoreButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.primaryHover};
  }
`;

const News = ({ theme }) => {
  // Mock data for news
  const newsData = [
    {
      id: 1,
      title: "Новый турнир по CS:GO стартует в следующем месяце",
      description: "Огромное количество игроков со всего мира соберутся для участия в захватывающем турнире с призовым фондом более $1 миллиона.",
      date: "2023-06-15",
      image: "https://placehold.co/300x150?text=CS:GO+Tournament"
    },
    {
      id: 2,
      title: "Вышел патч 2.5 для популярной RPG игры",
      description: "Разработчики представили крупное обновление с новыми квестами, персонажами и улучшенной графикой. Игроки уже оценивают изменения.",
      date: "2023-06-10",
      image: "https://placehold.co/300x150?text=RPG+Patch"
    },
    {
      id: 3,
      title: "Открыт набор в новую гильдию World of Warcraft",
      description: "Гильдия DragonSlayers приглашает опытных игроков и новичков в свой состав. Проводим рейды по выходным и учим основам игры.",
      date: "2023-06-05",
      image: "https://placehold.co/300x150?text=WOW+Guild"
    },
    {
      id: 4,
      title: "Анонсирована новая игра от indie студии",
      description: "Студия PixelDream объявила о своей следующей игре - приключенческой головоломке с уникальной арт-стилистикой и глубоким сюжетом.",
      date: "2023-06-01",
      image: "https://placehold.co/300x150?text=Indie+Game"
    },
    {
      id: 5,
      title: "Трансляция финала чемпионата по Dota 2 доступна",
      description: "Запись эпического финального матча теперь доступна для просмотра. Команда Team Phoenix одержала победу в напряженной битве.",
      date: "2023-05-28",
      image: "https://placehold.co/300x150?text=Dota+2+Final"
    },
    {
      id: 6,
      title: "Обновлены правила поведения на платформе",
      description: "Мы обновили правила использования платформы, чтобы обеспечить безопасную и комфортную среду для всех пользователей.",
      date: "2023-05-25",
      image: "https://placehold.co/300x150?text=Platform+Rules"
    }
  ];

  return (
    <NewsContainer theme={theme}>
      <NewsTitle>Новости</NewsTitle>
      <NewsGrid>
        {newsData.map((newsItem) => (
          <NewsCard key={newsItem.id}>
            <NewsImage src={newsItem.image} alt={newsItem.title} />
            <NewsContent>
              <NewsCardTitle>{newsItem.title}</NewsCardTitle>
              <NewsDate>{newsItem.date}</NewsDate>
              <NewsDescription>{newsItem.description}</NewsDescription>
              <ReadMoreButton>Читать далее</ReadMoreButton>
            </NewsContent>
          </NewsCard>
        ))}
      </NewsGrid>
    </NewsContainer>
  );
};

export default News;