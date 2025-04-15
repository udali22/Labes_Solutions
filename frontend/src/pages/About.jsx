import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>
     <div className='text-center text-2xl pt-10 text-gray-500'>
  <p>ABOUT <span className='text-gary-700 font-medium'>US</span></p>
</div>

<div className='my-10 flex flex-col md:flex-row gap-12'>
  <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
  <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
  <p>Welcome to Labes, your go-to platform for cutting-edge technology and innovation. At Labes, we are passionate about creating meaningful experiences that connect people and enhance lives through our products and services. Our team of dedicated professionals is committed to delivering high-quality solutions tailored to meet the unique needs of our clients. Whether you're an individual, a startup, or a large enterprise, we work closely with you to help you achieve your goals and stay ahead in today's fast-paced world. Thank you for choosing us to be part of your journey!</p>
  <p>We believe in the power of collaboration and continuously strive to create an environment where creativity and innovation can flourish. Our mission is to make technology accessible, impactful, and transformative, with a focus on sustainable and responsible growth.</p>
  <b className='text-gray-800 '> Our Vision </b>
  <p>At Labes, we're more than just a company; we're a community of like-minded individuals working together to make a difference. Join us and experience the future of technology!</p>
</div>


      </div>
      <div>
<p className='mb-4'>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
  <div className='border px-10 md:px-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Efficiency : </b>
          <p>Stremlined appointment scheduling that fits into your busy lifestyle </p>
        </div >
        <div className='border px-10 md:px-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>          <b>Convenience : </b>
          <p>Access to a network of trusted healthcare professionals in your area</p>
        </div>
        <div className='border px-10 md:px-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>          <b>Personalization : </b>
          <p>Tailored recommendations and reminders to help you stay on top of your health </p>
        </div>
      </div>
    </div>
  )
}

export default About