<?php

/* https://api.telegram.org/botXXXXXXXXXXXXXXXXXXXXXXX/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

// поля из формы
$area = $_POST['getAre'];
$city = $_POST['getCity'];
$warehouse = $_POST['getWarehouse'];
$qwe = $_POST['getSpisok'];

// токен нашего бота из botFather
$token = "6297882191:AAGhLR_D0qNmmMBpY7GpThyXBuuVOsbCkBs";
//$chat_id = "https://api.telegram.org/bot6297882191:AAGhLR_D0qNmmMBpY7GpThyXBuuVOsbCkBs/getUpdates";
$chat_id = "-849726591";
$arr = array(
  'Область: ' => $area,
  'Город: ' => $city,
  'Отделение: ' => $warehouse,
  'Заказ - ' => $qwe
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: thank-you.html');
} else {
  echo "Error";
}
?>
