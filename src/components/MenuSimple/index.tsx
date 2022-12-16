import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'


export const MenuSimple = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <Box display="flex" justifyContent="space-between">
      <Flex justifyContent="start" >
        <Text mr={10} >Dashboard</Text>

        <Menu isLazy >
          <MenuButton mr={10} >Cadastrar</MenuButton>
          <MenuList>
            <MenuItem>
              <Link to="/calc-imc">IMC</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/register-student">Aluno</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/register-professional">Profissional</Link>
            </MenuItem>
          </MenuList>
        </Menu>

        <Text ref={btnRef} onClick={onOpen}>
          Relatórios
        </Text>
        <Drawer
          isOpen={isOpen}
          placement='left'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Gerar relatório</DrawerHeader>
            <DrawerBody>
              <Flex flexDirection='column'>
                <Link to="/list-student">Alunos</Link>
                <Link to="/list-professional">Profissionais</Link>
                <Text>Evoluções</Text>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>

      <Link to="/login">Sair</Link>

    </Box>
  )
}