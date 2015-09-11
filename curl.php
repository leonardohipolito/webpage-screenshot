<?php

function get_data($url) {
	$ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_HEADER, 0);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)');
	$data = curl_exec($ch);
	curl_close($ch);
	return $data;
}

if (isset($_GET['requestURI']) && !empty($_GET['requestURI'])) {
  $api = 'http://s.wordpress.com/mshots/v1/'.$_GET['requestURI'].'?w=1200';
  $encoded = base64_encode(get_data($api));
  $arr = array(
    'base64' => $encoded
  );
  header('Content-Type: application/json');
  echo json_encode($arr);
  //echo '<img src="data:image/png;base64,'.$encoded.'" />'; //DEBUG ONLY
}

?>
