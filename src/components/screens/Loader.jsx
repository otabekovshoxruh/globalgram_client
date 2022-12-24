import React from "react";

function Loader() {
    return (
        <div className="progress w-[500px] m-auto" style={{marginTop: "20%"}}>
            <div className="indeterminate"></div>
        </div>
    );
}

export default Loader;