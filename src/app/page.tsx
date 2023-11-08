'use client'
import ConfirmationModal from '@/components/ConfirmationModal'
import Header from '@/components/Header'
import Presentation from '@/components/Presentation'
import UnlimitedTimes from '@/components/UnlimitedTimes'
import { PageProvider } from '@/context/PageContext'
import axios from 'axios'
import Image from 'next/image'
import { Fragment } from 'react'



export default function Home() {

  return (
    <PageProvider>
    {/* <Fragment> */}
    <div className='w-screen h-screen bg-landingColor'>
    <Header inHome={true} />
    <Presentation />
    <UnlimitedTimes />
    <ConfirmationModal />
    </div>
    {/* </Fragment> */}
    </PageProvider>
  )
}
