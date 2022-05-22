import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { MoviesInterface } from '../types/cardInterface';
import CustomButton from './CustomButton';
import Rating from './Rating';
import { fadeIn, bounceOutLeft, bounceOutRight } from 'react-animations'
import { useAppDispatch } from '../app/hooks';
import { choseMoviesAsync } from '../services/movieService';

enum CardStatus {
    Accepted = 'Accepted',
    Rejected = 'Rejected',
    Idle = 'Idle'
}

const Card = ({id, poster_path, title, overview, onCloseMovie, currentCard, index, vote_average} : MoviesInterface) => {

    const imgPath = 'https://image.tmdb.org/t/p/w500/' + poster_path;

    const [desicion, setDesicion] = useState(CardStatus.Idle);
    const dispatch = useAppDispatch();

    const handleAnimation = (direction : any) => {
        setDesicion(direction)
        dispatch(choseMoviesAsync({id, desicion}));
        onCloseMovie();
    }


    return (
        <CardMain index={index} currentCard={currentCard}>
            <CardBackground imgPath={imgPath} index={index} />
            <CardWrapper index={index} className={desicion}>

                <CardImage src={imgPath} alt={title} />

                <CardContent>
                    <Rating rating={vote_average} />
                    <RatingSummary>{overview}</RatingSummary>
                <CardButtonsWrapper>
                    <CustomButton text='NO' onClick={()=> handleAnimation(CardStatus.Rejected)} />
                    <Separator />
                    <CustomButton text='YES' onClick={()=> handleAnimation(CardStatus.Accepted)} />
                </CardButtonsWrapper>
                </CardContent>
            </CardWrapper>
        </CardMain>
    )
}

export default Card

const cardAppearAnimation = keyframes`${fadeIn}`;

const cardAcceptAnimation = keyframes`${bounceOutRight}`;

const cardRejectAnimation = keyframes`${bounceOutLeft}`;


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
    position: absolute;
    top: 0;
    left: 50%;
    z-index: ${p => (p.index)};
    transform: translateX(-50%);
    ::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(5px);
    }
`;

const CardWrapper = styled.div<{index : number}>`
    width: calc(100vw - 130px);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: ${p => (p.index)};
    position: fixed;
    max-width: 500px;
    &.Idle{
        animation: ${cardAppearAnimation} 2s forwards;
    }
    &.Accepted {
        animation: ${cardAcceptAnimation} 2s forwards;
    }
    &.Rejected {
        animation: ${cardRejectAnimation} 2s forwards;
    }
`;

const CardContent= styled.div`
    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.size.vsmall};
    text-align: left;
    margin-top: -5px;
    position: relative;
    border-bottom-left-radius: ${({ theme }) => theme.radius.small};
    border-bottom-right-radius: ${({ theme }) => theme.radius.small};
`;

const RatingSummary = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    padding: 15px 15px 0 15px;
    margin-bottom: 15px;
`;

const CardImage = styled.img`
    width: 100%;
`;

const CardButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px;
    border: 3px solid ${({ theme }) => theme.colors.blue};
    border-radius: ${({ theme }) => theme.radius.small};
`;

const Separator = styled.div`
    width: 2px;
    background-color: ${({ theme }) => theme.colors.blue};
    border-radius: ${({ theme }) => theme.radius.small};
`;