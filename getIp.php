<?php
    /**
        * Returns client's IP address.
        * 
        * @return string
        */
    function getIp() {
        //check ip from share internet
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip=$_SERVER['HTTP_CLIENT_IP'];
            return $ip;
        }

        //to check ip is pass from proxy
        if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
            return $ip;
        }

        //normal
        $ip=$_SERVER['REMOTE_ADDR'];
        return $ip;
    }

    $ip = getIp();
    $response = array("ip" => $ip);
    $json = json_encode($response);
    header('Cache-Control: no-cache, must-revalidate');
    header('Content-type: application/json');
    die("ipCallback($json)");
