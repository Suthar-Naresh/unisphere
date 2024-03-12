import { useState } from 'react';
import dbService from '../appwrite/db';
import DropDown from "react-native-paper-dropdown";
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

const DropDownList = () => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [university, setUniversity] = useState("");
    const [universityList, setUniversityList] = useState([]);

    dbService.getUniversities().then((res) => {
        const x = res.documents.map(({ name }) => ({ label: name, value: name }));
        setUniversityList(x);
    });

    return (
        <View className='w-11/12' >
            <DropDown
                label={"Select University"}
                mode={"outlined"}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                value={university}
                setValue={setUniversity}
                list={universityList}
                inputProps={{
                    right: (
                        <TextInput.Icon icon='menu-down' onPress={() => { }} />
                    )
                }}
            />
        </View>
    )
}

export default DropDownList