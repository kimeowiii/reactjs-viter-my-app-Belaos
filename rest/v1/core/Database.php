<?php


class Database
{
    private static $dbConnection;
    
    public static function connectDb()
    {
        // LocalHost
        $host = 'localhost';
        $dbname = 'viter_my_app';
        $username = 'root';
        $password = '';

        // === Strict
        // Example 123 (int)  === '123' (string) is eqaul to false
        // non-Strict
        // Example  123 (int)  === '123' (string) is eqaul to true
        
        if(self::$dbConnection === null ){
            
            self ::$dbConnection = new PDO("mysql:host={$host};dbname={$dbname};",$username, $password, [PDO:: ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
            self::$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            self::$dbConnection->setAttribute(PDO::ATTR_EMULATE_PREPARES,false);
        }

        return self::$dbConnection;
           
    }
}