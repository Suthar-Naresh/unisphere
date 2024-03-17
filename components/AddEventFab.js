import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { FAB, Portal, PaperProvider } from 'react-native-paper';

const AddEventFab = ({ children }) => {
    const navigation = useNavigation();
    const [state, setState] = useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    return (
        <PaperProvider>
            <Portal>
                <FAB.Group
                    open={open}
                    visible
                    icon={open ? 'calendar-today' : 'plus'}
                    actions={[
                        {
                            icon: 'ticket-confirmation',
                            label: 'Event',
                            onPress: () => navigation.navigate('add_event_screen'),
                        },
                        {
                            icon: 'bullhorn-variant',
                            label: 'Announce',
                            onPress: () => console.log('Pressed email'),
                        },
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => {
                        if (open) {
                            // do something if the speed dial is open
                        }
                    }}
                />
            </Portal>
            {children}
        </PaperProvider>
    );
};

export default AddEventFab;