import { Box, Divider, Flex, Heading, SimpleGrid, VStack, HStack, Button } from '@chakra-ui/react';
import { Input } from '@/components/Form/Input';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation } from 'react-query';
import { api } from '@/services/api';
import { queryClient } from '@/services/queryClient';

type CreateUserFormData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}
const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'As senhas precisam ser iguais')
})

export default function CreateUser() {
  const router = useRouter()

  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date(),
      }
    })
    return response.data.user
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const { errors } = formState

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    const newUser = await createUser.mutateAsync(values)
    console.log('newUser', newUser)
    // router.push('/users')
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          //@ts-ignore
          onSubmit={handleSubmit(handleCreateUser)}
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
        >

          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                type="name"
                label="Nome completo"
                {...register('name')}
                //@ts-ignore
                error={errors?.name} />
              <Input type="email" label="E-mail" {...register('email')}
                //@ts-ignore
                error={errors?.email} />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input type="password" label="Senha" {...register('password')}
                //@ts-ignore
                error={errors?.password} />
              <Input type="password" label="Confirmação da senha" {...register('password_confirmation')}
                //@ts-ignore
                error={errors?.password_confirmation} />
            </SimpleGrid>

          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">

              <Button as={Link} colorScheme="whiteAlpha" href="/users">Cancelar</Button>

              <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting} >Salvar</Button>
            </HStack>
          </Flex>

        </Box>

      </Flex>
    </Box>
  )
}