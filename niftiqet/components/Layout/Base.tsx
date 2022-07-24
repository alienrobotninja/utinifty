import Navbar from './Navbar'
import Footer from "../Footer";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

const Base = ({ children }: { children: JSX.Element }) => {
    const router = useRouter()
    const [home, setHome] = useState(true)
    useEffect(()=> {
        setHome(router.pathname === "/")
    }, [router])
  return (
      <>
          {home && <div>
              <Navbar></Navbar>
              <div className="flex flex-col justify-between min-h-screen">
                  <main>{children}</main>
              </div>
          </div>}
          <Footer />
      </>
  )
}

export default Base
