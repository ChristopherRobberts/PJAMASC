<?php
session_start();

$dbcon = new mysqli("localhost", "root", "kjr17ww97", "database1");

//$type_id = $dbcon->query('SELECT * FROM recipe WHERE name="'.$type.'"')->fetch_assoc()['id'];
//$result = $dbcon->query('SELECT * FROM comments JOIN credentials ON comments.user_id = credentials.id WHERE type='.$type_id);

$dbcon->query('DELETE FROM comments WHERE comment_id = '.$_POST["comment_id"]);
//var_dump($result->fetch_assoc());
//exit();

$dbcon->close();

return;
