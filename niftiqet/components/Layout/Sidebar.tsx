import Link from 'next/link'
import Container from './Container'
import {useWallet} from "../../services/providers/MintbaseWalletContext";
import {useState} from "react";

const Sidebar = () => {
    const { wallet, isConnected, details } = useWallet()
    const [active, setActive] = useState(false)
    return (
        <div className="sidebar h-screen flex flex-col p-7">
            <div className="top--part text-lg text-white h-14">
                NIFTIQET
            </div>
            <div className="side--links">
                <ul className="flex flex-col text-white">
                    <li className="active--link">
                        <a href="">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.95703 10.7551H7.95703C9.95703 10.7551 10.957 9.75513 10.957 7.75513V5.75513C10.957 3.75513 9.95703 2.75513 7.95703 2.75513H5.95703C3.95703 2.75513 2.95703 3.75513 2.95703 5.75513V7.75513C2.95703 9.75513 3.95703 10.7551 5.95703 10.7551Z" fill="#67D2E1" stroke="#67D2E1" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M17.957 10.7551H19.957C21.957 10.7551 22.957 9.75513 22.957 7.75513V5.75513C22.957 3.75513 21.957 2.75513 19.957 2.75513H17.957C15.957 2.75513 14.957 3.75513 14.957 5.75513V7.75513C14.957 9.75513 15.957 10.7551 17.957 10.7551Z" stroke="#67D2E1" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M17.957 22.7551H19.957C21.957 22.7551 22.957 21.7551 22.957 19.7551V17.7551C22.957 15.7551 21.957 14.7551 19.957 14.7551H17.957C15.957 14.7551 14.957 15.7551 14.957 17.7551V19.7551C14.957 21.7551 15.957 22.7551 17.957 22.7551Z" stroke="#67D2E1" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5.95703 22.7551H7.95703C9.95703 22.7551 10.957 21.7551 10.957 19.7551V17.7551C10.957 15.7551 9.95703 14.7551 7.95703 14.7551H5.95703C3.95703 14.7551 2.95703 15.7551 2.95703 17.7551V19.7551C2.95703 21.7551 3.95703 22.7551 5.95703 22.7551Z" stroke="#67D2E1" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.967 19.2652L16.017 14.3152" stroke="#A4B1B1" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16.017 14.3151L12.477 17.8551C11.697 18.6351 10.427 18.6351 9.64703 17.8551L5.40702 13.6151C4.62702 12.8351 4.62702 11.5651 5.40702 10.7851L12.477 3.71513C13.257 2.93513 14.527 2.93513 15.307 3.71513L19.547 7.95515C20.327 8.73515 20.327 10.0051 19.547 10.7851L16.017 14.3151Z" stroke="#A4B1B1" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M2.95703 21.7551H8.95703" stroke="#A4B1B1" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7.51703 8.67505L14.587 15.745" stroke="#A4B1B1" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Collections</span>
                        </a>
                    </li>
                    <li>
                        <span className="text-white block my-5 text-xs font-bold">MANAGE</span>
                    </li>
                    <li>
                        <a href="">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.957 11.4053H7.95703" stroke="#768080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M2.95703 11.4052V6.78522C2.95703 4.74522 4.60703 3.09521 6.64703 3.09521H12.267C14.307 3.09521 15.957 4.36521 15.957 6.40521" stroke="#768080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M18.437 12.4553C17.937 12.9353 17.697 13.6752 17.897 14.4352C18.147 15.3652 19.067 15.9553 20.027 15.9553H20.957V17.4053C20.957 19.6153 19.167 21.4053 16.957 21.4053H6.95703C4.74703 21.4053 2.95703 19.6153 2.95703 17.4053V10.4053C2.95703 8.19527 4.74703 6.40527 6.95703 6.40527H16.957C19.157 6.40527 20.957 8.20527 20.957 10.4053V11.8552H19.877C19.317 11.8552 18.807 12.0753 18.437 12.4553Z" stroke="#768080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M22.9571 12.875V14.935C22.9571 15.495 22.497 15.955 21.927 15.955H19.997C18.917 15.955 17.9271 15.165 17.8371 14.085C17.7771 13.455 18.017 12.865 18.437 12.455C18.807 12.075 19.317 11.855 19.877 11.855H21.927C22.497 11.855 22.9571 12.315 22.9571 12.875Z" stroke="#768080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Wallet</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.817 8.34521C20.817 8.76521 20.787 9.17522 20.737 9.56522C20.277 9.36522 19.777 9.25522 19.247 9.25522C18.027 9.25522 16.947 9.84521 16.277 10.7452C15.597 9.84521 14.517 9.25522 13.297 9.25522C11.247 9.25522 9.58704 10.9252 9.58704 12.9952C9.58704 15.6752 11.007 17.7252 12.587 19.1152C12.537 19.1452 12.487 19.1552 12.437 19.1752C12.137 19.2852 11.637 19.2852 11.337 19.1752C8.74704 18.2852 2.95703 14.6052 2.95703 8.34521C2.95703 5.58521 5.17702 3.35522 7.91702 3.35522C9.54702 3.35522 10.987 4.13521 11.887 5.34521C12.797 4.13521 14.237 3.35522 15.857 3.35522C18.597 3.35522 20.817 5.58521 20.817 8.34521Z" stroke="#768080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M22.957 12.9951C22.957 17.6751 18.627 20.4351 16.687 21.0951C16.457 21.1751 16.087 21.1751 15.857 21.0951C15.027 20.8151 13.757 20.1451 12.587 19.1151C11.007 17.7251 9.58704 15.6751 9.58704 12.9951C9.58704 10.9251 11.247 9.25513 13.297 9.25513C14.517 9.25513 15.597 9.84512 16.277 10.7451C16.947 9.84512 18.027 9.25513 19.247 9.25513C19.777 9.25513 20.277 9.36512 20.737 9.56512C22.047 10.1451 22.957 11.4551 22.957 12.9951Z" stroke="#768080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Favourites</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.957 12.2551C22.957 17.7751 18.477 22.2551 12.957 22.2551C7.43703 22.2551 2.95703 17.7751 2.95703 12.2551C2.95703 6.73513 7.43703 2.25513 12.957 2.25513C18.477 2.25513 22.957 6.73513 22.957 12.2551Z" stroke="#768080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16.667 15.4351L13.567 13.5851C13.027 13.2651 12.587 12.4951 12.587 11.8651V7.76514" stroke="#768080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>History</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.95703 9.36523V15.1352C3.95703 17.2552 3.95703 17.2552 5.95703 18.6052L11.457 21.7852C12.287 22.2652 13.637 22.2652 14.457 21.7852L19.957 18.6052C21.957 17.2552 21.957 17.2552 21.957 15.1452V9.36523C21.957 7.25523 21.957 7.25523 19.957 5.90523L14.457 2.72523C13.637 2.24523 12.287 2.24523 11.457 2.72523L5.95703 5.90523C3.95703 7.25523 3.95703 7.25523 3.95703 9.36523Z" stroke="#768080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12.957 15.2551C14.6139 15.2551 15.957 13.912 15.957 12.2551C15.957 10.5983 14.6139 9.25513 12.957 9.25513C11.3002 9.25513 9.95703 10.5983 9.95703 12.2551C9.95703 13.912 11.3002 15.2551 12.957 15.2551Z" stroke="#768080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Settings</span>
                        </a>
                    </li>
                    <li><span className="mt-7 block text-white text-xs font-bold">OTHER</span></li>
                    <li>
                        <a href="">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.311 15.6091C19.6742 16.2673 17.8801 16.43 16.1517 16.0768C14.4232 15.7237 12.8366 14.8704 11.5892 13.623C10.3417 12.3755 9.48842 10.7889 9.1353 9.06048C8.78217 7.33202 8.94482 5.5379 9.60302 3.90112C7.66473 4.68185 6.05839 6.11251 5.05935 7.94784C4.06031 9.78317 3.73081 11.9089 4.12734 13.9605C4.52386 16.0122 5.62171 17.862 7.23268 19.1929C8.84365 20.5238 10.8674 21.2529 12.957 21.2551C14.7539 21.2552 16.5098 20.7175 17.9986 19.7113C19.4874 18.7051 20.641 17.2765 21.311 15.6091Z" stroke="#768080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M21.9377 12.8442C22.0208 11.5777 21.8351 10.308 21.3927 9.11832C20.9503 7.92867 20.2613 6.84604 19.3709 5.94151C18.4806 5.03698 17.4089 4.33101 16.2264 3.86994C15.0439 3.40888 13.7772 3.20315 12.5095 3.26626" stroke="#768080" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            <span>Light Mode</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
