<?php

namespace App\Http\Middleware;

use App\Models\EPToken;
use Closure;
use Illuminate\Http\Request;

class verifyRequestAPI
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $tkey = $request->header("Authorization");
        $user_id = $request->header("UserID");
        if($tkey !=null && $user_id !=null){
            $token = EPToken::where('token_key',$tkey)
                    ->where('user_id',$user_id)
                     ->whereNull('expired_at')
                     ->first();
            if($token){
                return $next($request);
            }
            return response()->json(["msg"=>"Supplied Token is invalid or expired"],401);
        }
        return response()->json(["msg"=>"Not token supplied"],401);
    }
}
