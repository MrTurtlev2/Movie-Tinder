import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import StarIcon from "../assets/images/starIcon.png";
import {RatingInterface} from "../types/ratingInterface";

const Rating = ({rating}: RatingInterface) => {

    const ref = useRef<any>();
    const [height, setHeight] = useState(0)

    useEffect(() => {
        setHeight(ref?.current?.clientHeight);
    }, [])

    return (
        <RatingWrapper height={height} ref={ref}>
            <RatingIcon src={StarIcon}/>
            <p>{rating}</p>
        </RatingWrapper>
    )
}

export default Rating


const RatingWrapper = styled.div<{ height: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: ${p => p.height / 2 * -1}px;
  right: 20px;
  border-radius: ${({theme}) => theme.radius.small};
  padding: 2px 7px;
  background-color: ${({theme}) => theme.colors.blue};

  p {
    margin-left: 5px;
    font-weight: 700;
    color: ${({theme}) => theme.colors.black};
    font-size: ${({theme}) => theme.size.small};
  }
`;

const RatingIcon = styled.img`
  width: 12px;
  height: 12px;
`;