import React, { useEffect, useState } from 'react'
import { BellIcon, SearchIcon } from '@heroicons/react/solid'
import Link from 'next/link'

const Header = () => {
  const [activeLink, setActiveLink] = useState<string>('Home')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setIsScrolled(true)
      else setIsScrolled(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
      <div className="flex items-center space-x-2 p-5 md:space-x-10">
        <img
          src="https://rb.gy/ulxxee"
          alt=""
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <ul className="hidden space-x-5 sm:flex">
          {['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List'].map(
            (item, idx) => (
              <li
                key={idx + item}
                className={`headerLink text-shadow-md ${
                  item === activeLink && 'font-bold text-white'
                }`}
                onClick={() => setActiveLink(item)}
              >
                {item}
              </li>
            )
          )}
        </ul>
      </div>
      <div className="flex items-center space-x-5 p-5">
        <SearchIcon className="headerIcon hidden hover:text-[#1ab3b3] sm:inline" />
        <p className="headerIcon hidden text-lg lg:inline">Kids</p>
        <BellIcon className="headerIcon hidden hover:text-amber-500 sm:inline" />
        <Link href="/account">
          <img src="https://rb.gy/g1pwyx" alt="" className="headerIcon" />
        </Link>
      </div>
    </header>
  )
}

export default Header
