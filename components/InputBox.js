import { TextInput } from "react-native-paper"

const InputBox = ({className='',icon,placeholder='',label='',...props}) => {
    return (
        <TextInput
            className={`w-11/12 ${className}`}
            label={label}
            mode='outlined'
            placeholder={placeholder}
            left={<TextInput.Icon icon={icon} />}
            {...props}
        />
    )
}

export default InputBox