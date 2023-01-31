
import { Pagination } from '@/components/Pagination';
import { Sidebar } from '@/components/Sidebar';
import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from '@chakra-ui/react';
import Link from 'next/link';
import { RiAddLine } from 'react-icons/ri';
import { useQuery } from 'react-query'

export default function UserList() {

  const { data, isLoading, error } = useQuery('users', async () => {
    const response = await fetch('http://localhost:3000/api/users')
    const data = await response.json()

    return data
  })


  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })


  return (
    <Box>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Usuários</Heading>

            <Button
              as={Link}
              size="sm"
              fontSize="sm"
              colorScheme="pink"
              leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              href="/users/create"
            >
              Criar Novo
            </Button>


            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="pink"
              leftIcon={<Icon as={RiAddLine} fontSize="20" />}
            >
              Criar Novo
            </Button>
          </Flex>

          {isLoading ? (
            <Flex justifyContent='center'>
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justifyContent='center'>
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th width="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>

                  <Tr>
                    <Td px={["4", "4", "6"]}>
                      <Checkbox colorScheme="pink" />
                    </Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">Lucas Oliveira</Text>
                        <Text fontSize="sm" color="gray.300">lucas.schell.f@gmail.com</Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>04 de Abril, 2021</Td>}
                    <Td>

                    </Td>
                  </Tr>

                  <Tr>
                    <Td px={["4", "4", "6"]}>
                      <Checkbox colorScheme="pink" />
                    </Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">Lucas Oliveira</Text>
                        <Text fontSize="sm" color="gray.300">lucas.schell.f@gmail.com</Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>04 de Abril, 2021</Td>}
                    <Td>

                    </Td>
                  </Tr>

                  <Tr>
                    <Td px={["4", "4", "6"]}>
                      <Checkbox colorScheme="pink" />
                    </Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">Lucas Oliveira</Text>
                        <Text fontSize="sm" color="gray.300">lucas.schell.f@gmail.com</Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>04 de Abril, 2021</Td>}
                    <Td>

                    </Td>
                  </Tr>

                </Tbody>
              </Table>
              <Pagination />
            </>
          )}

        </Box>
      </Flex>
    </Box>
  )
}