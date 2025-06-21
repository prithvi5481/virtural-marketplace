import { Badge } from '@/components/ui/badge';

export default function PaymentDetailsCard({
  total,
  hostEarnings,
  paymentMethod,
  paymentIntentId,
}: {
  total: number;
  hostEarnings: number;
  paymentMethod: string;
  paymentIntentId: string;
}) {
  return (
    <div className="border rounded-lg p-6">
      <h2 className="font-medium mb-4">Payment Details</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Total</span>
          <span className="font-medium">${total.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Platform Fee (20%)</span>
          <span>${(total * 0.2).toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between border-t pt-3">
          <span className="font-medium">Your Earnings</span>
          <span className="font-medium text-green-600">
            ${hostEarnings.toFixed(2)}
          </span>
        </div>
        
        <div className="pt-4 border-t mt-4">
          <p className="text-sm text-gray-600 mb-1">Payment Method</p>
          <Badge variant="outline" className="capitalize">
            {paymentMethod}
          </Badge>
          
          <p className="text-xs text-gray-500 mt-3">
            Transaction ID: {paymentIntentId}
          </p>
        </div>
      </div>
    </div>
  );
}