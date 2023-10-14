import React from 'react';
import {Card, CardBody, CardHeader, Text, Container, Divider, Heading} from "@chakra-ui/react";

const TicketInfoDivCard = (props) => {

  const {item, value} = props

  return (
    <>
      <Container>
        <Card p={3} variant={'outlined'} key={item} m={2}>
          <CardHeader p={"0.5"}>
            <Heading fontSize={'sm'} textDecoration={'underline'} p={'1'}>
              {item}
            </Heading>
          </CardHeader>
          <Divider w={'35%'} color={'cyan.800'} margin={1.5}/>
          <CardBody p={'.5'} textAlign={'right'}>
            <Text>{value}</Text>
          </CardBody>
        </Card>
      </Container>
    </>

  )

}

export default TicketInfoDivCard