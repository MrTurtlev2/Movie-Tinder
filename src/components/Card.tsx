import {useEffect, useRef, useState} from 'react';
import styled, {keyframes} from 'styled-components';
import {MoviesInterface} from '../types/cardInterface';
import CustomButton from './CustomButton';
import Rating from './Rating';
import {bounceOutLeft, bounceOutRight, fadeIn} from 'react-animations'
import {useAppDispatch} from '../app/hooks';
import {choseMoviesAsync} from '../services/movieService';
import {useSwipeable} from 'react-swipeable';
import {CardStatus} from "../types/commonInterface";

const Card = ({
                  id,
                  poster_path,
                  title,
                  overview,
                  onCloseMovie,
                  currentCard,
                  vote_average,
                  release_date
              }: MoviesInterface) => {

    const imgPath = 'https://image.tmdb.org/t/p/w500/' + poster_path;

    const [decision, setDecision] = useState(CardStatus.Idle);
    const [height, setHeight] = useState(0)

    const dispatch = useAppDispatch();
    const ref = useRef<any>();


    const handleAnimation = (direction: any) => {
        setDecision(direction)
        dispatch(choseMoviesAsync({id, decision: decision}));
        onCloseMovie();
    }


    useEffect(() => {
        setHeight(ref?.current?.clientHeight);
    }, [])

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            setDecision(CardStatus.Rejected)
            handleAnimation(CardStatus.Rejected)
        },
        onSwipedRight: () => {
            setDecision(CardStatus.Accepted)
            handleAnimation(CardStatus.Accepted)
        },
    });

    return (
        <CardMain currentCard={currentCard}>
            <CardBackground className={decision} imgPath={imgPath}/>
            <CardWrapper className={decision} {...handlers}>
                <CardImage src={imgPath} alt={title}/>
                <CardContent>
                    <CardTitle height={height} ref={ref}>{title}</CardTitle>
                    <Rating rating={vote_average}/>
                    <CardSummary>
                        <p>{release_date.slice(0, 4)}</p>
                        <p>{overview}</p>
                    </CardSummary>
                    <CardButtonsWrapper>
                        <CustomButton
                            className={decision === CardStatus.Rejected ? 'reject' : ''}
                            text='NO'
                            onClick={() => handleAnimation(CardStatus.Rejected)}
                        />
                        <Separator/>
                        <CustomButton
                            className={decision === CardStatus.Accepted ? 'accept' : ''}
                            text='YES'
                            onClick={() => handleAnimation(CardStatus.Accepted)}
                        />
                    </CardButtonsWrapper>
                </CardContent>
            </CardWrapper>
        </CardMain>
    )
}

export default Card

const groundAppearAnimation = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const cardAppearAnimation = keyframes`${fadeIn}`;

const cardAcceptAnimation = keyframes`${bounceOutRight}`;

const cardRejectAnimation = keyframes`${bounceOutLeft}`;


const CardMain = styled.div<{ currentCard: number }>`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardBackground = styled.div<{ imgPath: string }>`
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

  &.Idle {
    animation: ${groundAppearAnimation} 2s forwards;
  }
`;

const CardWrapper = styled.div`
  width: calc(100vw - 130px);
  max-width: 500px;

  &.Idle {
    animation: ${cardAppearAnimation} 2s forwards;
  }

  &.Accepted {
    animation: ${cardAcceptAnimation} 2s forwards;
  }

  &.Rejected {
    animation: ${cardRejectAnimation} 2s forwards;
  }
`;

const CardContent = styled.div`
  background-color: ${({theme}) => theme.colors.black};
  color: ${({theme}) => theme.colors.white};
  font-size: ${({theme}) => theme.size.vsmall};
  text-align: left;
  margin-top: -5px;
  position: relative;
  border-bottom-left-radius: ${({theme}) => theme.radius.small};
  border-bottom-right-radius: ${({theme}) => theme.radius.small};
`;

const CardTitle = styled.p<{ height: number }>`
  font-size: ${({theme}) => theme.size.large};
  font-weight: ${({theme}) => theme.weight.bold};
  color: ${({theme}) => theme.colors.blue};
  position: absolute;
  top: ${p => (p.height - 4) * -1}px;
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
  font-size: ${({theme}) => theme.size.small};

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
  border: 3px solid ${({theme}) => theme.colors.blue};
  border-radius: ${({theme}) => theme.radius.small};
`;

const Separator = styled.div`
  width: 2px;
  background-color: ${({theme}) => theme.colors.blue};
  border-radius: ${({theme}) => theme.radius.small};
`;