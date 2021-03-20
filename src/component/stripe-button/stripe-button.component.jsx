import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishkey = 'pk_test_51IXCorKCPtT6gtZneIpZWskqs8vv4fHfhbtx8d8bKGNXbxuAHTWvJJwdX8hIlI61VpC9xJZqkilTvqN4kxoEkYsi00D1u8DSjg'

    const onToken = token => {
        console.log(token)
        alert('Payment Successful')
    }
    return(
        <StripeCheckout
            label='Pay Now'
            name='crwn-clothing'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishkey}
            bitcoin
        />
    )
}

export default StripeCheckoutButton;