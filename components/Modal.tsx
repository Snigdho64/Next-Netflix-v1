import React, { useEffect, useState } from 'react'
import useModal from '../hooks/useModal'
import {
  CheckIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  XIcon,
} from '@heroicons/react/solid'
import { PlayIcon as PlayOutline } from '@heroicons/react/outline'
import ReactPlayer from 'react-player/lazy'
import { Slider } from '@mui/material'
import MuiModal from '@mui/material/Modal'
import Loader from './Loader'

const Modal = () => {
  const { movie, showModal, setShowModal, setMovie, trailer, loading, genres } =
    useModal()
  const [volume, setVolume] = useState<number>(50)
  const [playing, setPlaying] = useState(false)
  const [mute, setMute] = useState(false)

  const handleClose = () => {
    setShowModal(false)
    // setMovie(null)
  }

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="absolute top-0 left-0 z-[60] flex min-h-screen w-screen items-center justify-center overflow-y-scroll overscroll-contain bg-black/20 backdrop-blur-sm scrollbar-hide"
    >
      <>
        <button
          className="min-h-8 min-w-8 md:min-h-9 md:min-w-9 absolute top-1 right-2 z-50 grid place-items-center rounded-full bg-black/10 transition hover:scale-105 hover:bg-black/50 hover:shadow-md sm:right-1 sm:top-1"
          onClick={handleClose}
        >
          <XIcon className="icon md:h-8 md:w-8 lg:h-10 lg:w-10 lg:p-1" />
        </button>
        {loading && (
          <div className="gird absolute h-[80px] w-[80px] place-items-center">
            <Loader />
          </div>
        )}
        <div className="flex h-full w-full flex-col space-y-2 sm:w-[80%] md:w-[70%] lg:w-[60%]">
          <div className="relative w-full pt-[56.25%]">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer}`}
              controls={true}
              volume={volume / 100}
              width={'100%'}
              height={'100%'}
              muted={mute}
              className="absolute top-0 left-0"
              playing={playing}
              config={{ youtube: { playerVars: { showInfo: '1' } } }}
            />
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex w-full space-x-2">
              <button
                className="modalButton"
                onClick={() => setPlaying((p) => !p)}
              >
                {playing ? (
                  <PlayOutline className="modalIcon" />
                ) : (
                  <PauseIcon className="modalIcon" />
                )}
              </button>
              <button className="modalButton">
                <PlusIcon className="modalIcon" />
              </button>
              <button className="modalButton">
                <ThumbUpIcon className="modalIcon" />
              </button>
            </div>
            <div className="flex w-3/12 items-center space-x-3">
              <button
                className="modalButton"
                onClick={() => setMute((p) => !p)}
              >
                {volume > 0 && !mute ? (
                  <VolumeUpIcon className="modalIcon" />
                ) : (
                  <VolumeOffIcon className="modalIcon" />
                )}
              </button>
              <Slider
                aria-label="Volume"
                value={volume}
                onChange={(e, v) => typeof v === 'number' && setVolume(v)}
                sx={{
                  color: '#fff',
                  '& .MuiSlider-track': {
                    border: 'none',
                  },
                  '& .MuiSlider-thumb': {
                    width: 24,
                    height: 24,
                    backgroundColor: '#fff',
                    '&:before': {
                      boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                    },
                    '&:hover, &.Mui-focusVisible, &.Mui-active': {
                      boxShadow: 'none',
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
            <div className="space-y-6 text-lg">
              <div className="flex items-center space-x-2 text-sm">
                <p className="font-semibold text-green-400">
                  {movie!.vote_average * 10}% Match
                </p>
                <p className="font-light">
                  {movie?.release_date || movie?.first_air_date}
                </p>
                <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                  HD
                </div>
              </div>
              <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                <p className="w-5/6">{movie?.overview}</p>
                <div className="flex flex-col space-y-3 text-sm">
                  <div>
                    <span className="text-[gray]">Genres:</span>{' '}
                    {genres.map((genre) => genre.name).join(', ')}
                  </div>

                  <div>
                    <span className="text-[gray]">Original language:</span>{' '}
                    {movie?.original_language}
                  </div>

                  <div>
                    <span className="text-[gray]">Total votes:</span>{' '}
                    {movie?.vote_count}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  )
}

export default Modal
