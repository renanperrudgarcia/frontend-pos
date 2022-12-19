import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalProps } from "@chakra-ui/react"

type ModalExProps = ModalProps & {
  title: string
  buttonText?: string
}

export const ModalEx = ({ onClose, size, isOpen, children, title, buttonText }: ModalExProps) => {
  return (
    <Modal onClose={onClose} size={size} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button backgroundColor="purple.300" onClick={onClose}>{buttonText ?? 'Ok'}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}