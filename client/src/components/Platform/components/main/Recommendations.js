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
      title: "Гарри Поттер: Битва за Хогвартс",
      description: "Кооперативная настольная игра по мотивам произведений Джоан Роулинг.",
      image: "https://cdn.qwenlm.ai/output/426f113e-59ea-4da2-91e2-419700d6774f/t2i/4e3708b9-14d0-4ee3-8fa8-efa915ceb6bf/1765710477.png?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiNDI2ZjExM2UtNTllYS00ZGEyLTkxZTItNDE5NzAwZDY3NzRmIiwicmVzb3VyY2VfaWQiOiIxNzY1NzEwNDc3IiwicmVzb3VyY2VfY2hhdF9pZCI6IjdiYmJmYTUwLTY3NDYtNDdkZC05MjI3LTZmMjBmNzRmYzRhNCJ9.Ze-9lPKKssSPbQX-Ynk88qbEVhkL45KuiHMafJG8wdU"
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