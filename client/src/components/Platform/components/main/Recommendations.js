import React from 'react';
import styled from 'styled-components';

// Styled components for Recommendations
const RecommendationsContainer = styled.section`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
`;

const RecommendationsTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.text};
`;

const RecommendationsGrid = styled.div`
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

const RecommendationCard = styled.div`
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

const GameImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const GameContent = styled.div`
  padding: 1rem;
`;

const GameTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const GameRating = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.accent};
  margin-bottom: 0.5rem;
`;

const GameDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.secondaryText};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const ViewDetailsButton = styled.button`
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

const Recommendations = ({ theme }) => {
  // Mock data for game recommendations
  const recommendationsData = [
    {
      id: 1,
      title: "Cyberpunk 2077: Phantom Liberty",
      description: "Расширенная версия культовой RPG с новым сюжетом, персонажами и улучшенной системой геймплея.",
      rating: "4.8 ★",
      image: "https://placehold.co/300x150?text=Cyberpunk+2077"
    },
    {
      id: 2,
      title: "The Witcher 4: Wild Hunt",
      description: "Продолжение легендарной серии RPG. Новый герой, новые миры и захватывающий сюжет от создателей оригинала.",
      rating: "4.9 ★",
      image: "https://placehold.co/300x150?text=Witcher+4"
    },
    {
      id: 3,
      title: "Elden Ring: Shadow of the Erdtree",
      description: "Огромное дополнение к популярной RPG от FromSoftware. Новые земли, боссы и тайны для исследования.",
      rating: "4.7 ★",
      image: "https://placehold.co/300x150?text=Elden+Ring"
    },
    {
      id: 4,
      title: "Starfield: Shattered Space",
      description: "Первое крупное дополнение к масштабной космической RPG. Новые планеты, задания и возможности.",
      rating: "4.5 ★",
      image: "https://placehold.co/300x150?text=Starfield"
    },
    {
      id: 5,
      title: "Hogwarts Legacy: Revisit",
      description: "Новое приключение в мире Гарри Поттера с расширенным миром и новыми волшебными возможностями.",
      rating: "4.6 ★",
      image: "https://placehold.co/300x150?text=Hogwarts"
    },
    {
      id: 6,
      title: "Baldur's Gate 3: Enhanced Edition",
      description: "Классическая RPG получает новые классы, заклинания и расширенный сюжет после финального обновления.",
      rating: "5.0 ★",
      image: "https://placehold.co/300x150?text=Baldurs+Gate"
    }
  ];

  return (
    <RecommendationsContainer theme={theme}>
      <RecommendationsTitle>Рекомендации</RecommendationsTitle>
      <RecommendationsGrid>
        {recommendationsData.map((game) => (
          <RecommendationCard key={game.id}>
            <GameImage src={game.image} alt={game.title} />
            <GameContent>
              <GameTitle>{game.title}</GameTitle>
              <GameRating>{game.rating}</GameRating>
              <GameDescription>{game.description}</GameDescription>
              <ViewDetailsButton>Подробнее</ViewDetailsButton>
            </GameContent>
          </RecommendationCard>
        ))}
      </RecommendationsGrid>
    </RecommendationsContainer>
  );
};

export default Recommendations;