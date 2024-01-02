<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['*'],

    'allowed_methods' => ['*'],

<<<<<<< HEAD
    'allowed_origins' => [env('FRONTEND_URL', 'http://127.0.0.1:3000')],
=======
    'allowed_origins' => [env('FRONTEND_URL', 'http://https://www.nsaccto.com/')],
>>>>>>> 57fb233d8da55b44aa822e7f9ea04c38dd37986b

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
