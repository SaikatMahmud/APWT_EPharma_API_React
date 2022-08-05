<?php

namespace App\Http\Controllers;

use App\Models\EPCart;
use App\Models\EPCustomer;
use App\Models\EPMedicine;
use App\Models\EPOrder;
use Illuminate\Http\Request;
use Dompdf\Dompdf;

class OrderController extends Controller
{
    // public function placeOrder(Request $rq){
    //     return view('customer.placeOrder')->with('amount',$rq->subTotal);
    // }

    public function confirmOrder(Request $rq)
    {
        $rq->validate(
            [
                //"quantity" => "required|integer|max:$rq->orgQuantity",
                "method" => "required", //|regex:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/",
                "address" => "required",
            ],
            [
                //"quantity.integer"=>"Must be an decimal number",
                // "quantity.max"=>"More than avaiable stock",
                "method.required" => "Select one payment method",
                "address.required" => "Address can not be blank",
            ]
        );
        $medicines = EPCart::where('customer_id', session()->get('loggedCustomer')->customer_id)->get();
        $ord = new EPOrder();
        $ord->amount = $rq->amount;
        $ord->method = $rq->method;
        $ord->status = "Pending";
        $ord->c_id = session()->get('loggedCustomer')->customer_id;
        $ord->save();

        if ($ord->save()) {
            foreach ($medicines as $med) { //adding in order_medicine table
                $ord->Medicines()->attach($med->medicine_id, ['quantity' => $med->quantity]);
            }
            // updating medicine stock (minus)
            foreach ($medicines as $med) {
                EPMedicine::where('medicine_id', $med->medicine_id)->decrement('availability', $med->quantity);
            }
            //deleting all form cart
            EPCart::where('customer_id', session()->get('loggedCustomer')->customer_id)->delete();
            // updating customer address if changed during order
            EPCustomer::where('customer_id', session()->get('loggedCustomer')->customer_id)->update(['customer_add' => $rq->address]);
            $cus = EPCustomer::where('customer_id', session()->get('loggedCustomer')->customer_id)->first();
            session()->forget('loggedCustomer');
            session()->put('loggedCustomer', $cus);
            return view('customer.order_confirm_msg_page')->with('amount', $ord->amount);
        }
    }

    public function showList()
    { //show all order of a customer
        $list = EPOrder::where('c_id', session()->get('loggedCustomer')->customer_id)->orderBy('created_at', 'DESC')
        ->paginate(4)->withQueryString();
        return view('customer.orderList')->with('orders', $list);
    }

    public function cancelOrder($id)
    {
        EPOrder::where('order_id', $id)->update(['status' => "Canceled"]);
        return redirect()->route('order.list');
    }

    public function orderDetails($id)
    {
        $details = EPOrder::where('order_id', $id)->first();
        return view('customer.orderDetails')->with('order', $details);
    }

    public function downloadReceipt($id)
    {
        $dompdf = new Dompdf();
        $details = EPOrder::where('order_id', $id)->first();
        $dompdf->loadHtml(view('customer.downloadOrder')->with('order', $details));
        $dompdf->setPaper('A4', 'landscape');
        $dompdf->render();
        $dompdf->stream('order_receipt.pdf',['Attachment'=>false]);
    }
}
