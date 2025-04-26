<?php

namespace Database;

class TimeStamp {

      /**
     * Método estático para retornar o TimeStamp atual
     * 
     * @return string $stamp - TimeStamp
     */
    public static function stamp()
    {
        date_default_timezone_set("America/Sao_Paulo");
        return date("Y-m-d H:i:s");
    }
}
