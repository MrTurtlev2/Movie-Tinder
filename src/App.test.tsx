import React from 'react';
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import App from "./App";
import {store} from "./app/store";
import {Provider} from "react-redux";
import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import CustomButton from "./components/CustomButton";
import {CardStatus} from "./types/commonInterface";
import {keyframes} from "styled-components";
import {fadeIn} from "react-animations";
import Card from "./components/Card";
import {theme} from "./constants/theme";
import StarIcon from "./assets/images/StarIcon.png";


const mockObject = {
    id: '5',
    poster_path: 'http://dump',
    title: 'test title',
    overview: 'test description',
    vote_average: 8.4,
    release_date: "2023-02-22",
    imageURL: 'sss',
    summary: 'test summary',
    rating: 7.8,
    index: 7,
    currentCard: 0,
    onCloseMovie: () => null
}

describe("App component", () => {
    it("should render App component correctly", () => {
        render(
            <Provider store={store}>
                <App/>
            </Provider>);
        const appElement = screen.queryByTestId('app');
        expect(appElement).toBeInTheDocument();
    });
});
describe("Decision button", () => {
    it("makes text green when accepting movie", () => {
        render(
            <CustomButton text={'YES'}
                          className={CardStatus.Accepted}
                          onClick={() => null}
            />
        )

        const buttonElement = screen.queryByTestId('decision-button');
        expect(buttonElement).toHaveStyle({color: `${theme.colors.green}`})
        expect(buttonElement).toHaveTextContent('YES');
    })
    it("makes text green when rejecting movie", () => {
        render(
            <CustomButton text={'NO'}
                          className={CardStatus.Rejected}
                          onClick={() => null}
            />
        )

        const buttonElement = screen.queryByTestId('decision-button');
        expect(buttonElement).toHaveStyle({color: `${theme.colors.red}`})
        expect(buttonElement).toHaveTextContent('NO');
    })
    it("sends post requests", () => {
        const mock = new MockAdapter(axios);
        render(
            <Provider store={store}>
                <CustomButton text={'NO'}
                              className={CardStatus.Rejected}
                              onClick={() => null}
                />
            </Provider>
        )
        const buttonElement = screen.queryByTestId('decision-button');
        // @ts-ignore
        fireEvent.click(buttonElement);
        mock.onPost('https://api.themoviedb.org/3/recomendations/804150/Idle').reply(401, {});

    })
})
it('App fetches data from api', async () => {
    render(
        <Provider store={store}>
            <App/>
        </Provider>
    );
    await waitFor(() => expect(store.getState().movies.movies.length).toBeGreaterThan(0))
});

it('Card component should animate', () => {


    render(
        <Provider store={store}>
            <Card {...mockObject}/>
        </Provider>
    )
    const animatedCard = screen.queryByTestId('decision-button');
    const cardAppearAnimation = keyframes`${fadeIn}`;


    expect(animatedCard).toHaveStyle(`animation-name: ${cardAppearAnimation}`);
    expect(animatedCard).toHaveStyle('animation-duration: 2s');
    expect(animatedCard).toHaveStyle('animation-timing-function: forwards');
})

it('Card should have movie description', () => {
    render(
        <Provider store={store}>
            <Card {...mockObject}/>
        </Provider>
    )
    const movieCardDescription = screen.queryByTestId('card-description');
    expect(movieCardDescription?.textContent?.length).toBeGreaterThan(0)
});
it('Rating image should be in PNG extension', () => {
    render(
        <Provider store={store}>
            <Card {...mockObject}/>
        </Provider>
    )
    const extension = StarIcon.split('.').pop();
    expect(extension).toBe('png');
});


