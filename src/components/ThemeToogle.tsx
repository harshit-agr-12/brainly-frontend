import {motion} from "motion/react"
import { useState } from "react";

function ThemeToogle() {

    const [isOn , setIsOn] = useState(false);

    const toggleSwitch = () => setIsOn(!isOn);

    return (
        <motion.button
            className={`w-20 h-10 bg-purple-950 rounded-[50px] cursor-pointer flex p-2 ${isOn ? "justify-start" : "justify-end"} items-center opacity-80 `}
    
            onClick={toggleSwitch}
        >
            <motion.div
                className='w-7 h-7 bg-purple-600 rounded-full '
                layout
                transition={{
                    type : 'spring',
                    visualDuration : 0.2,
                    bounce : 0.2,
                }}
            />
        </motion.button>
      )
}

export default ThemeToogle