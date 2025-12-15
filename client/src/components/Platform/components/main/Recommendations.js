import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
  object-fit: contain;
`;

const GameContent = styled.div`
  padding: 1rem;
`;

const GameTitle = styled.h3`
  font-size: 1rem;
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
  const [recommendedGames, setRecommendedGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendedGames = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/games/recommended`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
        }

        const gamesData = await response.json();

        // Приведение данных к нужному формату
        const formattedGames = gamesData.map(game => ({
          id: game.id || game._id,
          title: game.title,
          description: game.description,
          image: game.image
        }));

        setRecommendedGames(formattedGames);
      } catch (err) {
        setError(err.message);
        console.error('Ошибка получения рекомендованных игр:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedGames();
  }, []);

  if (loading) {
    return (
      <RecommendationsContainer theme={theme}>
        <RecommendationsTitle>Рекомендации</RecommendationsTitle>
        <div>Загрузка рекомендованных игр...</div>
      </RecommendationsContainer>
    );
  }

  if (error) {
    return (
      <RecommendationsContainer theme={theme}>
        <RecommendationsTitle>Рекомендации</RecommendationsTitle>
        <div>Ошибка загрузки рекомендованных игр: {error}</div>
      </RecommendationsContainer>
    );
  }

  return (
    <RecommendationsContainer theme={theme}>
      <RecommendationsTitle>Рекомендации</RecommendationsTitle>
      <RecommendationsGrid>
        {recommendedGames.length > 0 ? (
          recommendedGames.map((game) => (
            <RecommendationCard key={game.id}>
              <GameImage src={game.image} alt={game.title} />
              <GameContent>
                <GameTitle>{game.title}</GameTitle>
                <GameDescription>{game.description}</GameDescription>
                <ViewDetailsButton>Подробнее</ViewDetailsButton>
              </GameContent>
            </RecommendationCard>
          ))
        ) : (
          <div>Нет доступных рекомендованных игр</div>
        )}
      </RecommendationsGrid>
    </RecommendationsContainer>
  );
};

export default Recommendations;