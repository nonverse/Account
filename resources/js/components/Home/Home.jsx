import {useSelector} from "react-redux";
import ContentContainer from "@/components/ContentContainer.jsx";

const Home = () => {

    const user = useSelector(state => state.user.value)

    return (
        <ContentContainer heading="Your Account" subHeading={`${user.name_first} ${user.name_last}'s account for all things Nonverse`} doesScroll>

        </ContentContainer>
    )
}

export default Home
