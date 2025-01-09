import React, {useState} from "react";

const COLORS = {
    red: "bg-red-500",
    green: "bg-green-500"
};

function Lego({colors = "red", children, onClick}) {
    const [value, setValue] = useState(0);

    console.log("Render", value);

    let classes = "h-16 w-32 mb-2 text-align-center text-white flex justify-center items-center";

    return <div className={`${classes} ${COLORS[colors]}`}
                onClick={() => {
                    onClick?.("mon super paramètre");
                    setValue(20);
                }}
    >
        {children ? (
            <buton className={`bg-amber-50 rounded-lg text-black p-2 shadow-sm shadow-black`}>
                {children}
            </buton>) :
            ("Hello")
        }

    </div>
}

export default Lego;