import React from 'react'
import Header from '../components/Header'
import Speciality from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/banner'
import Footer from '../components/Footer'
const Home = () => {
  return (
    <div>
      <Header />
    <Speciality />
    <TopDoctors />
    <Banner />
    <Footer />
    </div>
  )
}

export default Home