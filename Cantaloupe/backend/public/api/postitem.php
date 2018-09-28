<?php
session_start();

$dbcon = new mysqli("localhost", "root", "kjr17ww97", "database1");

$type_id = $dbcon->query('SELECT * FROM recipe WHERE name="'.$_POST['type'].'"')->fetch_assoc()['id'];
$user_id = $dbcon->query('SELECT * FROM credentials WHERE username="'.$_SESSION["user"]["username"].'"')->fetch_assoc()['id'];

$dbcon->query('INSERT INTO comments (user_id, type, comment) VALUES ('. $user_id .', ' . $type_id . ', "' . $_POST["commentText"] . '")');

$dbcon->close();

?>
