'use client'
import ConfirmationModal from '@/components/ConfirmationModal'
import Header from '@/components/Header'
import Presentation from '@/components/Presentation'
import { PageProvider } from '@/context/PageContext'

export default function Home() {
  return (
    <PageProvider>
      <div className='min-h-screen bg-landingColor flex flex-col'>
        <Header inHome={true} />
        <Presentation />
        <ConfirmationModal />
      </div>
    </PageProvider>
  )
}
