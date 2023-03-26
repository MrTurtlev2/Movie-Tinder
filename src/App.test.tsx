import React from 'react';
import {render, screen, waitFor} from "@testing-library/react";
import App from "./App";
import {store} from "./app/store";
import {Provider} from "react-redux";
import CustomButton from "./components/CustomButton";
import {CardStatus} from "./types/commonInterface";


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
        expect(buttonElement).toHaveStyle({color: `${({theme}: any) => theme.colors.green}`})
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
        expect(buttonElement).toHaveStyle({color: `${({theme}: any) => theme.colors.red}`})
        expect(buttonElement).toHaveTextContent('NO');
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
