import React from 'react'
import "./SnackBar.css"
interface PropTypes {
    children: React.ReactNode;
    show: boolean
}
const SnackBar = ({ children, show }: PropTypes) => {
    const style = show ? "snackbar snackbar__show" : "snackbar snackbar__hide"
    return (
        <div className='snack-wrap'>
            <div className={style}>
                {children}
            </div>
        </div>
    )
}

export default SnackBar