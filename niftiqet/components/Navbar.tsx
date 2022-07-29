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
              <span className="text-gray-200 no-underline flex justify-center items-center">
                  Home
              </span>
              <ul className="link-list">
                <li>
                    {!isConnected && <button className="btn"
                        onClick={
                            isConnected
                                ? () => {
                                    wallet?.disconnect()
                                    window.location.reload()
                                }
                                : () => {
                                    wallet?.connect({ requestSignIn: true })
                                }
                        }
                    >
                  <span className="bg-black text-white">
                    {isConnected ? 'Disconnect' : 'Connect'}
                  </span>
                    </button> }
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Navbar
