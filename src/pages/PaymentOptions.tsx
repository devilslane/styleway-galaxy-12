
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { CreditCard, wallet, WalletCards } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const PaymentOptions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { totalPrice } = useCart();

  const handlePaymentSelect = (method: string) => {
    // For now, just show a success message and redirect to home
    navigate('/');
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-2">Payment Options</h1>
      <p className="text-gray-600 mb-6">Total to pay: ${totalPrice.toFixed(2)}</p>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center space-x-4">
            <CreditCard className="h-6 w-6" />
            <CardTitle>Credit Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">Pay securely with your credit card</p>
            <Button 
              className="w-full"
              onClick={() => handlePaymentSelect('credit-card')}
            >
              Pay with Card
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center space-x-4">
            <WalletCards className="h-6 w-6" />
            <CardTitle>Digital Wallet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">Use your preferred digital wallet</p>
            <Button 
              className="w-full"
              onClick={() => handlePaymentSelect('digital-wallet')}
            >
              Pay with Digital Wallet
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center space-x-4">
            <CreditCard className="h-6 w-6" />
            <CardTitle>Bank Transfer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">Direct bank transfer payment</p>
            <Button 
              className="w-full"
              onClick={() => handlePaymentSelect('bank-transfer')}
            >
              Pay with Transfer
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentOptions;
