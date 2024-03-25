import React from 'react'

const Loader = () => {
    return (
        <div className='h-full flex flex-col gap-y-2 items-center justify-center'>
            <div className="three-body">
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
            </div>
        </div>
    )
}

export default Loader