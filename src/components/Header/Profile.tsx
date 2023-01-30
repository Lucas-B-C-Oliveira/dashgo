
import { Flex, Box, Text, Avatar } from '@chakra-ui/react';
export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Lucas Oliveira</Text>
        <Text color="gray.300" fontSize="small">
          lucas.schell.f@gmail.com
        </Text>
      </Box>
      <Avatar size="md" name="Lucas Oliveira" src="https://github.com/lucas-b-c-oliveira.png" />
    </Flex>
  )
}