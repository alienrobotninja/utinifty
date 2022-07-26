import Link from 'next/link'
import {useWallet} from "../services/providers/MintbaseWalletContext";
import {useState} from "react";

const Navbar = () => {
  const { wallet, isConnected, details } = useWallet()
  const [active, setActive] = useState(false)
  return (
      <div className="px-6 sticky top-0 z-40 home-nav">
        <div className="hidden lg:contents">
          <div className='relative flex flex-col gap-24 h-12'>
            <div className="flex justify-between items-center">
              <Link href="/" passHref>
                <a className="text-gray-200 no-underline flex justify-center items-center">
                  Home
                </a>
              </Link>
              <ul className="link-list">
                <li>
                  <span className="text-gray-200"
                  >Welcome {wallet?.activeAccount?.accountId}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Navbar
