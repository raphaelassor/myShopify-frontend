import { useState } from "react";
import { useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/actions/appActions";

export const  BaseModal=({Header,Footer,children})=> {
    const [modalShow,setModalShow]=useState(false)
    const dispatch=useDispatch()

    const onCloseModal=()=>{
        setModalShow(false)
        dispatch(closeModal())
    }
    useEffect(()=>{
        setModalShow(true)
    },[])

    return (
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={onCloseModal}
      >
        <Modal.Header closeButton>
          <Header/>
        </Modal.Header>
        <Modal.Body>
         {children}
        </Modal.Body>
        <Modal.Footer>
            <div className="flex full justify-space-between">
          <button className="btn-md btn-neutral">Cancel</button>
          <Footer/>
            </div>
        </Modal.Footer>
      </Modal>
    );
  }
  
  
  