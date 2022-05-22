import styled from "styled-components";
import StarIcon from "../assets/images/StarIcon";
import { RatingInterface } from "../types/ratingInterface";

const Rating = ({rating} : RatingInterface) => {
  return (
    <RatingWrapper>
        <StarIcon />
        <p>{rating}</p>
    </RatingWrapper>
  )
}

export default Rating


const RatingWrapper = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   position: absolute;
   top: -50%;
   right: 20px;
`;