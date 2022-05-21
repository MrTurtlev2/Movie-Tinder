import styled from 'styled-components';
import CustomButton from './CustomButton';

interface MoviesInterface {
    title: string,
    imageURL: string,
    summary: string,
    rating: number,
    id: string,
    poster_path: string,
    overview: string,
}

const Card = ({id, poster_path, title, overview} : MoviesInterface) => {

    const imgPath = 'https://image.tmdb.org/t/p/w500/' 

  return (
    <CardWrapper>

        <CardImage src={imgPath + poster_path} alt={title} />

        
        <CardContent>

            <span>{overview}</span>
        <CardButtonsWrapper>
            <CustomButton text='TAK' onClick={() => {}} />
            <CustomButton text='NIE' onClick={() => {}}/>
        </CardButtonsWrapper>
        </CardContent>
    </CardWrapper>
  )
}

export default Card

const CardWrapper = styled.div`
    width: 200px;
`;

const CardContent= styled.div`
    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.size.small};
    text-align: left;
    padding: 10px;
`;

const CardImage = styled.img`
    width: 100%;
`;

const CardButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;