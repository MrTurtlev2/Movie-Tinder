export interface MoviesInterface {
    title: string,
    imageURL: string,
    summary: string,
    rating: number,
    id: string,
    poster_path: string,
    overview: string,
    index: number,
    currentCard: number,
    vote_average: number,
    onCloseMovie: () => void,
}