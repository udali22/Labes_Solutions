import React from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Doctors = () => {
  const { speciality } = useParams()
  const {doctors} = useContext(AppContext)
  const [filterDoc, setFilterDoc] = useState([])
  const navigate = useNavigate()
  const applyFilter = () => {
    if(speciality){
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality))
    }
    else{
      setFilterDoc(doctors)
    }
  }
  useEffect(() => {
    applyFilter()
  }, [doctors ,speciality])
  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors Speciality</p>
    <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
      <div className='flex-col text-sm text-gray-600'>
        <p onClick={()=>speciality ==='General physician'? navigate('/doctors'): navigate('/doctors/General physician  ')} className={'w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer mb-4 '}>General physician</p>
        <p onClick={()=>speciality ==='Gynecologist'? navigate('/doctors') : navigate('/doctors/Gynecologist ')} className={'w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer mb-4'}>Gynecologist</p>
        <p onClick={()=>speciality ==='Dermatologist'? navigate('/doctors') : navigate('/doctors/Dermatologist ')} className={'w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer mb-4'}>Dermatologist</p>
        <p onClick={()=>speciality ==='Neurologist'? navigate('/doctors') : navigate('/doctors/Neurologist' )} className={'w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer mb-4'}>Neurologist</p>
        <p onClick={()=>speciality ==='Gastroenterologist'? navigate('/doctors') : navigate('/doctors/Gastroenterologist ')} className={'w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer mb-4'}>Gastroenterologist</p>
      </div>
      <div className='w-full grid grid-cols-auto gap-4 gap-y-6 '>
        {filterDoc.map((item, index) => (
          <div 
  onClick={() => navigate(`/appointment/${item._id}`)} 
  className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500" 
  key={index}
>            <img className="bg-blue-50" src={item.image} alt="" />
            <div className='p-4'> 
              <div className='flex items-center gap-2 text-sm text-center text-green-500'>
               <p className='w-2 h-2 bg-green-500 rounded-full'></p> 
               <p>Available</p>
              </div>
               <p className='text-gray-900 text-lg font-medium '>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          
        ))}
      </div>
    </div>
 </div>
  )
}

export default Doctors