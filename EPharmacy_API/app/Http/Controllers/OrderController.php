<?php

namespace App\Http\Controllers;


use App\Models\EPCart;
use App\Models\EPCustomer;
use App\Models\EPMedicine;
use App\Models\EPOrder;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

use Dompdf\Dompdf;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    // public function placeOrder(Request $rq){
    //     return view('customer.placeOrder')->with('amount',$rq->subTotal);
    // }

    public function confirmOrder(Request $rq)
    {
        $validator = Validator::make(
            $rq->all(),
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
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $medicines = EPCart::where('customer_id', $rq->header("UserID"))->get();
        $ord = new EPOrder();
        $ord->amount = $rq->amount;
        $ord->method = $rq->method;
        $ord->status = "Pending";
        $ord->c_id = $rq->header("UserID");
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
            EPCart::where('customer_id', $rq->header("UserID"))->delete();
            // updating customer address if changed during order
            EPCustomer::where('customer_id', $rq->header("UserID"))->update(['customer_add' => $rq->address]);
            // $cus = EPCustomer::where('customer_id', session()->get('loggedCustomer')->customer_id)->first();
            // session()->forget('loggedCustomer');
            // session()->put('loggedCustomer', $cus);
            // return view('customer.order_confirm_msg_page')->with('amount', $ord->amount);
            return response()->json($ord->amount);
        }
    }

    public function showList(Request $rq)
    { //show all order of a customer
        $list = EPOrder::where('c_id', $rq->header("UserID"))->orderBy('created_at', 'DESC')
            ->paginate(8)->withQueryString();
        return response()->json($list);
        // return view('customer.orderList')->with('orders', $list);
    }

    public function cancelOrder($id)
    {
        $ord = EPOrder::where('order_id', $id)->update(['status' => "Canceled"]);
        return redirect()->route('order.list');
    }
    public function returnOrder($id)
    {
        EPOrder::where('order_id', $id)->update(['status' => "Picking up"]);
        return redirect()->route('order.list');
    }

    public function orderDetails($id)
    {
        $order = EPOrder::where('order_id', $id)->first();
        $order->Customers;
        $order->Medicines;
        return response()->json($order);

        //return view('customer.orderDetails')->with('order', $details);
    }

    public function downloadReceipt($id)
    {
        $dompdf = new Dompdf();
        $details = EPOrder::where('order_id', $id)->first();
        $dompdf->loadHtml(view('customer.downloadOrder')->with('order', $details));
        $dompdf->setPaper('A4', 'landscape');
        $dompdf->render();
        $dompdf->stream('order_receipt.pdf', ['Attachment' => true]);
        //return response()->download(public_path($dompdf));
        return response()->download(public_path($dompdf));
    }



    public function orderHistory(Request $rq)
    {
        $orderCount = EPOrder::where('c_id', $rq->header("UserID"))->count();
        $orderAmountInTotal = EPOrder::where('c_id', $rq->header("UserID"))
            ->where('status', '!=', 'Canceled')
            ->where('status', '!=', 'Returned')->sum('amount');

        $orderInPreviousMonth = EPOrder::where('c_id', $rq->header("UserID"))
            ->where('status', '!=', 'Canceled')
            ->where('status', '!=', 'Returned')->whereMonth('created_at', Carbon::now()->month - 1)->get();
        $orderCountInPreviousMonth = $orderInPreviousMonth->count();
        $orderAmountInPreviousMonth = $orderInPreviousMonth->sum('amount');

        $orderInThisMonth = EPOrder::where('c_id', $rq->header("UserID"))
            ->where('status', '!=', 'Canceled')
            ->where('status', '!=', 'Returned')->whereMonth('created_at', Carbon::now()->month)->get();
        $orderCountInThisMonth = $orderInThisMonth->count();
        $orderAmountInThisMonth = $orderInThisMonth->sum('amount');
        //    for ($i =1; $i <=12;$i++){
        //     $testing[]=EPOrder::where('c_id', $rq->header("UserID"))->whereMonth('created_at',$i)->get();
        //    }
        //    $period=[];
        //     for ($i =0; $i <= 12; $i++) {
        //         array_push($period, array(
        //             'month' => Carbon::now()->,
        //             'amount' => 0
        //         ));
        //     }

        $allMonth = array();
        for ($i = 12; $i >= 1; $i--) {
            $month = Carbon::today()->startOfYear()->subMonth($i);
            //$year = Carbon::today()->startOfMonth()->subMonth($i)->format('Y');
            array_push($allMonth, array(
                'month' => $month->format('F'),
                'amount' => 0
            ));
        }

        /////////////////////////////////////////////////////////////////////
        $dataCurrentYear = EPOrder::where('c_id', $rq->header("UserID"))
            ->where('status', '!=', 'Canceled')
            ->where('status', '!=', 'Returned')
            ->whereYear('created_at', Carbon::now()->year)->selectRaw("monthname(created_at) as month, sum(amount) as amount")
            ->groupBy('month')->get()->toArray();
        $allMonth = array_column($allMonth, null, "month");
        $dataCurrentYear = array_column($dataCurrentYear, null, "month");
        $dataCurrentYear = array_values(array_replace($allMonth, $dataCurrentYear));
        /////////////////////////////////////////////////////////////////////////////////
        $dataPreviousYear = EPOrder::where('c_id', $rq->header("UserID"))
        ->where('status', '!=', 'Canceled')
        ->where('status', '!=', 'Returned')->whereYear('created_at', Carbon::now()->year - 1)->selectRaw("monthname(created_at) as month, sum(amount) as amount")
            ->groupBy('month')->get()->toArray();
        $allMonth = array_column($allMonth, null, "month");
        $dataPreviousYear = array_column($dataPreviousYear, null, "month");
        $dataPreviousYear = array_values(array_replace($allMonth, $dataPreviousYear));
        ////////////////////////////////////////////////////////////////////////////////
        // $print =array_merge($testing,$data);
        // $merged = collect($print)->unique('month');
        // $print= $testing->merge($data)->sortBy('month');
        // $print = array_replace_recursive($data,$testing);
        // $print=array( array_unique(array_merge($data,$testing)));
        //  $print =$data+$testing;

        return response()->json([
            "count" => $orderCount,
            "totalAmount" => $orderAmountInTotal,
            "countInPreviousM" => $orderCountInPreviousMonth,
            "amountInPreviousM" => $orderAmountInPreviousMonth,
            "countInThisM" => $orderCountInThisMonth,
            "amountInThisM" => $orderAmountInThisMonth,
            "dataCurrentYear" => $dataCurrentYear,
            "dataPreviousYear" => $dataPreviousYear
        ]);
        // return response()->json(["test" => $dataCurrentMonth]);
    }
}
