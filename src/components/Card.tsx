import styled from 'styled-components';
import { MoviesInterface } from '../types/cardInterface';
import CustomButton from './CustomButton';
import Rating from './Rating';

const Card = ({id, poster_path, title, overview, onCloseMovie, currentCard, index, vote_average} : MoviesInterface) => {

    const imgPath = 'https://image.tmdb.org/t/p/w500/' + poster_path;

    return (
        <CardMain index={index} currentCard={currentCard}>
            <CardBackground imgPath={imgPath} index={index} />
            <CardWrapper index={index}>

                <CardImage src={imgPath} alt={title} />

                <CardContent>
                    <Rating rating={vote_average} />
                    <p>{overview}</p>
                <CardButtonsWrapper>
                    <CustomButton text='TAK' onClick={onCloseMovie} />
                    <CustomButton text='NIE' onClick={onCloseMovie} />
                </CardButtonsWrapper>
                </CardContent>
            </CardWrapper>
        </CardMain>
    )
}

export default Card

const CardMain = styled.div<{index : number, currentCard: number}>`
    position: absolute;
    top: 0;
    left: 50%;
    z-index: ${p => (p.index)};
    transform: translateX(-50%);
    height: 100vh;
`;

const CardBackground = styled.div<{imgPath : string, index : number}>`
    height: 100vh;
    width: 100vw;
    background-image: url(${p => p.imgPath});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    filter: blur(5px);
    -webkit-filter: blur(5px);
    position: absolute;
    top: 0;
    left: 50%;
    z-index: ${p => (p.index)};
    transform: translateX(-50%);
`;

const CardWrapper = styled.div<{index : number}>`
    width: calc(100vw - 130px);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: ${p => (p.index)};
    position: fixed;
    max-width: 500px;
`;

const CardContent= styled.div`
    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.size.vsmall};
    text-align: left;
    margin-top: -5px;
    padding: 20px 15px;
    position: relative;
    p {
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;

const CardImage = styled.img`
    width: 100%;
`;

const CardButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 10px;
`;