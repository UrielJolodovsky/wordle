'use client'
import ConfirmationModal from '@/components/ConfirmationModal'
import Header from '@/components/Header'
import Presentation from '@/components/Presentation'
import UnlimitedTimes from '@/components/UnlimitedTimes'
import useModal from '@/hooks/useModal'
import axios from 'axios'
import Image from 'next/image'
import { Fragment, useState } from 'react'



export default function Home() {

  const showModal = useModal()

  return (
    <Fragment>
    <div className='w-screen h-screen bg-landingColor'>
    <Header inHome={true} />
    <Presentation pressed={false}/>
    <UnlimitedTimes />
    <ConfirmationModal isOpen={showModal}/>
    </div>
    </Fragment>
  )
}
