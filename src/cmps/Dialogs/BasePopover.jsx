import { useState,useEffect } from 'react';
import Popover from '@material-ui/core/Popover';
import { utilService } from '../../services/utilService';
import { useDispatch } from 'react-redux';
import { closeDialog } from '../../store/actions/appActions';



export const BasePopover = ({elPos,children}) => {

    const [isPopoverShow, setPopoverShow] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setPopoverShow(true)
    }, [])

    const handleClose = () => {
        setPopoverShow(false)
        dispatch(closeDialog())
    }

const pos ={
    left:elPos.left,
    top:elPos.bottom + 4
}

    return (
        <div>
            <Popover
                id={utilService.makeId()}
                open={isPopoverShow}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={{ top: pos.top, left: pos.left }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {children}
            </Popover>
        </div>
    );
}