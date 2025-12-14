import React, { useState } from 'react';
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
  margin-bottom: 1rem;
  transition: max-height 0.3s ease;
  overflow: hidden;

  ${props => props.expanded ? `
    display: block;
    max-height: none;
  ` : `
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-height: 4.2em; /* примерно 3 строки */
  `}
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
      title: "Начало работы над проектом",
      description: "Сегодня я начал работать над данным проектом. Ждите запуска уже скоро.",
      date: "2024-10-29",
      image: "https://cdn.qwenlm.ai/output/426f113e-59ea-4da2-91e2-419700d6774f/t2i/86265e95-b952-4250-9922-aa169fe02410/1765710169.png?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiNDI2ZjExM2UtNTllYS00ZGEyLTkxZTItNDE5NzAwZDY3NzRmIiwicmVzb3VyY2VfaWQiOiIxNzY1NzEwMTY5IiwicmVzb3VyY2VfY2hhdF9pZCI6IjRjNDkwM2U1LTEzNjAtNGEzMi1hMjQ5LTZjNjNkNTE4M2MxYiJ9.uQHlHl0MGvuvYBkgyNuPumF3mgQLpNcrCdt5y9cE0Ig"
    },
    {
      id: 2,
      title: "Разработка с помощью ИИ",
      description: "Прошел год, из-за нехватки времени, я понял, что работа над проектом движется очень медленно, поэтому решил прибегнуть к помощи искусственного интеллекта.",
      date: "2025-11-22",
      image: "https://cdn.qwenlm.ai/output/426f113e-59ea-4da2-91e2-419700d6774f/t2i/95a21b2a-2e97-404c-89a5-ba805b6562df/1765713027.png?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiNDI2ZjExM2UtNTllYS00ZGEyLTkxZTItNDE5NzAwZDY3NzRmIiwicmVzb3VyY2VfaWQiOiIxNzY1NzEzMDI3IiwicmVzb3VyY2VfY2hhdF9pZCI6ImUyMmM0MWU0LTMxNTUtNGVkNC04ZTViLTYwZTZjODhiNWMxMCJ9.WdPtYoW8ehGiIPLoxnW1XuuXfFS_0NECfzAZxyo8L48"
    },
    {
      id: 3,
      title: "Увеличение мощностей на сервере разработки",
      description: "Заметил что проект начал съедать всю ОЗУ, увеличил в 2 раза, так же добавил места на жестком диске.",
      date: "2025-12-14",
      image: "https://cdn.qwenlm.ai/output/426f113e-59ea-4da2-91e2-419700d6774f/t2i/f659bb9e-abc2-4238-bda5-ae192c72634f/1765713211.png?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiNDI2ZjExM2UtNTllYS00ZGEyLTkxZTItNDE5NzAwZDY3NzRmIiwicmVzb3VyY2VfaWQiOiIxNzY1NzEzMjExIiwicmVzb3VyY2VfY2hhdF9pZCI6IjM0Y2RkOTA4LTE3NmUtNDEyNS05NDkyLTgwZjZkYTlmY2YyNSJ9.n13n5R4igfMZVzLG8y0U9GA1twYVURfLssUK1DyxKU8"
    },
  ];
  const [expandedNews, setExpandedNews] = useState({});

  const toggleNews = (id) => {
    setExpandedNews(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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
              <NewsDescription expanded={!!expandedNews[newsItem.id]}>
                {newsItem.description}
              </NewsDescription>
              {expandedNews[newsItem.id] ? (
                <ReadMoreButton onClick={() => toggleNews(newsItem.id)}>
                  Свернуть
                </ReadMoreButton>
              ) : (
                <ReadMoreButton onClick={() => toggleNews(newsItem.id)}>
                  Читать далее
                </ReadMoreButton>
              )}
            </NewsContent>
          </NewsCard>
        ))}
      </NewsGrid>
    </NewsContainer>
  );
};

export default News;