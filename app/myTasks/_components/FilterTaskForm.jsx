import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
  } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import {Select, SelectItem} from "@nextui-org/react";


  
export default function FilterTaskForm({
    searchFilter,
setSearchFilter,
priorityFilter,
setPriorityFilter,
statusFilter,
    setStatusFilter,
    getFilteredTask,
logger
}) {
    // const [value, setValue] = React.useState("");

    const handleSelectionChange = (e) => {
        setPriorityFilter(e.target.value);
    };
    const handleSelectionChangeStatus = (e) => {
        setStatusFilter(e.target.value);
    };


    const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
    return (
      <>
        <Button onPress={onOpen}>Search Task</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Find Task</ModalHeader>
                <ModalBody>
                <div className="w-full flex flex-col gap-2">
      <Input label="Search by Keyword" placeholder="Search By Keyword" value={searchFilter} onValueChange={setSearchFilter} />
      <p className="text-default-500 text-small">Input value: {searchFilter}</p>
    </div>
                <div className="flex w-full flex-col gap-2">
      <Select
        className=""
        label="Priority"
        placeholder="Select Priority"
        selectedKeys={[priorityFilter]}
        variant="bordered"
        onChange={handleSelectionChange}
      >
        <SelectItem key="low">
            Low
                      </SelectItem>
                      
                      <SelectItem key="medium">
            Medium
                      </SelectItem>

                      <SelectItem key="high">
            High
            
          </SelectItem>
      </Select>
      <p className="text-small text-default-500">Selected: {priorityFilter}</p>
                                </div>
                                
                                <div className="flex w-full flex-col gap-2">
      <Select
        className=""
        label="Status"
        placeholder="Select Status"
        selectedKeys={[statusFilter]}
        variant="bordered"
        onChange={handleSelectionChangeStatus}
      >
         <SelectItem key="pending">
           Pending
                      </SelectItem>
                      
                      <SelectItem key="ongoing">
           Ongoing
                      </SelectItem>
                      
                      <SelectItem key="completed">
           Completed
                      </SelectItem>
                      
                      <SelectItem key="failed">
           Failed
          </SelectItem>
      </Select>
      <p className="text-small text-default-500">Selected: {statusFilter}</p>
                                </div>
                                
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button onClick={getFilteredTask}  color="primary">
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  