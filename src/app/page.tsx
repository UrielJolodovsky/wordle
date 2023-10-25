import Header from '@/components/Header'
import Presentation from '@/components/Presentation'
import UnlimitedTimes from '@/components/UnlimitedTimes'
import axios from 'axios'
import Image from 'next/image'



export default function Home() {

  const GetMac = async () => {
    axios.get('http://localhost:3000/api/ip.py').then((res) => {
      console.log(res.data)
    })
  }
  return (
    <div className='w-screen h-screen bg-landingColor'>
    <Header inHome={true} />
    <Presentation />
    <UnlimitedTimes />
    </div>
  )
}
