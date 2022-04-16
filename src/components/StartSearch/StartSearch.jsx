import {ImFinder} from 'react-icons/im';
import { StartPage, Image } from "./StartSearch.styled"
export const StartSearch = ({ text }) => {
    return (
        <StartPage>
            {text}
            <Image/>
        </StartPage>
    )
}