import React, { useMemo, useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
  background,
} from "@chakra-ui/react";
import { useGetCustomers } from "../../hooks";
import { Text, Flex, Avatar } from '@chakra-ui/react'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'


const CustomerSearchModal = ({ isOpen, onClose, onCustomerSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");

const {data: customerData, status: customerStatus} = useGetCustomers();
let customerList = useMemo(() => [], [])

useEffect( () => {
  if (customerData) {
    customerData.forEach((c)=> {
      customerList.push({
        value: c.id,
        label: `${c.firstName} ${c.lastName}`
      })
    })
  }

}, [customerData, customerList])
  
  const [pickerItems, setPickerItems] = React.useState(customerList);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleCreateItem = (item) => {
    setPickerItems((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
      setSearchQuery(selectedItems)
    }
  };

  const customRender = (selected) => {
    return (
      <Flex flexDir="row" alignItems="center" _dark={{background: "grey.300"}} colorScheme={'blue'}>
        <Avatar mr={2} size={'sm'} name={selected.label} />
        <Text>{selected.label}</Text>
      </Flex>
    )
  }

  
  const customCreateItemRender = (value) => {
    return (
      <Text>
        <Box as='span'>Create</Box>{' '}
        <Box as='span' bg='red.300' fontWeight='bold'>
          "{value}"
        </Box>
      </Text>
    )
  }

  const handleSearch = () => {

   onCustomerSelect(searchQuery)
  }

  if (customerStatus === "error") {
    return <><h1>Error</h1>
    <p>An error occurred while loading customers. Please try again later.</p>
    </>
    }
    if (customerStatus === "loading") {
      return <h1>Loading...</h1>
    }
  if(customerStatus !== "loading"){
      console.log(customerData)
    
      return (
          <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Search Customers</ModalHeader>
        <ModalBody>
       

      <CUIAutoComplete
            tagStyleProps={{
              rounded: 'full'
            }}
            label="Choose a customer"
            placeholder="Type a Name"
            onCreateItem={handleCreateItem}
            items={pickerItems}
            disableCreateItem={true}
            value={searchQuery}
            itemRenderer={customRender}
            createItemRenderer={customCreateItemRender}
            selectedItems={selectedItems}
            onSelectedItemsChange={(changes) =>
              handleSelectedItemsChange(changes.selectedItems)
              
            }
          />
        </ModalBody>
        <ModalFooter>
          <Button type='submit' colorScheme="blue" mr={3} onClick={handleSearch}>
            Search
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
};

export default CustomerSearchModal;
