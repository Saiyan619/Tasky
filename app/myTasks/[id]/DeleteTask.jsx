import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function DeleteTask({deleteATask}) {
  const {isOpen, onOpen, onClose} = useDisclosure();


  return (
    <div>
      <div className="flex flex-wrap gap-3">
       
          <Button color="danger" onPress={onOpen}>Delete Task</Button>
      </div>
      <Modal 
        size='3xl'
        isOpen={isOpen} 
              onClose={onClose} 
              placement="top-center"
        scrollBehavior="inside"
        backdrop='blur'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete Task?</ModalHeader>
              <ModalBody>
                              <p>Are you sure want to delete this Task?.This action cannot be undone</p>
                        
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
                <Button onClick={deleteATask} color="danger">
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
