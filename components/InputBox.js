import { Controller } from "react-hook-form"
import { View } from "react-native"
import { HelperText, TextInput } from "react-native-paper"

const InputBox = ({ control, name, icon, formErrors = {}, placeholder = '', label = '', ...props }) => {
    return (
        <Controller
            control={control}
            name={name}

            render={({ field: { onBlur, value, onChange } }) => (
                <View className='w-11/12'>
                    <TextInput
                        placeholder={placeholder}
                        label={label}
                        mode='outlined'
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        left={<TextInput.Icon icon={icon} />}
                        error={formErrors[name] ? true : false}
                        {...props}
                    />
                    {formErrors[name] && <HelperText type="error" >{formErrors[name].message}</HelperText>}
                </View>
            )}
        />
    )
}

export default InputBox