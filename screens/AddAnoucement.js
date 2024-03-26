import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import functionService from '../appwrite/functions';
import { presentPaymentSheet, useStripe } from '@stripe/stripe-react-native';
import { Button } from 'react-native-paper';

function AddAnoucement() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const handlePayment = async () => {
        // create payment intent
        const res = await functionService.createPaymentIntent(200);
        console.log(typeof res);
        console.log(res);
        if (!res) console.log('something went wrong!!!!');

        // initialize payment sheet
        const initResponse = await initPaymentSheet({
            merchantDisplayName: 'UniSphere',
            defaultBillingDetails: { address: { country: 'IN' } },
            paymentIntentClientSecret: JSON.parse(res).paymentIntent,
        });

        if (initResponse.error) console.log('error.....');

        // present payment sheet from stripe
        const paymentResponse = await presentPaymentSheet();
        if (paymentResponse.error) console.log('when click cancel button | payment errorrrrrrrrrrrrrrrrrrrrrrrrr.....', paymentResponse.error.code);

        // if payment ok add student to event
        addStudentToEvent();
    }

    const addStudentToEvent = () => {
        console.log('payment done. 💵💵💵')
    }

    return (
        <SafeAreaView className='flex-1'>
            <View>
                <Text>Make some annoucement</Text>
            </View>
            <Button onPress={handlePayment}>Pay Now</Button>
        </SafeAreaView>
    )
}

export default AddAnoucement