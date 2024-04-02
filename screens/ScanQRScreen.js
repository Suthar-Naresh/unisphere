import { useState, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, Camera } from "expo-camera/next";
import { Appbar, Button, Divider, Text } from "react-native-paper";
import { Dimensions, StyleSheet, View } from "react-native";

function ScanQRScreen({ route, navigation }) {
    const { event_name } = route.params;

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const [scanData, setScanData] = useState();

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getCameraPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        setScanData(data);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const { width } = Dimensions.get('window');

    return (
        <SafeAreaView className='bg-white flex-1'>

            <Appbar.Header statusBarHeight={0} className='bg-white'>
                <Appbar.BackAction onPress={() => navigation.pop()} />
                <Appbar.Content title='QR code' />
            </Appbar.Header>

            <Divider />

            <View className='flex-1'>
                <CameraView
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr", "pdf417"],
                    }}
                    style={StyleSheet.absoluteFillObject}
                />
                <View className='flex-1 bg-gray-500 opacity-50 items-center justify-evenly'>
                    <Text className='text-white text-xl'>{event_name}</Text>
                    <View style={{ width: width / 2, height: width / 2, borderRadius: 8, borderColor: 'white', borderWidth: 2 }}></View>
                    {scanned && (
                        <Button mode="outlined" labelStyle={{color:'white',fontSize:16}} className='text-white' onPress={() => setScanned(false)} >
                            SCAN AGAIN
                        </Button>
                    )}
                </View>
            </View>


        </SafeAreaView>
    )
}

export default ScanQRScreen