
import { Pagination } from '@/components/Pagination';
import { Sidebar } from '@/components/Sidebar';
import { api } from '@/services/api';
import { getUsers, useUsers } from '@/services/hooks/useUsers';
import { queryClient } from '@/services/queryClient';
import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, Link as ChakraLink } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { RiAddLine } from 'react-icons/ri';

export default function UserList({ users }: any) {
  const [page, setPage] = useState(1)

  const { data, isLoading, isFetching, error } = useUsers(page
    // , {
    // initialData: users,
    // }
  )


  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`)
      return response.data
    },
      {
        // staleTime: 1000 * 60 * 10 // 10 minutes
        staleTime: 1000 * 5 // 10 minutes
      })
  }

  return (
    <Box>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>

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
                  {data?.users?.map((user: any) => (
                    <Tr key={user.id * (Math.random() * Math.random())}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <ChakraLink color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                            <Text fontWeight="bold">{user.name}</Text>
                          </ChakraLink>

                          <Text fontSize="sm" color="gray.300">{user.email}</Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user.createdAt}</Td>}
                    </Tr>
                  ))}

                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={data?.totalCount as number}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}

        </Box>
      </Flex>
    </Box>
  )
}

// export const getServerSideProps: GetServerSideProps = async () => {

//   const { users, totalCount } = await getUsers(1)

//   console.log('users', users)

//   return {
//     props: {
//       users
//     }
//   }
// }