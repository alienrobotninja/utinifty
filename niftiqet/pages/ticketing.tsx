import Header from "../components/Header";
import Form from "../components/Form";
import MinterComp from "../components/MinterComp";
import {useState} from "react";

const Ticketing = () => {
    const [minterModal, setMinterModal] = useState(false)
    return (
        <div>
            {minterModal && <MinterComp/>}
            
        </div>
    );
}

export default Ticketing