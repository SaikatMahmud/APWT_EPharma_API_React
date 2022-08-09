<?php

namespace App\Http\Controllers;

use App\Models\EPCart;
use App\Models\EPCustomer;
//use Facade\FlareClient\Stacktrace\File;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    public function home()
    {
        return view('customer.homepage'); //done
    }
    public function about()
    {
        return view('about'); //done
    }
    public function contact()
    {
        return view('contact'); //done
    }
    public function reg()
    {
        return view('customer.reg'); //done
    }

    public function profile(Request $rq)
    {
      //  $cus = EPCustomer::where('customer_id', (session()->get('loggedCustomer')->customer_id))->first();
        $cus = EPCustomer::where('customer_id',$rq->header("UserID"))->first();
        return response()->json($cus);
        //return view('customer.profile')->with('cus', $cus);
    }
    public function cart(Request $rq)
    {
        $cart = EPCart::where('customer_id',$rq->header("UserID"))->get();
        return response()->json($cart);

        // return view('customer.cart')->with('allCart', $cart);
    }

    public function orders()
    {
        return view('customer.order');
    }

    public function editProfile(Request $rq)
    {
        $validator= Validator::make($rq->all(),
            [
                "name" => "required",
                "email"=>"required",
               // "email" => "required|regex:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/",
               // "email" => "unique:customers,customer_email," .$rq->header("UserID"). ",customer_id",
                "mobile" => "required",
                "address"=>"required",
                // "cus_pic" => "mimes:jpg,png,jpeg"

                // "password" => "required|min:4", //|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}+$/",
                //"confirmPass" => "required|min:4|same:password",
            ],
            [
                // "password.regex" => "Password must contain upper/lower case, number, symbol and minimum 8 digits",
                //"confirmPass.same" => "Both passsword not matched"
            ]
        );
        if ($validator->fails()){
            return response()->json($validator->errors(),422);
        }

        // if ($rq->hasFile('cus_pic')) {
        //     $image_name = "";
        //     $image_name = (session()->get('loggedCustomer')->customer_id) . "_" . (session()->get('loggedCustomer')->customer_name)
        //         . "." . $rq->file('cus_pic')->getClientOriginalExtension();
        //     File::delete('public' . '/' . session()->get('loggedCustomer')->pro_pic);
        //     $rq->file('cus_pic')->storeAs('public/cus_pic', $image_name);
        //     EPCustomer::where('customer_id', $rq->header("UserID"))->update(
        //         [
        //             'customer_name' => $rq->name,
        //             'customer_email' => $rq->email,
        //             'customer_mob' => $rq->mobile,
        //             'customer_add' => $rq->address,
        //             'pro_pic' => "cus_pic/" . $image_name //if has file
        //         ]
        //     );
        // } 
       // else {
            EPCustomer::where('customer_id',$rq->header("UserID"))->update(
                [
                    'customer_name' => $rq->name,
                    'customer_email' => $rq->email,
                    'customer_mob' => $rq->mobile,
                    'customer_add' => $rq->address //there is no file
                ]
            );
            $cus = EPCustomer::where('customer_id',$rq->header("UserID"))->first();
            return response()->json($cus);
       // }
        // getting new session after profile edit
        // $cus = EPCustomer::where('customer_id', session()->get('loggedCustomer')->customer_id)->first();
        // session()->forget('loggedCustomer');
        // session()->put('loggedCustomer', $cus);
        // session()->flash('msg', 'Edit saved');
        // return back();
    }

    public function regSubmit(Request $rq)
    {
        $validator = Validator::make($rq->all(),
            [
                "name" => "required",
                "email" => "required|unique:customers,customer_email|regex:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/",
                "mobile" => "required",
                "password" => "required|min:4", //|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}+$/",
                "confirmPass" => "required|min:4|same:password",
            ],
            [
                // "password.regex" => "Password must contain upper/lower case, number, symbol and minimum 8 digits",
                "confirmPass.same" => "Both passsword not matched"
            ]
        );
        if ($validator->fails()){
            return response()->json($validator->errors(),422);
        }
        $cus = new EPCustomer();
        $cus->customer_name = $rq->name;
        $cus->customer_email = $rq->email;
        $cus->customer_mob = $rq->mobile;
        $cus->password = bcrypt($rq->password);
        $cus->save();
        if($cus->save()){
            return response()->json(["msg"=>"reg success"]);

        }
        // if ($cus->save())
        //     session()->flash('regSuccess', 'Registration Success, Login now');
        //return redirect()->route('home');

        //return "Registration failed";

    }
}
