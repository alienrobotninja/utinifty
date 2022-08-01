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
                      {!isConnected && <button
                          className="btn"
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
                      <div className="flex justify-center">
                          <div>
                              <div className="dropdown relative">
                                  {isConnected && <button className="btn"
                                                          onClick={() => setActive(!active)}
                                  >
                                  <span className="bg-black text-white">
                                    {wallet?.activeAccount?.accountId}
                                  </span>
                                  </button>}

                                  {active && <ul
                                      className="
                                  dropdown-menu
                                  min-w-max
                                  absolute
                                  bg-black
                                  text-base
                                  z-50
                                  float-left
                                  py-2
                                  list-none
                                  text-left
                                  rounded-lg
                                  shadow-lg
                                  mt-1
                                  m-0
                                  bg-clip-padding
                                  border-none
                                "
                                      aria-labelledby="dropdownMenuButton2"
                                  >
                                      <li>
                                          <a
                                              className="
                                              dropdown-item
                                              text-sm
                                              py-2
                                              px-4
                                              font-normal
                                              block
                                              w-full
                                              whitespace-nowrap
                                              bg-transparent
                                              text-gray-700
                                              hover:text-gray-500
                                            "
                                              onClick={ () => {
                                                  wallet?.disconnect()
                                                  window.location.reload()
                                              }
                                              }
                                              href="#"
                                          >Disconnect</a
                                          >
                                      </li>
                                  </ul>}
                              </div>
                          </div>
                      </div>
                  </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Navbar
