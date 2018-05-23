<?php

$recepient = "igorstupka123@gmail.com";
$sitename = "igorstupka.zzz.com.ua";

$name = trim($_GET["name"]);
$email = trim($_GET["email"]);
$text = trim($_GET["message"]);

$pagetitle = "New message from \"$sitename\"";
$message = "NAME: $name \nE-MAIL: $email \nMESSAGE: $text";
$headers = 'From: igorstop@igorstupka.zzz.com.ua' . "\r\n";


mail($recepient, $pagetitle, $message, $headers /*"Content-type: text/plain; charset=\"utf-8\"\n From: $recepient"*/);

