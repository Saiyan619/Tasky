import React from 'react'

const ModalError = ({openModal}) => {
  return (
    <div>
<button className="btn hidden" onClick={openModal}>open modal</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Error!</h3>
    <p className="py-4">You did not add atleast one Interest.</p>
    <div className="modal-action">
      <form method="dialog">
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </div>
  )
}

export default ModalError
