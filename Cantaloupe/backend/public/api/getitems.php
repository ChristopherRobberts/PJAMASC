<?php
session_start();

$dbcon = new mysqli("localhost", "root", "kjr17ww97", "database1");

//$result = $dbcon->query('SELECT * FROM comments');
$result = $dbcon->query('SELECT * FROM comments JOIN credentials ON comments.user_id = credentials.id WHERE type='.$_GET['type_id']);

$comments = array();

while($comment = $result->fetch_object())
{

  if(isset($_SESSION['user']) && $_SESSION['user']['username'] === $comment->username)
  {
    $comment->deletable = true;
  }
  else
  {
    $comment->deletable = false;
  }

  $comments[] = $comment;

}

/*var_dump('Session: ' . $_SESSION['user']['user_id']);
var_dump('Comment: ' . $comment->user);*/

//$objArr = array();

/*
foreach ($comments as $comment)
{
$objArr[] = $comment;
}
*/

echo json_encode($comments);

?>
