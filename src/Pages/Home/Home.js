import React from 'react'
import './Home.css'
import {Header,Voyants} from '../../Sections/index'
import {Container,Navbar} from '../../components/index'
import {Footer} from '../../Sections/index'

const Home = () => {
return (
    <>
        <Navbar />
        <Container>
            <Header/>
            <Voyants/>
        </Container>
        <Footer />
    </>
)
}

export default Home