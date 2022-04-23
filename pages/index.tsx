import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/Banner'
import { default as MoviesCategory } from '../components/CategoryMovies'
import Header from '../components/Header'
import Modal from '../components/Modal'
import useModal from '../hooks/useModal'
import { CategoryMovies } from '../types/types'
import getCategoryMovies from '../utils/apiRequests'

const Home: NextPage<{ categoryMovies: CategoryMovies }> = ({
  categoryMovies,
}) => {
  const { showModal } = useModal()
  return (
    <div
      className={`relative min-h-screen bg-gradient-to-b ${
        showModal && ''
      }`}
    >
      <Head>
        <title>Next Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="bg-24 relative h-full w-full pt-10">
        <Banner netflixOriginals={categoryMovies.netflixOriginals} />
        <MoviesCategory categoryMovies={categoryMovies} />
      </main>
      {showModal && <Modal />}
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const categoryMovies = (await getCategoryMovies()) as CategoryMovies
  return {
    props: {
      categoryMovies,
    },
  }
}
