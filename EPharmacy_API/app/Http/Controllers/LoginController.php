<?php

namespace App\Http\Controllers;

use App\Models\EPAdmin;
use App\Models\EPCustomer;
use App\Models\EPDeliveryman;
use App\Models\EPSupplier;
use App\Models\EPToken;
use App\Models\EPWorker;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class LoginController extends Controller
{
    public function login()
    { //all done
        return view('login');
    }
    public function logout(Request $rq)
    {
        // $tkey= $rq->header("Authorization");
        $out = EPToken::where('user_id', $rq->header("UserID"))->update(
            [
                'expired_at' => new DateTime(),
            ]
        );
        return response()->json(["msg" => "Logged out"]);
        // session()->flush(); //delete all session
        // session()->flash('msg','Sucessfully Logged out');
        // return redirect()->route('user.login');
    }

    public function verifyLogin(Request $rq)
    {
        $validator = Validator::make(
            $rq->all(),
            [
                "email" => "required", //|regex:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/",
                "password" => "required", //|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}+$/",
            ]
        );
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (Auth::attempt(['customer_email' => $rq->email, 'password' => $rq->password])) {
            //no guard, default auth with 'User.php' model
            $cus_id = EPCustomer::where('customer_email', $rq->email)->first(['customer_id']);
            $tkey = Str::random(43);
            $token = new EPToken();
            $token->user_id = $cus_id->customer_id;
            $token->token_key = $tkey;
            $token->created_at = new DateTime();
            $token->save();
            return response()->json($token);
            // session()->put('loggedCustomer',$cus);
            //return redirect()->route('home');
        } else if (Auth::guard('supplier')->attempt(['supplier_email' => $rq->email, 'password' => $rq->password])) {
            return response()->json(["msg"=>"You are a supplier"],422);
        } else if (Auth::guard('deliveryman')->attempt(['delman_email' => $rq->email, 'password' => $rq->password])) {
            return response()->json(["msg"=>"You are a Delivary man"],422);
        } else if (Auth::guard('worker')->attempt(['worker_email' => $rq->email, 'password' => $rq->password])) {
            return response()->json(["msg"=>"You are a Worker"],422);
        } else if (Auth::guard('admin')->attempt(['admin_email' => $rq->email, 'password' => $rq->password])) {
            return response()->json(["msg"=>"You are a Admin"],422);
        } else
            return response()->json(["msg" => "Invalid email or password"],422);
        // return back()->withErrors(
        //     ["notFound" => "Email or password not found"]);


    }
}
