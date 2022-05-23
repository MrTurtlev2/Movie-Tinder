import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { MoviesInterface } from '../types/cardInterface';
import CustomButton from './CustomButton';
import Rating from './Rating';
import { fadeIn, bounceOutLeft, bounceOutRight } from 'react-animations'
import { useAppDispatch } from '../app/hooks';
import { choseMoviesAsync } from '../services/movieService';
import { useSwipeable } from 'react-swipeable';

enum CardStatus {
    Accepted = 'Accepted',
    Rejected = 'Rejected',
    Idle = 'Idle'
}

const Card = ({id, poster_path, title, overview, onCloseMovie, currentCard, vote_average, release_date} : MoviesInterface) => {

    const imgPath = 'https://image.tmdb.org/t/p/w500/' + poster_path;

    const [desicion, setDesicion] = useState(CardStatus.Idle);
    const [height, setHeight] = useState(0)

    const dispatch = useAppDispatch();
    const ref = useRef<any>();


    const handleAnimation = (direction : any) => {
        setDesicion(direction)
        dispatch(choseMoviesAsync({id, desicion}));
        onCloseMovie();
    }

  
    useEffect(()=> {
      setHeight(ref?.current?.clientHeight);
    },[])

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            setDesicion(CardStatus.Rejected)
            handleAnimation(CardStatus.Rejected)
        },
        onSwipedRight: () => {
            setDesicion(CardStatus.Accepted)
            handleAnimation(CardStatus.Accepted)
        },
    });

    return (
        <CardMain currentCard={currentCard}>
            <CardBackground imgPath={imgPath} />
            <CardWrapper className={desicion} {...handlers}>
                <CardImage src={imgPath} alt={title} />
                <CardContent>
                    <CardTitle height={height} ref={ref}>{title}</CardTitle>
                    <Rating rating={vote_average} />
                    <CardSummary>
                        <p>{release_date.slice(0, 4)}</p>
                        <p>{overview}</p>
                    </CardSummary>
                <CardButtonsWrapper>
                    <CustomButton 
                        className={desicion === 'Rejected' ? 'reject' : ''}
                        text='NO'
                        onClick={()=> handleAnimation(CardStatus.Rejected)}
                    />
                    <Separator />
                    <CustomButton
                        className={desicion === 'Accepted' ? 'accept' : ''}
                        text='YES'
                        onClick={()=> handleAnimation(CardStatus.Accepted)}
                    />
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


const CardMain = styled.div<{currentCard: number}>`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CardBackground = styled.div<{imgPath : string}>`
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
    ::before {
        content: "";
        position: absolute;
        width: 100vw;
        height: 100vh;
        backdrop-filter: blur(5px);
    }
`;

const CardWrapper = styled.div`
    width: calc(100vw - 130px);
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

const CardTitle = styled.p<{height : number}>`
    font-size: ${({ theme }) => theme.size.large};
    font-weight: ${({ theme }) => theme.weight.bold};
    color: ${({ theme }) => theme.colors.blue};
    position: absolute;
    top: ${p => (p.height - 4) * -1 }px;
    left: 10px;
    max-width: 60%;
    text-transform: uppercase;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const CardSummary = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    padding: 20px 15px 0 15px;
    margin-bottom: 15px;
    font-size: ${({ theme }) => theme.size.small};
    p {
        &:first-of-type {
            margin-bottom: 5px !important;
        }
    }
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