import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputProps, InputRightElement } from "@chakra-ui/react"

type InputFormProps = InputProps & {
    label: string,
    errorMessage?: string,
    rightElement?: InputRightElementProps
  }
  
  type InputRightElementProps = {
    element?: JSX.Element
    action?: VoidFunction
  }
  
  export const InputForm = ({ label, errorMessage, rightElement, ...props }: InputFormProps): JSX.Element => {
    return (
      <FormControl mb={4}>
        <FormLabel mb={4}>{props.isRequired ? `${label} *` : label}</FormLabel>
  
        <InputGroup>
          <Input
            type="text"
            boxShadow='base'
            rounded='md'
            bg='white'
            p='6'
            {...props}
          />
  
          {rightElement?.element &&
            <InputRightElement onClick={rightElement.action} cursor="pointer">
              {rightElement.element}
            </InputRightElement>
          }
        </InputGroup>
  
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>
    )
  }