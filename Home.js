/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import PaymentGateway from 'react-native-midtrans-payment';
import {Actions} from 'react-native-router-flux';
const midtransClient = require('midtrans-client');

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  async pay() {
    // await Alert.alert('Hai')
    const optionConnect = {
      clientKey: 'SB-Mid-client-yn8w4QpXkErH4ZkH',
      urlMerchant: 'https://domain.net/', // will hit https://domain.net/charge
      sandbox: true, // works on iOS only, change it to false on production
    };
    const transRequest = {
      transactionId: '0001',
      totalAmount: 4000,
    };

    const itemDetails = [{id: '001', price: 1000, qty: 4, name: 'peanuts'}];

    const creditCardOptions = {
      saveCard: false,
      saveToken: false,
      paymentMode: 'Normal',
      secure: false,
    };

    const userDetail = {
      fullName: 'jhon',
      email: 'jhon@payment.com',
      phoneNumber: '0850000000',
      userId: 'U01',
      address: 'street coffee',
      city: 'yogyakarta',
      country: 'IDN',
      zipCode: '59382',
    };

    const optionColorTheme = {
      primary: '#c51f1f',
      primaryDark: '#1a4794',
      secondary: '#1fce38',
    };

    const optionFont = {
      defaultText: 'open_sans_regular.ttf',
      semiBoldText: 'open_sans_semibold.ttf',
      boldText: 'open_sans_bold.ttf',
    };

    const callback = res => {
      console.log(res);
    //   Alert.alert(JSON.stringify(res));
    };
    await PaymentGateway.checkOut(
      optionConnect,
      transRequest,
      itemDetails,
      creditCardOptions,
      userDetail,
      optionColorTheme,
      optionFont,
      callback,
    );
  }
  async pay2() {
    // Create Snap API instance
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: 'SB-Mid-server-Dph6h5SHhlPTrflxEhvjgMDk',
      clientKey: 'SB-Mid-client-yn8w4QpXkErH4ZkH',
    });

    let parameter = {
      transaction_details: {
        order_id: 'test-transaction-123',
        gross_amount: 200000,
      },
      credit_card: {
        secure: true,
      },
    };
    await snap.createTransactionRedirectUrl(parameter).then(url => {
      Actions.push('Checkout',{yuerel : url})
    });
  }
  render() {
    return (
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>MIDTRANS (I) {"\n"}
                use midtrans-nodejs-client</Text>
              <TouchableOpacity onPress={async () => await this.pay2()}>
                <Text style={styles.sectionDescription}>CLICK HERE TO PAY (I)</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>MIDTRANS (II) {"\n"}
                use react-native-midtrans-payment
              </Text>
              <TouchableOpacity onPress={async () => await this.pay()}>
                <Text style={styles.sectionDescription}>CLICK HERE TO PAY (II)</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
