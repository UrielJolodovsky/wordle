import Header from '@/components/Header'
import Presentation from '@/components/Presentation'
import UnlimitedTimes from '@/components/UnlimitedTimes'
import Image from 'next/image'



export default function Home() {
  return (
    <div className='w-screen h-screen bg-landingColor'>
    <Header inHome={true} />
    <Presentation />
    <UnlimitedTimes />
    </div>
  )
}
