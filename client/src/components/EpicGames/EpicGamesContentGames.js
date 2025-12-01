import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import StarSVG from '../../assets/EpicGames/images/favorite.svg';

const Card = styled.div`
  position: relative;
  width: 21.28vmin;
  height: 27.57vmin;
  background-color: #24252B;
  margin-top: 1vmin;
  margin-right: 1vmin;
`;

const Poster = styled.div`
  width: 100%;
  height: 12.69vmin;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const IconAndName = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5vmin;
`;

const Icon = styled.img`
  width: 3vmin;
  height: 3vmin;
  margin-right: 0.5vmin;
`;

const Description = styled.p`
  padding: 0.5vmin;
  color: white;
  font-family: 'fontKaushanScript', ${props => props.theme.fontFamily || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"};
  font-size: 1.2vmin;
`;

const NameGame = styled.span`
  color: #86898E;
  font-family: 'fontKaushanScript', ${props => props.theme.fontFamily || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"};
  font-size: 1.5vmin;
  font-weight: 600;
`;

const Star = styled.img`
  position: absolute;
  top: 1vmin;
  right: 1vmin;
  width: 2vmin;
  height: 2vmin;
  filter: ${({ $isFavorite }) => ($isFavorite ? 'invert(55%) sepia(94%) saturate(7487%) hue-rotate(359deg) brightness(104%) contrast(105%)' : 'none')};
`;

const gamesList = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/games/games-list`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Ошибка сети');
        }

        const games = await response.json();
        return games;
    } catch (error) {
        console.error('Ошибка получения списка игр:', error);
        return false;
    }
}

const EpicGamesContentGames = () => {
    const [games, setGames] = useState([]);
    const [favoriteGames, setFavoriteGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            const gamesData = await gamesList();
            if (gamesData) {
                setGames(gamesData);
            }
        };

        fetchGames();

        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.favoriteGames) {
            setFavoriteGames(user.favoriteGames);
        }
    }, []);

    const toggleFavorite = (gameId) => {
        setFavoriteGames((prevFavorites) => {
            if (prevFavorites.some(favGame => favGame.id === gameId)) {
                return prevFavorites.filter(favGame => favGame.id !== gameId);
            } else {
                return [...prevFavorites, { id: gameId }];
            }
        });
    };

    const isFavorite = (gameId) => {
        return favoriteGames.some(favGame => favGame.id === gameId);
    };

    return (
        <div>
            {games.map(game => (
                <Card key={game.id}>
                    <Poster style={{ backgroundImage: `url(${game.poster})` }} />
                    <Star src={StarSVG} $isFavorite={isFavorite(game.id)} onClick={() => toggleFavorite(game.id)} />
                    <IconAndName>
                        <Icon src={game.icon} alt={game.name} />
                        <NameGame>{game.name}</NameGame>
                    </IconAndName>
                    <Description>{game.description}</Description>
                </Card>
            ))}
        </div>
    );
};

export default EpicGamesContentGames;